// Data store
let reservas = [
    {
        id: 1,
        hotel: "Hotel Paraíso",
        tipoHabitacion: "doble",
        numHuespedes: 2,
        fechaInicio: "2023-05-15",
        fechaFin: "2023-05-20",
        estado: "confirmada",
        nombreHuesped: "Juan Pérez",
        email: "juan@example.com",
        telefono: "123456789"
    }
];

// Crear reserva
exports.create = async (req, res) => {
    const nuevaReserva = req.body
    nuevaReserva.id = reservas.length > 0 ? Math.max(...reservas.map(r => r.id)) + 1 : 1
    reservas.push(nuevaReserva)

    res.status(201).json({
        msg: 'Reserva creada con éxito.',
        data: nuevaReserva
    })
}

// Obtener todas las reservas
exports.readAll = async (req, res) => {
    res.json({
        msg: 'Reservas obtenidas con éxito.',
        data: reservas
    })
}

// Obtener una reserva específica
exports.readOne = async (req, res) => {
    const reservaId = parseInt(req.params.id)
    const reserva = reservas.find(r => r.id === reservaId)

    if (!reserva) {
        return res.status(404).json({ msg: 'Reserva no encontrada.' })
    }

    res.json({
        msg: 'Reserva obtenida con éxito.',
        data: reserva
    })
}

// Actualizar una reserva
exports.update = async (req, res) => {
    const reservaId = parseInt(req.params.id)
    const reservaIndex = reservas.findIndex(r => r.id === reservaId)

    if (reservaIndex === -1) {
        return res.status(404).json({ msg: 'Reserva no encontrada.' })
    }

    reservas[reservaIndex] = { ...reservas[reservaIndex], ...req.body }
    res.json({
        msg: 'Reserva actualizada con éxito.',
        data: reservas[reservaIndex]
    })
}

// Eliminar una reserva
exports.delete = async (req, res) => {
    const reservaId = parseInt(req.params.id)
    const reservaIndex = reservas.findIndex(r => r.id === reservaId)

    if (reservaIndex === -1) {
        return res.status(404).json({ msg: 'Reserva no encontrada.' })
    }

    reservas.splice(reservaIndex, 1)
    res.json({ msg: 'Reserva eliminada con éxito.' })
}

// Filtros de búsqueda
exports.filter = async (req, res) => {
    const { hotel, fecha_inicio, fecha_fin, tipo_habitacion, estado, num_huespedes } = req.query

    const reservasFiltradas = reservas.filter(reserva => {
        if (hotel && reserva.hotel !== hotel) {
            return false
        }
        if (fecha_inicio && fecha_fin) {
            const fechaReservaInicio = new Date(reserva.fechaInicio)
            const fechaReservaFin = new Date(reserva.fechaFin)
            const fechaInicioFiltro = new Date(fecha_inicio)
            const fechaFinFiltro = new Date(fecha_fin)
            
            if (fechaReservaFin < fechaInicioFiltro || fechaReservaInicio > fechaFinFiltro) {
                return false
            }
        }
        if (tipo_habitacion && reserva.tipoHabitacion !== tipo_habitacion) {
            return false
        }
        if (estado && reserva.estado !== estado) {
            return false
        }
        if (num_huespedes && reserva.numHuespedes !== parseInt(num_huespedes)) {
            return false
        }
        return true
    })

    if (reservasFiltradas.length === 0) {
        return res.status(404).json({ msg: 'No se encontraron reservas con los criterios especificados.' })
    }

    res.json({
        msg: 'Reservas filtradas con éxito.',
        data: reservasFiltradas
    })
}