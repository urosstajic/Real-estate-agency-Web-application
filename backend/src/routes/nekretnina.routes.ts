import express from "express";
import { NekretninaController } from "../controllers/nekretnina.controller";

const nekretninaRouter=express.Router();

nekretninaRouter.route('/pronadjiNekretninu').post(
    (req, res)=>new NekretninaController().pronadjiNekretninu(req, res)
);
 
nekretninaRouter.route('/dohvatiSve').get(
    (req, res)=>new NekretninaController().dohvatiSve(req, res)
);

nekretninaRouter.route('/dohvatiNekrPoId').post(
    (req, res)=>new NekretninaController().dohvatiNekrPoId(req, res)
)

nekretninaRouter.route('/odobri').post(
    (req, res)=>new NekretninaController().odobri(req, res)
)

nekretninaRouter.route('/odbij').post(
    (req, res)=>new NekretninaController().odbij(req, res)
)

nekretninaRouter.route('/dodajNekretninu').post(
    (req, res)=>new NekretninaController().dodajNekrentinu(req, res)
)

nekretninaRouter.route('/promovisi').post(
    (req, res)=>new NekretninaController().promovisi(req, res)
)

nekretninaRouter.route('/izbaciIzPromovisanih').post(
    (req, res)=>new NekretninaController().izbaciIzPromovisanih(req, res)
)

nekretninaRouter.route('/azuriraj').post(
    (req, res)=>new NekretninaController().azuriraj(req, res)
)

nekretninaRouter.route('/azurirajDodaj').post(
    (req, res)=>new NekretninaController().azurirajDodaj(req, res)
)

nekretninaRouter.route('/nePrikazuj').post(
    (req, res)=>new NekretninaController().nePrikazuj(req, res)
)

nekretninaRouter.route('/promeniImeVlasnik').post(
    (req, res)=>new NekretninaController().promeniImeVlasnik(req, res)
)

export default nekretninaRouter;