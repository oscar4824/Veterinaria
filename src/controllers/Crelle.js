import Crelle from "../models/Crelle";
export const renderCrelleForm = (req, res) => {
  res.render("prelle/new-prelle");
};

export const createNewCrelle = async (req, res) => {
  const { nombrePieza, precioPieza, tipo, categoria } = req.body;
  const errors = [];
  if (!nombrePieza) {
    errors.push({ text: "Escribe el Nombre del Tratamiento, Servicio o Articulo" });
  }
  if (!precioPieza) {
    errors.push({ text: "Escribe el Costo" });
  }
  if (!tipo) {
    errors.push({ text: "Selecciona el Tipo (Tratamiento, Servicio o Articulo)" });
  }
  if (!categoria) {
    errors.push({ text: "Selecciona la Categoria" });
  }

  if (errors.length > 0) {
    res.render("prelle/new-prelle", {
      errors,
      nombrePieza,
      precioPieza,
      tipo,
      categoria

    });
  } else {
    const newCrelle = new Crelle({nombrePieza, precioPieza, tipo, categoria });
    newCrelle.user = req.user.id;
    await newCrelle.save();
    req.flash("success_msg", "Pieza Añadida Correctamente");
    res.redirect("/prelles");
  }
};

export const renderCrelle = async (req, res) => {
  const rpieza = await Crelle.find(req.params.id).lean();
    // .sort({ date: "desc" }).
  res.render("prelle/all-prelles", {rpieza});
};

export const renderEditForm = async (req, res) => {
  const rpieza = await Crellenador.findById(req.params.id).lean();
  if (rpieza.user != req.user.id) {
    req.flash("error_msg", "Not Authorized");
    return res.redirect("/rellenadors");
  }
  res.render("prelle/edit-prelle", { rpieza });
};

export const updateCrelle = async (req, res) => {
  const {nombrePieza, precioPieza, tipo, categoria} = req.body;
  await Crelle.findByIdAndUpdate(req.params.id, { nombrePieza, precioPieza, tipo, categoria });
  req.flash("success_msg", "Pieza Updated Successfully");
  res.redirect("/prellenadors");
};

export const deleteCrelle = async (req, res) => {
  await Crelle.findByIdAndDelete(req.params.id);
  req.flash("success_msg", "Pieza Deleted Successfully");
  res.redirect("/prelles");
};
