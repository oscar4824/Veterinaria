import { Schema, model } from "mongoose";

const EmpleadoSchema = new Schema(
  {
    nombre: {
        type: String,
        required: true
      },
      telefono: {
        type: String,
        required: true
      },
      tipoEmpleado: {
        type: [String],
        required: true
      },
      asistencia:{ 
        type: String,
        default: true
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

export default model("Empleado", EmpleadoSchema);
