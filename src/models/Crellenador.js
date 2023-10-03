import { Schema, model } from "mongoose";

const CrellenadorSchema = new Schema(
  {
    nombrePieza: {
        type: String,
        required: true
      },
      precioPieza: {
        type: Number,
        required: true
      },
      tipo:{
        type: String,
        required: true
      },
      categoria:{
        type: String,
        required: true
      },
      user: {
        type: String,
        required: true,
    }
    });

export default model("Rellenador", CrellenadorSchema);
