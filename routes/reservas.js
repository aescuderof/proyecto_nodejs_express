const express = require('express')
const router = express.Router()
const reservasController = require('../controllers/reservasController')

/**
 * @swagger
 * components:
 *  schemas:
 *    Reserva:
 *      type: object
 *      properties:
 *        id:
 *          type: integer
 *          description: Identificador único de la reserva
 *        hotel:
 *          type: string
 *          description: Nombre del hotel
 *        tipoHabitacion:
 *          type: string
 *          description: Tipo de habitación (individual, doble, suite, etc.)
 *        numHuespedes:
 *          type: integer
 *          description: Número de huéspedes
 *        fechaInicio:
 *          type: string
 *          format: date
 *          description: Fecha de inicio de la reserva
 *        fechaFin:
 *          type: string
 *          format: date
 *          description: Fecha de fin de la reserva
 *        estado:
 *          type: string
 *          description: Estado de la reserva (confirmada, pendiente, cancelada)
 *        nombreHuesped:
 *          type: string
 *          description: Nombre del huésped principal
 *        email:
 *          type: string
 *          description: Email de contacto
 *        telefono:
 *          type: string
 *          description: Teléfono de contacto
 *      required:
 *        - hotel
 *        - tipoHabitacion
 *        - numHuespedes
 *        - fechaInicio
 *        - fechaFin
 *        - nombreHuesped
 *        - email
 */

/**
 * @swagger
 * /api/reservas:
 *  post:
 *    summary: Crear una nueva reserva
 *    tags: [Reservas]
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            $ref: '#/components/schemas/Reserva'
 *    responses:
 *      201:
 *        description: Reserva creada exitosamente
 */
router.post('/', reservasController.create)

/**
 * @swagger
 * /api/reservas:
 *  get:
 *    summary: Obtener todas las reservas
 *    tags: [Reservas]
 *    responses:
 *      200:
 *        description: Lista de todas las reservas
 */
router.get('/', reservasController.readAll)

/**
 * @swagger
 * /api/reservas/{id}:
 *  get:
 *    summary: Obtener una reserva específica
 *    tags: [Reservas]
 *    parameters:
 *      - in: path
 *        name: id
 *        schema:
 *          type: integer
 *        required: true
 *        description: ID de la reserva
 *    responses:
 *      200:
 *        description: Detalles de la reserva
 *      404:
 *        description: Reserva no encontrada
 */
router.get('/:id', reservasController.readOne)

/**
 * @swagger
 * /api/reservas/{id}:
 *  put:
 *    summary: Actualizar una reserva
 *    tags: [Reservas]
 *    parameters:
 *      - in: path
 *        name: id
 *        schema:
 *          type: integer
 *        required: true
 *        description: ID de la reserva
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            $ref: '#/components/schemas/Reserva'
 *    responses:
 *      200:
 *        description: Reserva actualizada exitosamente
 *      404:
 *        description: Reserva no encontrada
 */
router.put('/:id', reservasController.update)

/**
 * @swagger
 * /api/reservas/{id}:
 *  delete:
 *    summary: Eliminar una reserva
 *    tags: [Reservas]
 *    parameters:
 *      - in: path
 *        name: id
 *        schema:
 *          type: integer
 *        required: true
 *        description: ID de la reserva
 *    responses:
 *      200:
 *        description: Reserva eliminada exitosamente
 *      404:
 *        description: Reserva no encontrada
 */
router.delete('/:id', reservasController.delete)

/**
 * @swagger
 * /api/reservas/search:
 *  get:
 *    summary: Buscar reservas con filtros
 *    tags: [Reservas]
 *    parameters:
 *      - in: query
 *        name: hotel
 *        schema:
 *          type: string
 *        description: Nombre del hotel
 *      - in: query
 *        name: fecha_inicio
 *        schema:
 *          type: string
 *          format: date
 *        description: Fecha de inicio para filtrar
 *      - in: query
 *        name: fecha_fin
 *        schema:
 *          type: string
 *          format: date
 *        description: Fecha de fin para filtrar
 *      - in: query
 *        name: tipo_habitacion
 *        schema:
 *          type: string
 *        description: Tipo de habitación
 *      - in: query
 *        name: estado
 *        schema:
 *          type: string
 *        description: Estado de la reserva
 *      - in: query
 *        name: num_huespedes
 *        schema:
 *          type: integer
 *        description: Número de huéspedes
 *    responses:
 *      200:
 *        description: Lista de reservas filtradas
 *      404:
 *        description: No se encontraron reservas
 */
router.get('/search', reservasController.filter)

module.exports = router