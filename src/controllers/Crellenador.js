import Crellenador from "../models/Crellenador";
export const renderCrellenadorForm = (req, res) => {
  res.render("prellenador/new-prellenador");
};

export const createNewCrellenador = async (req, res) => {
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
    errors.push({ text: "Porfavor selecciona la categoria de la Pieza" });
  }

  if (errors.length > 0) {
    res.render("prellenador/new-prellenador", {
      errors,
      nombrePieza,
      precioPieza,
      tipo,
      categoria

    });
  } else {
    const newCrellenador = new Crellenador({nombrePieza, precioPieza, tipo, categoria });
    newCrellenador.user = req.user.id;
    await newCrellenador.save();
    req.flash("success_msg", "Pieza Añadida Correctamente");
    res.redirect("/prellenadors");
  }
};

export const renderCrellenadors = async (req, res) => {
  const rpieza = await Crellenador.find(req.params.id).lean();
    // .sort({ date: "desc" }).
  res.render("prellenador/all-prellenadors", {rpieza});
};

export const renderEditForm = async (req, res) => {
  const rpieza = await Crellenador.findById(req.params.id).lean();
  if (rpieza.user != req.user.id) {
    req.flash("error_msg", "Not Authorized");
    return res.redirect("/rellenadors");
  }
  res.render("prellenador/edit-prellenador", { rpieza });
};

export const updateCrellenador = async (req, res) => {
  const {nombrePieza, precioPieza, tipo, categoria} = req.body;
  await Crellenador.findByIdAndUpdate(req.params.id, { nombrePieza, precioPieza, tipo, categoria });
  req.flash("success_msg", "Pieza Updated Successfully");
  res.redirect("/prellenadors");
};

export const deleteCrellenador = async (req, res) => {
  await Crellenador.findByIdAndDelete(req.params.id);
  req.flash("success_msg", "Pieza Deleted Successfully");
  res.redirect("/prellenadors");
};
