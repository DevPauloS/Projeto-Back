import express, { Router } from "express";
import { PrismaClient } from "@prisma/client";

const router = express.Router();
const prisma = new PrismaClient();

router.get("/listar-usuarios", async (req, res) => {
  try {
    const user = await prisma.user.findMany();
    const userFiltrado = 
        user.map((user) => {
          return {
            id: user.id * 123,
            name: user.name,
            email: user.email
          }
        });
    res
      .status(200)
      .json({ message: "Usuários listados com sucesso", user: userFiltrado});
  } catch (error) {
    res.status(500).json({ message: "Falha no servidor" });
  }
});

export default router;
