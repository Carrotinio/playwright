import { APIRequestContext } from "playwright";

const HOST = "https://example.com/";
const HTTP_METHODS = ["POST", "PUT", "PATCH", "DELETE", "GET"];
const queryOptions = {
  params: "params",
  "form-data": "form-data",
  "x-www-form-urlencoded": "x-www-form-urlencoded",
  data: "data",
};

// функция для отправки запроса
export async function doRequest(
  request: APIRequestContext,
  method: string, // HTTP method
  endpoint: string, // Endpoint
  payload: string, // payload
  token?: string, // token
  queryBody?: any, // request body
  headers?: any, // headers
  contentType?: string // Content-Type
) {
  let userToken = token && token !== "" ? token : null;

  const authType = "Bearer"; // or Basic, or any other used in API

  let contentTypeValue = contentType ?? "application/json";

  if (!HTTP_METHODS.includes(method)) {
    throw new Error(`Unsupported HTTP method: ${method}`);
  }

  const options = {
    method,
    headers: {
      "Content-Type": contentTypeValue,
      Authorization: authType + " " + userToken,
      ...headers,
    },
    [payload]: queryBody,
  };

  switch (payload) {
    case queryOptions.data: {
      if (queryBody) {
        options.body = JSON.stringify(queryBody);
      }
      break;
    }

    case queryOptions["x-www-form-urlencoded"]: {
      if (queryBody) {
        options.body = new URLSearchParams(queryBody).toString();
      }
      break;
    }

    case queryOptions.params: {
      if (queryBody) {
        const urlParams = new URLSearchParams(queryBody).toString();
        endpoint += `?${urlParams}`;
      }
      break;
    }

    case queryOptions["form-data"]: {
      if (queryBody) {
        const formData = new FormData();
        for (const key in queryBody) {
          formData.append(key, queryBody[key]);
        }
        options.body = formData;
        delete options.headers["Content-Type"];
      }
      break;
    }
  }

  let url = HOST + endpoint;
  const res = await request.fetch(url, options);
  let body;

  try {
    body = await res.json();
  } catch {
    body = await res.text();
  }

  return { status: res.status(), body };
}

// GET
export async function doGETRequest(
  request: APIRequestContext,
  endpoint: string,
  token?: string,
  queryBody?: any,
  headers?: any
) {
  return await doRequest(
    request,
    "GET",
    endpoint,
    "params",
    token,
    queryBody,
    headers
  );
}
