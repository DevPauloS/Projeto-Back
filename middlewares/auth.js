import jwt from 'jsonwebtoken'

const JWT_SECRET = process.env.JWT_SECRET

const auth = (req, res, next) => {
    const token = req.headers.authorization
    
    if(!token){
        res.status(500).json({message: 'ERRO Grande'})
    }

    try {
        const decoded = jwt.verify(token.replace('Bearer ', ''), JWT_SECRET)
        
        req.userId = decoded.id

        
        next()
    } catch (error) {
        return res.status(401).json({message: 'Token inválido'})
    }

}

export default auth