import Cvaciador from "../models/Cvaciador"
import Empleado from "../models/Empleado";
import Crellenador from "../models/Crellenador"
import Ctrazador from "../models/Ctrazador"
import Crelle from "../models/Crelle";
import decimal from "../helpers/decimal";
export const renderIndex = (req, res) => {
  res.render("index");
};

export const renderAbout = async (req, res) => {
  const prelle = await Crelle.find({tipo: "Pulidor"}).lean();
  const pvaciador = await Cvaciador.find({tipo: "Vaciador"}).lean()
  const ppulidor = await Crellenador.find({tipo: "Rellenador"}).lean()
  const ptrazador = await Ctrazador.find({tipo: "Trazador"}).lean()
  res.render("about", {pvaciador, ppulidor, ptrazador, prelle, decimal});
};

export const renderAdmin = async (req, res) => {
  const empleador = await Empleado.find({tipoEmpleado: "Pulidor"}).lean()
  const empleadov = await Empleado.find({tipoEmpleado: "Vaciador"}).lean()
  const empleadop = await Empleado.find({tipoEmpleado: "Rellenador"}).lean()
  const empleadot = await Empleado.find({tipoEmpleado: "Trazador"}).lean()
  const empleado = await Empleado.find().lean()
  const pvaciador = await Cvaciador.find({tipo: "Vaciador"}).lean()
  const ppulidor = await Cvaciador.find({tipo: "Rellenador"}).lean()
  const ptrazador = await Cvaciador.find({tipo: "Trazador"}).lean()
  res.render("admindash", {pvaciador, ppulidor, ptrazador, empleado, empleadov, empleadop, empleadot, empleador});
};