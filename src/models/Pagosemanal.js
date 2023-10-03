import { Schema, model } from "mongoose";

const PagosemanalSchema = new Schema(
  {
    nombrePieza: {
        type: [String],
        ref: 'Cvaciador',
        required: true
      },
      precioPieza: {
        type: [String],
        ref: 'Cvaciador',
        required: true
      },
      cantPieza: {
        type: [Number],
        required: true
      },
      asistencia:{ 
        type: String,
        ref: 'Empleado',
        required: true
    },
    nombre:{
        type: String,
        ref: 'Empleado',
        required: true
    },
    tipoEmpleado: {
      type: String,
      ref: 'Empleado',
      required: true
    },
    fecha:{
        type: Date,
        default: Date.now
    },
    user: {
      type: String,
      required: true,
  }

    });

export default model("Pagosemanal", PagosemanalSchema);
