import express, { json } from "express";
import dotenv from "dotenv";
import cors from "cors";
import { auth, requiredScopes } from "express-oauth2-jwt-bearer";

const checkJwt = auth({
  audience: "https://dev-2h7gdckeu4xol84o.us.auth0.com/api/v2/",
  issuerBaseURL: "http://localhost:5173/",
});

dotenv.config();
const app = express();
const PORT = process.env.PORT || 4001;

app.use(cors());
app.use(json());

// This route doesn't need authentication
app.get("/api/public", function (req, res) {
  res.json({
    message:
      "Hello from a public endpoint! You don't need to be authenticated to see this.",
  });
});

// This route needs authentication
app.get("/api/private", checkJwt, function (req, res) {
  res.json({
    message:
      "Hello from a private endpoint! You need to be authenticated to see this.",
  });
});

const checkScopes = requiredScopes("read:messages");

app.get("/api/private-scoped", checkJwt, checkScopes, function (req, res) {
  res.json({
    message:
      "Hello from a private endpoint! You need to be authenticated and have a scope of read:messages to see this.",
  });
});

app.listen(PORT, () => console.log(`Server is running on PORT : ${PORT}`));
