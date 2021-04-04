import { RequestHandler } from "express";
import models from "../models";

export const getAllBaskets: RequestHandler<null> = async (req, res, next) => {
  const baskets = await models.basket.findAll();
  // const baskets = await models.basket.findAll({ include: "balls" });
  res.send(baskets);
};
export const getBasketById: RequestHandler = async (req, res, next) => {
  const basket = await models.basket.findByPk(req.params.id, { include: "balls" });
  console.log(basket);
  res.send(basket);
};

export const createBasket: RequestHandler = async (req, res, next) => {
  const basket = await models.basket.create(req.body);
  res.send(basket);
};
export const updateBasket: RequestHandler = async (req, res, next) => {
  const id = req.params.id;
  try {
    const updatedBasket = await models.basket.update(req.body, {
      where: { id: id },
    });
    res.json(updatedBasket);
    return;
  } catch (e) {
    res.status(500).send({
      message: `Couldn't update Basket with id =${id}`,
    });
  }
};
export const deleteBasket: RequestHandler = async (req, res, next) => {
  const basket = await models.basket.findByPk(req.params.id);
  if (basket == null) res.status(404).send({ message: "There is no such basket" });

  try {
    await models.basket.destroy({
      where: { id: req.params.id },
    });
    res.send({ success: true });
    return;
  } catch (e) {
    res.status(500).send({ message: "oops" });
  }
};

export const putBallInBasket: RequestHandler = async (req, res, next) => {
  const basket = await models.basket.findByPk(req.params.basketId);
  const ball = await models.ball.findByPk(req.params.ballId);

  if (basket === null || ball === null) {
    res.status(404).send({ message: "There is not such ball or basket" });
    return;
  }

  if (
    ball.getDataValue("material") === basket.getDataValue("material") &&
    ball.getDataValue("material") === basket.getDataValue("material") &&
    ball.getDataValue("material") === basket.getDataValue("material")
  ) {
    return;
  } else {
    res.status(400).send({ message: "Mismatch!" });
  }
};
export const removeBallFromBasket: RequestHandler = async (req, res, next) => {
  const basket = await models.basket.findByPk(req.params.basketId);
  const ball = await models.ball.findByPk(req.params.ballId);

  if (basket === null || ball === null) {
    res.status(404).send({ message: "There is not such ball or basket" });
    return;
  }

  if (
    ball.getDataValue("material") === basket.getDataValue("material") &&
    ball.getDataValue("material") === basket.getDataValue("material") &&
    ball.getDataValue("material") === basket.getDataValue("material")
  ) {
  } else {
    res.status(400).send({ message: "Mismatch!" });
  }
};
