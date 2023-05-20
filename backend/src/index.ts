import express from "express";
import routes from "./routes";
import bodyParser from "body-parser";
import cors from "cors";

import helmet from "helmet";
import morgan from 'morgan';
import { loadContract } from "./helpers/LoadContract";


// auth router attaches /login, /logout, and /callback routes to the baseURL
const app = express();
app.use(helmet());

app.use(morgan('combined'));
app.get("/", (req, res) => {
  res.json("Project working");
});

app.use(cors());
app.use(express.json({ limit: "30mb" }));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.json());

app.use("/", routes);
loadContract('TwidCoin')
app.listen(4000, () => {
  console.log("Working");
});
