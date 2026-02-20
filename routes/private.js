import express, { Router } from "express";
import { PrismaClient } from "@prisma/client";

const router = express.Router();
const prisma = new PrismaClient();

router.get("/listar-usuarios", async (req, res) => {
  try {
    const user = await prisma.user.findFirst({
      select: {
        id: true,
        name: true,
        email: true
      }
    });
    res
      .status(200)
      .json({ message: "Usuários listados com sucesso", user: user});
  } catch (error) {
    res.status(500).json({ message: "Falha no servidor" });
  }
});

export default router;
