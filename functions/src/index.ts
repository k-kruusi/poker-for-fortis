/**
 * Import function triggers from their respective submodules:
 *
 * import {onCall} from "firebase-functions/v2/https";
 * import {onDocumentWritten} from "firebase-functions/v2/firestore";
 *
 * See a full list of supported triggers at https://firebase.google.com/docs/functions
 */

import * as functions from "firebase-functions";
import * as express from "express";
import {validateHandQuery} from "./validator";
import {validateDealQuery} from "./deal";

const app = express();
app.get("/validate", (req, res) => {
  validateHandQuery(req, res);
});

app.get("/deal", (req, res) => {
  validateDealQuery(req, res);
});

exports.app = functions.runWith({memory: "256MB", timeoutSeconds: 10})
  .https.onRequest(app);
