const { test, expect } = require("@playwright/test");
import {faker} from '@faker-js/faker';


 const {DateTime} = require('luxon');




test("Crerate POST api request using dynamic request body", async ({
  request,
}) => {


  //Using Faker

  const firstName = faker.person.firstName();
  const lastName = faker.person.lastName();
  const totalPrice = faker.number.int(1000);


  const checkInDate = DateTime.now().toFormat('yyyy-MM-dd');
  const checkOutDate = DateTime.now().plus({day:5}).toFormat('yyyy-MM-dd');


  // Create POST api request
  const postAPIResponse = await request.post("/booking", {
    data: {
      firstname: firstName,
      lastname: lastName,
      totalprice: totalPrice,
      depositpaid: true,
      bookingdates: {
        checkin: checkInDate,
        checkout: checkOutDate,
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
    firstName
  );
  expect(postAPIResponseBody.booking).toHaveProperty(
    "lastname",
    lastName
  );
});
