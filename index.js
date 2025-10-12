import express from 'express'
import publicRoutes from './routes/public.js'
// import privateRoutes from './routes/private.js'
// import auth from './middlewares/auth.js'
import cors from 'cors';


const app = express();
app.use(express.json())
app.use(cors({
  origin: ["*"], // ou "*" pra testes
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  credentials: true
}));

router.get("/listar-usuarios", async (req, res) => {
  try {
    const user = await prisma.user.findMany();

     res.status(200).json({ message: "Usuários listados com sucesso", user });
  } catch (error) {
     res.status(500).json({ message: "Falha no servidor, LISTAR"});
  }
});
// const port = process.env.port || 3001;

// app.use('/', publicRoutes)
// app.use('/', auth, privateRoutes)

app.listen(3000, () => console.log("Servidor rodando!!"))
