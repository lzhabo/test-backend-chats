import { RequestHandler } from "express";
import models from "../models";
import { dealing } from "../services";

export const getAllBalls: RequestHandler<null> = async (req, res, next) => {
  const balls = await models.ball.findAll({});
  // const balls = await models.ball.findAll({ include: "basket" });
  res.send(balls);
};
export const getBallById: RequestHandler = async (req, res, next) => {
  const ball = await models.ball.findByPk(req.params.id);
  res.send(ball);
};

export const createBall: RequestHandler = async (req, res, next) => {
  const ball = await models.ball.create(req.body);
  await dealing();
  res.send(ball);
};
export const updateBall: RequestHandler = async (req, res, next) => {
  const id = req.params.id;
  try {
    const updatedBall = await models.ball.update(req.body, {
      where: { id: id },
    });
    await dealing();
    res.json(updatedBall);
    return;
  } catch (e) {
    throw new Error(e);
  }
};
export const deleteBall: RequestHandler = async (req, res, next) => {
  const ball = await models.ball.findByPk(req.params.id);
  if (ball == null) res.status(404).send({ message: "There is no such ball" });

  try {
    await models.ball.destroy({
      where: { id: req.params.id },
    });
    await dealing();
    res.send({ success: true });
  } catch (e) {
    res.status(500).send({ message: "oops" });
  }
};
