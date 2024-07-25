import express from "express";

import { app } from "./Server.js";

import Controller from "./controllers/Controller.js";
import UserController from "./controllers/UserController.js";
import CheckoutController from "./controllers/CheckoutController.js";

app.get("/", Controller.base);
app.post("/users", UserController.create);
app.post("/checkout", CheckoutController.purchase);
