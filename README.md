# Hotel Reservations Service

Proyecto ejemplo: API REST para gestionar reservas de hotel (CRUD + filtros) usando Node.js y Express.

Instalación

1. Instalar dependencias

   npm install

2. Ejecutar

   npm start

El servidor utilizará el puerto definido en `.env` (por defecto 4000). La documentación Swagger estará en `/docs`.

Endpoints principales

- POST /api/reservations  -> crear
- GET /api/reservations   -> listar todas
- GET /api/reservations/:id -> obtener por id
- PUT /api/reservations/:id -> actualizar
- DELETE /api/reservations/:id -> eliminar

Filtros adicionales

- GET /api/reservations/hotel/:hotel
- GET /api/reservations/guest/:guest
- GET /api/reservations/date?from=YYYY-MM-DD&to=YYYY-MM-DD
- GET /api/reservations/status/:status
- GET /api/reservations/room/:roomType
- GET /api/reservations/price?min=0&max=1000
- GET /api/reservations/search?<query params combined>

Notas

- Este proyecto usa almacenamiento en memoria (array). En producción reemplazar por base de datos.
