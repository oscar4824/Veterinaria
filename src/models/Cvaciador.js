import { Schema, model } from "mongoose";

const CvaciadorSchema = new Schema(
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

export default model("Vaciador", CvaciadorSchema);
