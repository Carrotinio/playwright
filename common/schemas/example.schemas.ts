import { expect } from "@playwright/test";

export const getOrderSchema = (orderNumber: string) => ({
  [orderNumber]: [
    {
      id: expect.any(Number),
      payedAt: expect.any(String), // ISO date string
      createdAt: expect.any(String), // ISO date string
      isDelivered: expect.any(Boolean),
      address: expect.any(String),
      status: expect.any(String),
      userId: expect.any(Number),
    },
  ],
});

// Assert will look like
// expect(json).toMatchObject(getOrderSchema("KZ-12345-ONLINE"));
