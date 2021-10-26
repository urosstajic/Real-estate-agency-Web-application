import express from "express";
import { BlokiranController } from "../controllers/blokiran.controller";

const blokiranRouter=express.Router();

blokiranRouter.route('/dohvSve').get(
    (req, res)=>new BlokiranController().dohvatiSve(req, res)
);

blokiranRouter.route('/blokiraj').post(
    (req, res)=>new BlokiranController().blokiraj(req, res)
);

blokiranRouter.route('/odblokiraj').post(
    (req, res)=>new BlokiranController().odblokiraj(req, res)
);

export default blokiranRouter;