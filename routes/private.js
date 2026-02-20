import express, { Router } from "express";
import { PrismaClient } from "@prisma/client";

const router = express.Router();
const prisma = new PrismaClient();

router.get("/listar-usuarios", async (req, res) => {
  try {
    const user = await prisma.user.findMany();
    const userFiltrado = JSON.stringify(user.map(e => e.name));

    res
      .status(200)
      .json({ message: "Usuários listados com sucesso", userFiltrado});
  } catch (error) {
    res.status(500).json({ message: "Falha no servidor" });
  }
});

export default router;
