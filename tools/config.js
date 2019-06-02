const dotenv = require("dotenv");

dotenv.config({ path: `.env.${process.env.NODE_ENV}` });
dotenv.config({ path: ".env" });
