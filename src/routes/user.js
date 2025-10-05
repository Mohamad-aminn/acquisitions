import express from "express";
import jwt from "jsonwebtoken";
import db from "#configs/db.js";
import {users} from "#models/schema.js"

const route = express.Router();
