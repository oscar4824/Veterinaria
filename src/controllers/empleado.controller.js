import Empleado from "../models/Empleado";
export const renderEmpleadoForm = (req, res) => {
  res.render("empleado/new-empleado");
};

export const createNewEmpleado = async (req, res) => {
  const { nombre, telefono, tipoEmpleado, asistencia } = req.body;
  const errors = [];
  if (!nombre) {
    errors.push({ text: "Porfavor escribe el nombre del Empleado" });
  }
  if (!telefono) {
    errors.push({ text: "Porfavor escribe el numero del telefono" });
  }
  if (!tipoEmpleado) {
    errors.push({ text: "Porfavor selecciona el tipo de Empleado" });
  }

  if (errors.length > 0) {
    res.render("empleado/new-empleado", {
      errors,
      nombre,
      telefono,
      tipoEmpleado,

    });
  } else {
    const newEmpleado = new Empleado({nombre, telefono, tipoEmpleado, asistencia });
    newEmpleado.user = req.user.id;
    await newEmpleado.save();
    req.flash("success_msg", "Empleado añadido Successfully");
    res.redirect("/empleados");
  }
};

export const renderEmpleados = async (req, res) => {
  const empleado = await Empleado.find(req.params.id).lean();
    // .sort({ date: "desc" }).
  res.render("empleado/all-empleados", {empleado});
};

export const renderEditForm = async (req, res) => {
  const empleado = await Empleado.findById(req.params.id).lean();
  if (empleado.user != req.user.id) {
    req.flash("error_msg", "Not Authorized");
    return res.redirect("/empleados");
  }
  res.render("empleado/edit-empleado", { empleado });
};

export const updateEmpleado = async (req, res) => {
  const {nombre, telefono, tipoEmpleado, asistencia} = req.body;
  await Empleado.findByIdAndUpdate(req.params.id, { nombre, telefono, tipoEmpleado, asistencia });
  req.flash("success_msg", "Empleado Updated Successfully");
  res.redirect("/empleados");
};

export const deleteEmpleado = async (req, res) => {
  await Empleado.findByIdAndDelete(req.params.id);
  req.flash("success_msg", "Empleado Deleted Successfully");
  res.redirect("/empleados");
};
