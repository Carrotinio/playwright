import { expect, Page } from "@playwright/test";

export async function createOrderViaUI(
  page: Page,
  productId: number,
  deliveryType: string,
  address: string,
  expectedOrderStatus: string,
  paymentType: string,
  card?: CardData
) {
  const productPage = new ProductPage(page);
  const basketPage = new BasketPage(page);
  const orderPage = new OrderPage(page);

  await page.goto(`/product/${productId}`);
  await productPage.addProductToBasket();

  await basketPage.goToBasket();
  await basketPage.ensureProductIsInBasket(productId);
  await basketPage.buyProductByClick(productId);

  await orderPage.ensureOrderDetailsAreShownFor(productId);

  const orderId = await orderPage.getOrderId();
  expect(
    orderId,
    "orderId должен вернуться на странице оформления"
  ).toBeTruthy();

  await orderPage.selectDelivery(deliveryType);
  await orderPage.fillAddressToDeliver(address);
  await orderPage.selectPaymentType(paymentType);

  if (paymentType === "card") {
    if (
      !card ||
      !card.cardNumber ||
      !card.cardHolder ||
      !card.cardExpire ||
      !card.cardCvv
    ) {
      throw new Error(
        "Для оплаты картой необходимо передать card: { cardNumber, cardHolder, cardExpire, cardCvv }"
      );
    }
    const cardComp = new CardComponent(page);
    await cardComp.fillCardNumber(card.cardNumber);
    await cardComp.fillCardHolder(card.cardHolder);
    await cardComp.fillCardExpireDate(card.cardExpire);
    await cardComp.fillCardCvv(card.cardCvv);
    await cardComp.acceptPayment();
  } else {
    await orderPage.payWithAlternative(paymentType);
  }

  await orderPage.ensureOrderIsPaid(orderId);

  const status = await orderPage.getOrderStatus(orderId);

  await expect(status).toMatch(expectedOrderStatus);

  return { orderId, status };
}
