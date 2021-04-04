import { RequestHandler } from "express";
import models from "../models";

export const getAllBalls: RequestHandler<null> = async (req, res, next) => {
  const balls = await models.ball.findAll({});
  // const balls = await models.ball.findAll({ include: "basket" });
  res.send(balls);
};
export const getBallById: RequestHandler = async (req, res, next) => {
  const ball = await models.ball.findByPk(req.params.id);
  // console.log(ball?.getDataValue("basketId"));
  res.send(ball);
};

export const createBall: RequestHandler = async (req, res, next) => {
  const ball = await models.ball.create(req.body);
  res.send(ball);
};
export const updateBall: RequestHandler = async (req, res, next) => {
  const id = req.params.id;
  try {
    const updatedBall = await models.ball.update(req.body, {
      where: { id: id },
    });
    res.json(updatedBall);
    return;
  } catch (e) {
    throw new Error(e);
  }
};
export const deleteBall: RequestHandler = async (req, res, next) => {
  throw new Error("Not implemented");
};
