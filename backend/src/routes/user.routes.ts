import express from "express";
import { UserController } from "../controllers/user.controller";

const userRouter=express.Router();

userRouter.route('/login').post(
    (req,res)=>new UserController().login(req, res)
);

userRouter.route('/nadjiPoUsername').post(
    (req, res)=>new UserController().nadjiPoUsername(req, res)
);

userRouter.route('/nadjiPoMejlu').post(
    (req, res)=>new UserController().nadjiPoUsername(req, res)
)

userRouter.route('/promeniLozinku').post(
    (req, res)=>new UserController().promeniLozinku(req, res)
)

userRouter.route('/azurirajPodatke').post(
    (req, res)=>new UserController().azurirajPodatke(req, res)
)

userRouter.route('/nadjiSveUsere').get(
    (req, res)=>new UserController().nadjiSveUsere(req, res)
)

userRouter.route("/brisi").post(
    (req, res)=>new UserController().brisi(req, res)
)

userRouter.route('/azurirajPodatkeAdmin').post(
    (req, res)=>new UserController().azurirajPodatkeAdmin(req , res)
)

userRouter.route('/dodajKorisnika').post(
    (req, res)=>new UserController().dodajKorisnika(req, res)
)

export default userRouter;