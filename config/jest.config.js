import dotenv from "dotenv";
import path from "path";

/**
 * Le e processa o arquivo .env.test e disponibiliza
 * na variavel de ambiente(process.env).
 */

dotenv.config({ path: path.resolve() + "/.env.test" });
