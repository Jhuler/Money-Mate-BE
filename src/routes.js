import signin from './routes/_signin.js'
import signup from './routes/_signup.js'
import verifyToken from "./routes/_verifyToken.js"

import usuarios from './routes/usuarios.js'
import cuentas from './routes/cuentas.js'
import categorias from './routes/categorias.js'
import movimientos from './routes/movimientos.js'
import prestamos from './routes/prestamos.js'

function routes(app) {
    app.get('/', (req, res) => res.status(200).send(`Server is running`))

    app.use('/signin', signin)
    app.use('/signup', signup)
    
    app.use('/api', verifyToken)
    app.use('/api/usuarios', usuarios)
    app.use('/api/cuentas', cuentas)
    app.use('/api/categorias', categorias)
    app.use('/api/movimientos', movimientos)
    app.use('/api/prestamos', prestamos)
}

export default routes