import express from 'express';
import mongoose from "mongoose";
import cors from "cors";
import bodyParser from "body-parser";
import userRouter from './routes/user.routes';
import registracijaRouter from './routes/registracija.routes';
import nekretninaRouter from './routes/nekretnina.routes';
import prodajaRouter from './routes/z_prodaja.routes';
import izdavanjeRouter from './routes/z_izdavanje.routes';
import porukaRouter from './routes/poruka.routes';
import agencijaRouter from './routes/agencija.routes';
import blokiranRouter from './routes/blokiran.routes';


const app = express();

app.use(cors());
app.use(bodyParser.json());

mongoose.connect("mongodb://localhost:27017/projekatBaza");
const connection=mongoose.connection;
connection.once("open", ()=>{
    console.log("mongo ok")
})

const router=express.Router();
router.use("/user", userRouter);
router.use("/register", registracijaRouter);
router.use('/nekretnine', nekretninaRouter);
router.use('/prodaja', prodajaRouter);
router.use('/izdavanje', izdavanjeRouter);
router.use('/poruka', porukaRouter);
router.use('/agencija', agencijaRouter);
router.use('/blokiran', blokiranRouter);

app.use('/', router);
app.listen(4000, () => console.log(`Express server running on port 4000`));