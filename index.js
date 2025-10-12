import { PrismaClient } from "@prisma/client";
import cors from "cors";

const prisma = new PrismaClient();

export default async function handler(req, res) {
  cors(res);
  if (req.method === "OPTIONS") return res.status(200).end();

  if (req.method === "GET") {
    try {
      const users = await prisma.user.findMany();
      return res.status(200).json(users);
    } catch (err) {
      console.error(err);
      return res.status(500).json({ message: "Erro ao listar usuários" });
    }
  }

  return res.status(405).json({ message: "Método não permitido" });
}
