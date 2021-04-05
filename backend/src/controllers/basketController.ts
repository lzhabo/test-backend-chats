import { RequestHandler } from "express";
import models from "../models";
import { dealing } from "../services";

export const getAllBaskets: RequestHandler<null> = async (req, res, next) => {
  const baskets = await models.basket.findAll();
  res.send(baskets);
};
export const getBasketById: RequestHandler = async (req, res, next) => {
  const basket = await models.basket.findByPk(req.params.id, { include: "balls" });
  res.send(basket);
};

export const createBasket: RequestHandler = async (req, res, next) => {
  if ((await models.basket.findOne({ where: { ...req.body } })) != null) {
    res.status(409).send({ message: "This basket already exists" });
    return;
  }
  const basket = await models.basket.create(req.body);
  await dealing();
  res.send(basket);
};
export const updateBasket: RequestHandler = async (req, res, next) => {
  const id = req.params.id;
  try {
    if ((await models.basket.findOne({ where: { ...req.body } })) != null) {
      res.status(409).send({ message: "This basket already exists" });
      return;
    }
    const updatedBasket = await models.basket.update(req.body, {
      where: { id: id },
    });
    await dealing();
    res.json(updatedBasket);
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
    await dealing();
    res.send({ success: true });
  } catch (e) {
    res.status(500).send({ message: "oops" });
  }
};
