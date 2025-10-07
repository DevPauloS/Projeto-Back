import express from "express";
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";
import jwt from 'jsonwebtoken'

const prisma = new PrismaClient();
const router = express.Router();

const JWT_SECRET = process.env.JWT_SECRET

router.post("/cadastro", async (req, res) => {
  try {
    const user = req.body;
    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(user.password, salt);

    const userDB = await prisma.user.create({
      data: {
        email: user.email,
        name: user.name,
        password: hashPassword,
      },
    });
    res.status(201).json(userDB);
  } catch (error) {
    res.status(500).json({ message: "Erro no Servidor, tente novamente, CADASTRO" });
  }
});

router.post("/login", async (req, res) => {
  try {

    //guardando informações do usuário no front
    const userInfo = req.body;


    //buscando usuário no banco
    const user = await prisma.user.findUnique({
      where: { email: userInfo.email },
    });

    // mensagem de falha ao encontrar usuário
    if(!user){
        return res.status(404).json({message: 'Usuário não encontrado'})
    }

    //comparando as senhas
    const isMatch = await bcrypt.compare(userInfo.password, user.password)
    
    
    // mensagem de falha.
    if(!isMatch){
        return res. status(400).json({message: 'Senha inválida'})
    }

    //gerando token // 1° payload, secret, options
    const token = jwt.sign({id: user.id}, JWT_SECRET, {expiresIn: '1d'})

    res.status(200).json(token)
  } catch (error) {
    res.status(500).json({ message: "Erro no Servidor, tente novamente, LOGIN" });
  }
});

router.get("/listar", async (req, res) => {
  try {
    
    //buscando usuário no banco
    const user = await prisma.user.findMany()
    res.status(200).json(user)
  } catch (error) {
    res.status(500).json({ message: "Erro no Servidor, tente novamente, LOGIN" });
  }
});

export default router;
