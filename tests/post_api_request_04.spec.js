const { test, expect } = require("@playwright/test");

import { stringFormat } from "../utils/common";

const bookingAPIRequestBody = require('../test-data/post_dynamic_request_body.json');

test("Crerate POST api request using dynamic JSON file", async ({
  request,
}) => {

  const dynamicRequestBody =  stringFormat(JSON.stringify(bookingAPIRequestBody), "testers talk cypress", "testers talk javascript", "orange")

  // Create POST api request
  const postAPIResponse = await request.post("/booking", {
    data: JSON.parse(dynamicRequestBody)
  });

  //Validate status code
  expect(postAPIResponse.ok()).toBeTruthy();
  expect(postAPIResponse.status()).toBe(200);

  const postAPIResponseBody = await postAPIResponse.json();
  console.log(postAPIResponseBody);

  // Validate JSON api response

  expect(postAPIResponseBody.booking).toHaveProperty(
    "firstname",
    "testers talk cypress"
  );
  expect(postAPIResponseBody.booking).toHaveProperty(
    "lastname",
    "testers talk javascript"
  );
});
