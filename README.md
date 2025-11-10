# Proyecto: Reservas Hoteleras (Node.js + Express)

Breve documentación para entender la estructura del proyecto y cómo usarlo.

## Resumen
Aplicación mínima en Node.js/Express que expone una API para gestionar reservas hoteleras.

- Servidor: `server.js`
- Rutas: `routes/reservas.js`
- Controlador (lógica): `controllers/reservasController.js`
- Documentación Swagger: montada en la raíz `/` (Swagger UI)

Esta aplicación usa un almacenado en memoria (array `reservas`), por lo que los datos no persisten entre reinicios.

## Archivos principales
- `server.js` - configura Express, CORS, JSON body parser y Swagger; monta las rutas en `/api/reservas`.
- `routes/reservas.js` - define las rutas REST (POST, GET, PUT, DELETE, search) y la docu Swagger para cada endpoint.
- `controllers/reservasController.js` - contiene las operaciones CRUD y un método de filtrado basado en parámetros de query.

## Variables de entorno (.env)
- `PORT` - puerto donde corre el servidor (por defecto 3000)
- `SERVER_URL` - URL base usada por Swagger (opcional)

Si no existe `.env`, el servidor usará `http://localhost:3000` por defecto.

## Cómo ejecutar (PowerShell)
1. Instalar dependencias:

2. Ejecutar el servidor:

```powershell
node server.js
```

3. Abrir la documentación Swagger en el navegador:

Visitar `http://localhost:3000/` (o el `SERVER_URL` si lo configuraste en `.env`).

## Endpoints principales
Base: `http://localhost:3000/api/reservas`

- POST `/` - Crear reserva
  - Body JSON: ver esquema `Reserva` en `routes/reservas.js` (campos como `hotel`, `tipoHabitacion`, `numHuespedes`, `fechaInicio`, `fechaFin`, `nombreHuesped`, `email`, `telefono`)
  - Respuesta: 201 con la reserva creada

- GET `/` - Obtener todas las reservas
  - Respuesta: 200 con arreglo de reservas

- GET `/:id` - Obtener reserva por ID
  - Respuesta: 200 si existe, 404 si no

- PUT `/:id` - Actualizar reserva por ID
  - Body JSON: campos a actualizar
  - Respuesta: 200 con la reserva actualizada o 404 si no existe

- DELETE `/:id` - Eliminar reserva por ID
  - Respuesta: 200 si se eliminó o 404 si no existe

- GET `/search` - Filtrar reservas por query params
  - Query parameters soportados: `hotel`, `fecha_inicio`, `fecha_fin`, `tipo_habitacion`, `estado`, `num_huespedes`
  - Ejemplo: `/api/reservas/search?hotel=Hotel%20Mario%20Hugo&fecha_inicio=2023-05-10&fecha_fin=2023-05-30`

## Notas importantes
- El almacenamiento es en memoria (`let reservas = [...]`) en `controllers/reservasController.js`. 
- Swagger está configurado con `swagger-jsdoc` para generar la documentación a partir de los comentarios JSDoc en `routes/*.js`.

