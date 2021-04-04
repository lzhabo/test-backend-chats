import path from "path";
import { config } from "dotenv";
import { loadVar } from "./utils";

config({ path: path.join(__dirname, "../.env") });

export const psqlUrl = loadVar("POSTGRE_URL");
export const port = loadVar("PORT", true);
