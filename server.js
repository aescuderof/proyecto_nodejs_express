const express = require('express')
const cors = require('cors')
const swaggerUI = require('swagger-ui-express')
const swaggerJsDoc = require('swagger-jsdoc')
const path = require('path')

require('dotenv').config()
const port = process.env.PORT || 3000
const serverUrl = process.env.SERVER_URL || `http://localhost:${port}`

const swaggerOptions = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'Hotel Reservations API',
            version: '1.0.0',
            description: 'API for managing hotel reservations'
        },
        servers: [
            {
                url: serverUrl
            }
        ]
    },
    apis: [`${path.join(__dirname, './routes/*.js')}`]
}

const swaggerDocs = swaggerJsDoc(swaggerOptions)
const app = express()

app.use(cors())
app.use(express.json())

app.use('/api/reservas', require('./routes/reservas'))
app.use('/', swaggerUI.serve, swaggerUI.setup(swaggerDocs))

app.listen(port, () => console.log(`Servidor corriendo en el puerto ${port}`))