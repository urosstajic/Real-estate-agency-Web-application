import express from "express";
import { AgencijaController } from "../controllers/agencija.controller";

const agencijaRouter=express.Router();

agencijaRouter.route('/dohvSve').get(
    (req, res)=>new AgencijaController().dohvatiSve(req, res)
);

agencijaRouter.route('/defProcente').post(
    (req, res)=>new AgencijaController().defProcente(req, res)
)

export default agencijaRouter;