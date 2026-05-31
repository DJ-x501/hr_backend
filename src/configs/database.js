const { PrismaClient } = require("@prisma/client");
const { Pool } = require("pg");
const { PrismaPg } = require("@prisma/adapter-pg");
require("dotenv").config();

const connectionString = process.env.DATABASE_URL;

const pool = new Pool({
  connectionString,
});

const pgAdapter = new PrismaPg(pool);

const prisma = new PrismaClient({
  adapter: pgAdapter,
});

async function connectDB() {
  try {
    await prisma.$connect();
    console.log("Connected to the database successfully!");
  } catch {
    console.error("Failed to connect to the database.");
    process.exit(1);
  }
}

module.exports = {
  connectDB,
  prisma,
};