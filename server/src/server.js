import { json, urlencoded } from "body-parser";
import cors from "cors";
import express, { Express } from "express";
import morgan from "morgan";

export const createServer = () => {
  const app = express();
  app
    .disable("x-powered-by")
    .use(morgan("dev"))
    .use(
      urlencoded({
        extended: true,
      })
    )
    .use(json())
    .use(cors())
    .get("/check", (req, res) => {
      return res.json({
        ok: true,
      });
    })
    .get("/check/:name", (req, res) => {
      return res.json({
        message: `hello ${req.params.name}`,
      });
    })
    .get("/check/nested", (req, res) => {
      return res.json({ nested: "mentions" });
    })
  return app;
};
