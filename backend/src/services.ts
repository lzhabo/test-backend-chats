import models from "./models";

export async function dealing() {
  const balls = await models.ball.findAll({});
  const baskets = await models.basket.findAll({});

  await Promise.all(
    balls.map(async (ball) => {
      const basket = baskets.find(
        (basket) =>
          basket.getDataValue("size") === ball.getDataValue("size") &&
          basket.getDataValue("color") === ball.getDataValue("color") &&
          basket.getDataValue("material") === ball.getDataValue("material")
      );
      ball.setDataValue("basketId", basket?.getDataValue("id") ?? null);
      return await ball.save();
    })
  );
}
