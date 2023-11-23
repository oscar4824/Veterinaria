// Read environment variables
import { config } from "dotenv";
config();

const configurations = {
  PORT: process.env.PORT || 4000,
  MONGODB_HOST: process.env.MONGODB_HOST || "127.0.0.1",
  MONGODB_DATABASE: process.env.MONGODB_DB || "veterinaria-app",
  MONGODB_URI: `mongodb://${process.env.MONGODB_HOST || "127.0.0.1"}/${
    process.env.MONGODB_DATABASE || "veterinaria-app"
  }`,
};
// PORT: process.env.PORT || 4000,
//  MONGODB_HOST: process.env.MONGODB_HOST || "localhost",
//  MONGODB_DATABASE: process.env.MONGODB_DB || "administracionapp",
//  MONGODB_URI:`mongodb+srv://Bola:123@cluster0.hjqe2.mongodb.net/?retryWrites=true&w=majority`,
//  MONGODB_URI: `mongodb:${process.env.MONGODB_HOST || "localhost"}/${
//    process.env.MONGODB_DATABASE || "bar"`,
// };

export default configurations;
