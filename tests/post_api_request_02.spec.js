const { test, expect } = require("@playwright/test");

const bookingAPIRequestBody = require('../test-data/post_request_body.json');

test("Crerate POST api request using static JSON file", async ({
  request,
}) => {
  // Create POST api request
  const postAPIResponse = await request.post("/booking", {
    data: bookingAPIRequestBody
  });

  //Validate status code
  expect(postAPIResponse.ok()).toBeTruthy();
  expect(postAPIResponse.status()).toBe(200);

  const postAPIResponseBody = await postAPIResponse.json();
  console.log(postAPIResponseBody.booking);

  // Validate JSON api response

  expect(postAPIResponseBody.booking).toHaveProperty(
    "firstname",
    "testers talk playwright"
  );
  expect(postAPIResponseBody.booking).toHaveProperty(
    "lastname",
    "testers talk api testing"
  );
});
