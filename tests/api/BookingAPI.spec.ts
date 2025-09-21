// import { expect, test } from "@playwright/test";
// import Ajv from "ajv";

// test("Create booking", async ({ request }) => {
//   const data = {
//     firstname: "Vova",
//     lastname: "Fjodorovs",
//     totalprice: 120,
//     depositpaid: true,
//     bookingdates: {
//       checkin: "2023-01-01",
//       checkout: "2025-01-02",
//     },
//     additionalneeds: "Breakfast",
//   };

//   const schema = {
//     type: "object",
//     properties: {
//       firstname: { type: "string" },
//       lastname: { type: "string" },
//       totalprice: { type: "number" },
//       depositpaid: { type: Boolean },
//       bookingdates: {
//         type: "object",
//         properties: {
//           checkin: { type: "string" },
//           checkout: { type: "string" },
//         },
//         required: ["checkin", "checkout"],
//       },
//     },
//     required: ["firstname", "lastname", "totalprice", "depositpaid", "bookingdates"],
//     additionalProperties: false,
//   };

//   const response = await request.post("/booking", {
//     data,
//   });
//   const responseData = await response.json();
//   expect(response.ok()).toBeTruthy();
//   expect(responseData).toHaveProperty("booking");
//   console.log(responseData);

//   // const ajv = new Ajv({ strict: true });
//   // const validate = ajv.compile(schema);
//   // validate(responseData);
// });

// test("Get booking", async ({ request }) => {
//   const id = 1;
//   const response = await request.get(`/booking/${id}`);
//   const data = await response.json();

//   expect(response.ok()).toBeTruthy();
//   expect(response.status()).toBe(200);
//   console.log(data);

//   // expect(data).toHaveProperty("firstname", "Jim"); // Value changes frequently due to public testsw of others
// });

// test("Get booking id", async ({ request }) => {
//   const response = await request.get("/booking", {
//     params: {
//       firstname: "Jim",
//       lastname: "Brown",
//     },
//   });
//   const data = await response.json();

//   expect(response.ok()).toBeTruthy();
//   expect(response.status()).toBe(200);
//   expect(data.length).toBeGreaterThan(0);
//   expect(data[0]).toHaveProperty("bookingid");
//   expect(typeof data[0].bookingid).toBe("number");
// });
