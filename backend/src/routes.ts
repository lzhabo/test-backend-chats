import { Router } from "express";
import * as ballController from "./controllers/ballController";
import * as basketController from "./controllers/basketController";

const router = Router();

router.get("/", (req, res) => res.send("Hello World"));

// Item routes
router.get("/balls/", ballController.getAllBalls);
router.get("/balls/:id", ballController.getBallById);
router.post("/balls/", ballController.createBall);
router.put("/balls/:id", ballController.updateBall);
router.delete("/balls/:id", ballController.deleteBall);

// Basket routes
router.get("/baskets/", basketController.getAllBaskets);
router.get("/baskets/:id", basketController.getBasketById);
router.post("/baskets/", basketController.createBasket);
router.put("/baskets/:id", basketController.updateBasket);
router.delete("/baskets/:id", basketController.deleteBasket);

export { router };
