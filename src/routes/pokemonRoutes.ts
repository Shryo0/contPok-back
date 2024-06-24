import express, { Request, Response } from "express";
import PokemonController from "../controllers/PokemonController";

const router = express.Router();
const controller = new PokemonController();

router.post("/create", async (req: Request, res: Response) => {
  const response = await controller.create(req.body);
  return res.status(response === "OK" ? 200 : 400).send(response);
});

router.get("/getAll", async (req: Request, res: Response) => {
  const response = await controller.all();
  return res.status(response.error ? 400 : 200).send(response);
});

router.patch("/update", async (req: Request, res: Response) => {
  const response = await controller.update(req.body);
  return res.status(response.error ? 400 : 200).send(response);
});

router.delete("/delete/:id", async (req: Request, res: Response) => {
  const response = await controller.delete(req.params.id);
  return res.status(response.error ? 400 : 200).send(response);
});

router.patch("/incrementCounter/:id", async (req: Request, res: Response) => {
  const response = await controller.incrementCounter(req.params.id);
  return res.status(response.error ? 400 : 200).send(response);
});

router.get("/getPokemonWithHighestCounter", async (req: Request, res: Response) => {
  const response = await controller.getPokemonWithHighestCounter();
  return res.status(response.error ? 400 : 200).send(response);
});

router.get("/getByType/:type", async (req: Request, res: Response) => {
  const response = await controller.getByType(req.params.type);
  return res.status(response.error ? 400 : 200).send(response);
});

router.get("/getShiny", async (req: Request, res: Response) => {
  const response = await controller.getShiny();
  return res.status(response.error ? 400 : 200).send(response);
});

router.get("/getMega", async (req: Request, res: Response) => {
  const response = await controller.getMega();
  return res.status(response.error ? 400 : 200).send(response);
});

export default router;
