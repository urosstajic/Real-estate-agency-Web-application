import express from "express";
import { IzdavanjeController } from "../controllers/z_izdavanje.controller";

const izdavanjeRouter=express.Router();

izdavanjeRouter.route('/dodajZahtev').post(
    (req, res)=>new IzdavanjeController().dodajZahtev(req, res)
)

izdavanjeRouter.route("/dohvatiRed").post(
    (req, res)=>new IzdavanjeController().dohvatiRed(req, res)
);

izdavanjeRouter.route('/dohvatiSve').get(
    (req, res)=>new IzdavanjeController().dohvatiSve(req, res)
);

izdavanjeRouter.route("/prihvatiZahtevIzdavanjeKorisnik").post(
    (req, res)=>new IzdavanjeController().prihvatiZahtevIzdavanjeKorisnik(req, res)
);

izdavanjeRouter.route("/prihvatiZahtevIzdavanjeAgencija").post(
    (req, res)=>new IzdavanjeController().prihvatiZahtevIzdavanjeAgencija(req, res)
);

izdavanjeRouter.route('/odbijPonudu').post(
    (req, res)=>new IzdavanjeController().odbijPonudu(req, res)
)

izdavanjeRouter.route('/odbijSveZahteve').post(
    (req, res)=>new IzdavanjeController().odbijSveZahteve(req, res)
)

izdavanjeRouter.route('/prihod').post(
    (req, res)=>new IzdavanjeController().postaviPrihod(req, res)
)

izdavanjeRouter.route('/promeniNazivNekr').post(
    (req, res)=>new IzdavanjeController().promeniNazivNekr(req, res)
)

izdavanjeRouter.route('/promeniVlasnik').post(
    (req, res)=>new IzdavanjeController().promeniVlasnika(req, res)
)

izdavanjeRouter.route('/promeniKorisnik').post(
    (req, res)=>new IzdavanjeController().promeniKorisnik(req, res)
)

export default izdavanjeRouter;