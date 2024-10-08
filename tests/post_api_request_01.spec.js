const { test, expect } = require("@playwright/test");

test("Crerate POST api request using static request body", async ({
  request,
}) => {
  // Create POST api request
  const postAPIResponse = await request.post("/booking", {
    data: {
      firstname: "testers talk playwright",
      lastname: "testers talk api testing",
      totalprice: 1000,
      depositpaid: true,
      bookingdates: {
        checkin: "2018-01-01",
        checkout: "2019-01-01",
      },
      additionalneeds: "super bowls",
    },
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
