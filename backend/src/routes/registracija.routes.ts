import express from "express";
import { RegistracijaController } from "../controllers/registracija.controller";

const registracijaRouter=express.Router();

registracijaRouter.route('/registracija').post(
    (req, res)=>new RegistracijaController().registracija(req, res)
);

registracijaRouter.route('/nadjiSveReg').get(
    (req, res)=>new RegistracijaController().nadjiSveReg(req, res)
)

registracijaRouter.route('/odbij').post(
    (req, res)=>new RegistracijaController().odbij(req, res)
)

export default registracijaRouter;