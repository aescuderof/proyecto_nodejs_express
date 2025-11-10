require('dotenv').config();
const express = require('express');
const app = express();
const reservationsRouter = require('./routes/reservations');
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger.json');

app.use(express.json());

app.use('/api/reservations', reservationsRouter);

// Swagger UI
app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Hotel Reservations service running on port ${PORT}`);
  console.log(`API docs available at http://localhost:${PORT}/docs`);
});
