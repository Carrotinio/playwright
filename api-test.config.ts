const processENV = process.env.TEST_ENV;
const env = processENV || "qa";
console.log("Test environment is: " + env);

const config = {
  apiUrl: "https://conduit-api.bondaracademy.com/api",
  userEmail: "pwapiuser@test.com",
  userPassword: "Welcome",
};

if (env === "qa") {
  config.userEmail = "pwtest@test.com";
  config.userPassword = "Welcome2";
}

if (env === "prod") {
  config.userEmail = "";
  config.userPassword = "";
}

export { config };
