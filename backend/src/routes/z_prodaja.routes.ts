import express from "express";
import { ProdajaController } from "../controllers/z_prodaja.controller";

const prodajaRouter=express.Router();

prodajaRouter.route('/dodajZahtev').post(
    (req, res)=>new ProdajaController().dodajZahtev(req, res)
)
prodajaRouter.route("/dohvatiRedProdaja").post(
    (req, res)=>new ProdajaController().dohvatiRedProdaja(req, res)
)

prodajaRouter.route('/dohvatiSve').get(
    (req, res)=>new ProdajaController().dohvatiSve(req, res)
)

prodajaRouter.route("/prihvatiZahtevProdajaKorisnik").post(
    (req, res)=>new ProdajaController().prihvatiZahtevProdajaKorisnik(req, res)
);


prodajaRouter.route('/prihvatiZahtevProdajaAgencija').post(
    (req, res)=>new ProdajaController().prihvatiZahtevProdajaAgencija(req, res)
)

prodajaRouter.route("/odbijSveOstalePonude").post(
    (req, res)=>new ProdajaController().odbijSveOstalePonude(req, res)
)

prodajaRouter.route('/odbijPonudu').post(
    (req, res)=>new ProdajaController().odbijPonudu(req, res)
);

prodajaRouter.route('/prihod').post(
    (req, res)=>new ProdajaController().postaviPrihod(req, res)
);

prodajaRouter.route('/promeniNazivNekr').post(
    (req, res)=>new ProdajaController().promeniNazivNekr(req, res)
)

prodajaRouter.route('/promeniVlasnik').post(
    (req, res)=>new ProdajaController().promeniVlasnika(req, res)
)

prodajaRouter.route('/promeniKorisnik').post(
    (req, res)=>new ProdajaController().promeniKorisnik(req, res)
)

export default prodajaRouter;