import Cvaciador from "../models/Cvaciador";
export const renderCvaciadorForm = (req, res) => {
  res.render("pvaciador/new-pvaciador");
};

export const createNewCvaciador = async (req, res) => {
  const { nombrePieza, precioPieza, tipo, categoria } = req.body;
  const errors = [];
  if (!nombrePieza) {
    errors.push({ text: "Porfavor escribe el nombre de la Pieza" });
  }
  if (!precioPieza) {
    errors.push({ text: "Porfavor escribe el precio de la Pieza" });
  }
  if (!tipo) {
    errors.push({ text: "Porfavor selecciona el tipo de la Pieza" });
  }
  if (!categoria) {
    errors.push({ text: "Porfavor selecciona la categtoria de la Pieza" });
  }
  if (errors.length > 0) {
    res.render("pvaciador/new-pvaciador", {
      errors,
      nombrePieza,
      precioPieza,
      tipo,
      categoria

    });
  } else {
    const newCvaciador = new Cvaciador({nombrePieza, precioPieza, tipo, categoria });
    newCvaciador.user = req.user.id;
    await newCvaciador.save();
    req.flash("success_msg", "Empleado añadido Successfully");
    res.redirect("/pvaciadors");
  }
};

export const renderCvaciadors = async (req, res) => {
  const vpieza = await Cvaciador.find(req.params.id).lean();
    // .sort({ date: "desc" }).
  res.render("pvaciador/all-pvaciadors", {vpieza});
};

export const renderEditForm = async (req, res) => {
  const vpieza = await Cvaciador.findById(req.params.id).lean();
  if (vpieza.user != req.user.id) {
    req.flash("error_msg", "Not Authorized");
    return res.redirect("/vaciadors");
  }
  res.render("pvaciador/edit-pvaciador", { vpieza });
};

export const updateCvaciador = async (req, res) => {
  const {nombrePieza, precioPieza, tipo, categoria} = req.body;
  await Cvaciador.findByIdAndUpdate(req.params.id, { nombrePieza, precioPieza, tipo, categoria });
  req.flash("success_msg", "Empleado Updated Successfully");
  res.redirect("/pvaciadors");
};

export const deleteCvaciador = async (req, res) => {
  await Cvaciador.findByIdAndDelete(req.params.id);
  req.flash("success_msg", "Empleado Deleted Successfully");
  res.redirect("/pvaciadors");
};
