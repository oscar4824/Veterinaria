import Ctrazador from "../models/Ctrazador";
export const renderCtrazadorForm = (req, res) => {
  res.render("ptrazador/new-ptrazador");
};

export const createNewCtrazador = async (req, res) => {
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
    res.render("ptrazador/new-ptrazador", {
      errors,
      nombrePieza,
      precioPieza,
      tipo,
      categoria

    });
  } else {
    const newCtrazador = new Ctrazador({nombrePieza, precioPieza, tipo, categoria });
    newCtrazador.user = req.user.id;
    await newCtrazador.save();
    req.flash("success_msg", "Pieza añadido Successfully");
    res.redirect("/ptrazadors");
  }
};

export const renderCtrazadors = async (req, res) => {
  const tpieza = await Ctrazador.find(req.params.id).lean();
    // .sort({ date: "desc" }).
  res.render("ptrazador/all-ptrazadors", {tpieza});
};

export const renderEditForm = async (req, res) => {
  const tpieza = await Ctrazador.findById(req.params.id).lean();
  if (tpieza.user != req.user.id) {
    req.flash("error_msg", "Not Authorized");
    return res.redirect("/ptrazadors");
  }
  res.render("ptrazador/edit-ptrazador", { tpieza });
};

export const updateCtrazador = async (req, res) => {
  const {nombrePieza, precioPieza, tipo, categoria} = req.body;
  await Ctrazador.findByIdAndUpdate(req.params.id, { nombrePieza, precioPieza, tipo, categoria });
  req.flash("success_msg", "Pieza Updated Successfully");
  res.redirect("/ptrazadors");
};

export const deleteCtrazador = async (req, res) => {
  await Ctrazador.findByIdAndDelete(req.params.id);
  req.flash("success_msg", "Pieza Deleted Successfully");
  res.redirect("/ptrazadors");
};
