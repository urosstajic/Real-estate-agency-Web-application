import express from "express";
import { PorukaController } from "../controllers/poruka.controller";

const porukaRouter=express.Router();

porukaRouter.route('/dohvatiSveKonverzacije').post(
    (req, res)=>new PorukaController().dohvatiSveKonverzacije(req, res)
);

porukaRouter.route('/arhiviraj').post(
    (req, res)=>new PorukaController().arhiviraj(req, res)
);

porukaRouter.route('/izbaciIzArhiviranih').post(
    (req, res)=>new PorukaController().izbaciIzArhiviranih(req, res)
);

porukaRouter.route('/dohvatiSvePorukeKonverzacije').post(
    (req, res)=>new PorukaController().dohvatiSvePorukeKonverzacije(req, res)
);

porukaRouter.route('/dohvatiSveKonverzacijeAgent').get(
    (req, res)=>new PorukaController().dohvatiSvePorukeAgent(req, res)
);


porukaRouter.route('/posaljiPoruku').post(
    (req, res)=>new PorukaController().posaljiPoruku(req, res)
);

porukaRouter.route('/dohvatiSve').get(
    (req, res)=>new PorukaController().dohvatiSve(req, res)
);

porukaRouter.route('/postaviProcitano').post(
    (req, res)=>new PorukaController().postaviProcitano(req, res)
);

porukaRouter.route('/promeniNazivNekr').post(
    (req, res)=>new PorukaController().promeniNazivNekr(req, res)
)

porukaRouter.route('/promeniPosiljalac').post(
    (req, res)=>new PorukaController().promeniPosiljalac(req, res)
)

porukaRouter.route('/promeniPrimalac').post(
    (req, res)=>new PorukaController().promeniPrimalac(req, res)
)

porukaRouter.route('/promeniImeAgenta').post(
    (req, res)=>new PorukaController().promeniImeAgenta(req, res)
)

export default porukaRouter;