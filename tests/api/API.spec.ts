import { expect } from "@common/assertions/custom-assertions";
import { test } from "@fixtures/api-fixture";
import postArticle from "@requestObjects/post-article.json";

// let authToken: string;

// test.beforeAll("Get token", async ({ config }) => {
//   authToken = await createToken("pwtest@test.com", "Welcome2");
// });

test("GET Articles", async ({ api }) => {
  const response = await api
    .path("/articles")
    .params({
      limit: 10,
      offset: 0,
    })
    .getRequest(200);
  await expect(response).shouldMatchSchema("articles", "get-articles");

  // expect(response.articles.length).shouldBeLessThanOrEqual(10);
  // expect(response.articlesCount).shouldEqual(10);

  // const response2 = await api.path("/tags").getRequest(200);
  // expect(response2.tags[0]).shouldBeLessThanOrEqual("Test");
  // expect(response2.tags.length).shouldBeLessThanOrEqual(10);
});

test("GET Tags schema validation", async ({ api }) => {
  const response = await api.path("/tags").getRequest(200);
  await expect(response).shouldMatchSchema("tags", "get-tags");
  // await validateSchema("tags", "get-tags", response);
});

test("Create and delete article", async ({ api }) => {
  postArticle.article.title = "this is an object title";
  const createArticleResponse = await api.path("/articles").body(postArticle).postRequest(201);

  expect(createArticleResponse.article.title).shouldEqual("this is an object title");
  const slugId = createArticleResponse.article.slug;

  const articlesResponse = await api
    .path("/articles")
    .params({
      limit: 10,
      offset: 0,
    })
    .getRequest(200);

  expect(articlesResponse.articles[0].title).shouldEqual("this is an object title");

  await api.path(`/articles/${slugId}`).deleteRequest(204);

  const articlesResponseAfterDelete = await api
    .path("/articles")
    .params({
      limit: 10,
      offset: 0,
    })
    .getRequest(200);
  expect(articlesResponseAfterDelete.articles[0].title).not.shouldEqual("this is an object title");
});

test("Create, Update and delete article", async ({ api }) => {
  const createArticleResponse = await api
    .path("/articles")
    .body({
      article: {
        title: "Test New TEST",
        description: "Test description",
        body: "Test body",
        tagList: [],
      },
    })
    .postRequest(201);

  expect(createArticleResponse.article.title).shouldEqual("Test New TEST");
  let slugId = createArticleResponse.article.slug;

  const updateArticleResponse = await api
    .path(`/articles/${slugId}`)
    .body({
      article: {
        title: "Test New TEST Modified",
        description: "Test description",
        body: "Test body",
        tagList: [],
      },
    })
    .putRequest(200);

  expect(updateArticleResponse.article.title).shouldEqual("Test New TEST Modified");
  slugId = updateArticleResponse.article.slug;

  const articlesResponse = await api
    .path("/articles")
    .params({
      limit: 10,
      offset: 0,
    })
    .getRequest(200);

  expect(articlesResponse.articles[0].title).shouldEqual("Test New TEST Modified");

  await api.path(`/articles/${slugId}`).deleteRequest(204);

  const articlesResponseAfterDelete = await api
    .path("/articles")
    .params({
      limit: 10,
      offset: 0,
    })
    .getRequest(200);
  expect(articlesResponseAfterDelete.articles[0].title).not.shouldEqual("Test New TEST Modified");
});
