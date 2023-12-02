import Pagosemanal from "../models/Pagosemanal";
import Empleado from "../models/Empleado";
import Cvaciador from "../models/Cvaciador";
import Crellenador from "../models/Crellenador";
import Ctrazador from "../models/Ctrazador";
import Crelle from "../models/Crelle";
import jsPDF from "jspdf";
import { PDFDocument } from "pdf-lib";
import fecha from "../helpers/fecha";
import split from "../helpers/split";
export const renderPagosemanalForm = async (req, res) => {
  const infoempleado = await Empleado.findById(req.params.id).lean();
  const infopiezasanimales = await Cvaciador.find({categoria: 'Animales'}).lean();
  const pago = await Pagosemanal.findById(req.params.id).lean();
  const infopiezasmacetas = await Cvaciador.find({categoria: 'Macetas'}).lean();
  const infopiezasdeco = await Cvaciador.find({categoria: 'ArtDeco'}).lean();
  const infopiezascocina = await Cvaciador.find({categoria: 'ServCocina'}).lean();
  const rellenadorinfo = await Crellenador.find().lean(); 
  res.render("pasing/new-pasing", { infoempleado, rellenadorinfo, infopiezasanimales, infopiezasmacetas, infopiezasdeco, infopiezascocina, pago });
};

export const renderPagosemanalpForm = async (req, res) => {
  const infoempleado = await Empleado.findById(req.params.id).lean();
  const infopiezasanimales = await Crellenador.find({categoria: 'Animales'}).lean();
  const infopiezasmacetas = await Crellenador.find({categoria: 'Macetas'}).lean();
  const infopiezasdeco = await Crellenador.find({categoria: 'ArtDeco'}).lean();
  const infopiezascocina = await Crellenador.find({categoria: 'ServCocina'}).lean();
  const rellenadorinfo = await Crellenador.find().lean(); 
  res.render("pasing/new-pasingp", { infoempleado, rellenadorinfo, infopiezasanimales, infopiezasmacetas, infopiezasdeco, infopiezascocina });
};
export const renderPagosemanaltForm = async (req, res) => {
  const infoempleado = await Empleado.findById(req.params.id).lean();
  const infopiezasanimales = await Ctrazador.find({categoria: 'Animales'}).lean();
  const infopiezasmacetas = await Ctrazador.find({categoria: 'Macetas'}).lean();
  const infopiezasdeco = await Ctrazador.find({categoria: 'ArtDeco'}).lean();
  const infopiezascocina = await Ctrazador.find({categoria: 'ServCocina'}).lean();
  const rellenadorinfo = await Crellenador.find().lean();
  const trazadorinfo = await Ctrazador.find().lean();
  res.render("pasing/new-pasingt", { infoempleado, rellenadorinfo, trazadorinfo, infopiezasanimales, infopiezasmacetas, infopiezasdeco, infopiezascocina });
};
export const renderPagosemanalrForm = async (req, res) => {
  const infoempleado = await Empleado.findById(req.params.id).lean();
  const infopiezasanimales = await Crelle.find({categoria: 'Animales'}).lean();
  const infopiezasmacetas = await Crelle.find({categoria: 'Macetas'}).lean();
  const infopiezasdeco = await Crelle.find({categoria: 'ArtDeco'}).lean();
  const infopiezascocina = await Crelle.find({categoria: 'ServCocina'}).lean();
  const rellenadorinfo = await Crellenador.find().lean();
  const trazadorinfo = await Crelle.find().lean();
  res.render("pasing/new-pasingr", { infoempleado, rellenadorinfo, trazadorinfo, infopiezasanimales, infopiezasmacetas, infopiezasdeco, infopiezascocina });
};

export const createNewPagosemanal = async (req, res) => {
  const { nombrePieza, precioPieza, cantPieza, asistencia, nombre, fecha, tipoEmpleado } = req.body;
  const errors = [];
  if (!nombrePieza) {
    errors.push({ text: "Porfavor escribe el nombre de la pieza" });
  }
  if (!precioPieza) {
    errors.push({ text: "Porfavor escribe el precio de la Pieza" });
  }
  if (!cantPieza) {
    errors.push({ text: "Piezas seleccionadas por Default a 1" });
  }
  if (!asistencia) {
    errors.push({ text: "Porfavor selecciona si asistio" });
  }
  if (!nombre) {
    errors.push({ text: "Porfavor selecciona el nombre del Empleado" });
  }
  if (!tipoEmpleado) {
    errors.push({ text: "Porfavor selecciona el tipo del Empleado" });
  }
  if (!fecha) {
    errors.push({ text: "Porfavor selecciona la fecha" });
  }
  if (errors.length > 0) {
    res.render("empleado/new-empleado", {
      errors,
      nombrePieza,
      precioPieza,
      cantPieza,
      asistencia,
      nombre,
      tipoEmpleado,
      fecha

    });
  } else {
    const newPagoSemanal = new Pagosemanal({ nombrePieza, precioPieza, cantPieza, asistencia, nombre, tipoEmpleado, fecha });
    newPagoSemanal.user = req.user.id;
    await newPagoSemanal.save();
    req.flash("success_msg", "Empleado añadido Successfully");
    res.redirect("/pasings");
  }
};

export const renderPagosSemanals = async (req, res) => {
  const pago2 = await Pagosemanal.find({
    tipoEmpleado: 'Medico'
  }).lean();
  const pago = await Pagosemanal.find({
    tipoEmpleado: 'Vaciador'
  }).lean();
  const pago3 = await Pagosemanal.find({
    tipoEmpleado: 'Trazador'
  }).lean();
  const pago4 = await Pagosemanal.find({
    tipoEmpleado: 'Pulidor'
  }).lean();
  res.render("pasing/all-pasing", { pago, pago2, pago3, pago4 });
};

export const renderEditForm = async (req, res) => {
  const infopiezap = await Crellenador.find().lean();
  const infopiezast = await Ctrazador.find().lean();
  const pago = await Pagosemanal.findById(req.params.id).lean();
  // const infopiezaprice = await Cvaciador.find({ nombrePieza: pago.nombrePieza }).select('nombrePieza precioPieza -_id').lean();
  const infopiezaprice = await Cvaciador.find({ nombrePieza: pago.nombrePieza }).select().lean();
  const infopiezas = await Pagosemanal.find({ _id: pago._id
  }).lean();
  const piezas = await Pagosemanal.find(req.params.nombrePieza).lean();
  const piezatipo = await Cvaciador.find(req.params.tipo).lean();
  const pvaciador = await Cvaciador.find({
    tipo: "Vaciador",
    $expr: { $eq: ["$tipo", "$asistencia.tipoEmpleado"] }
  }).lean();
    const ppulidor = await Cvaciador.find({tipo: "Vaciador"}).lean()
  const ptrazador = await Cvaciador.find({tipo: "Trazador"}).lean()
  const prellenador = await Crellenador.find({tipo: "Pulidor"}).lean();
  if (pago.user != req.user.id) {
    req.flash("error_msg", "Not Authorized");
    return res.redirect("/pasings");
  }
  res.render("pasing/edit-pasing", { pago, infopiezas, piezas, piezatipo, pvaciador, ptrazador, ppulidor, prellenador, infopiezap, infopiezast, infopiezaprice });
};


export const renderEditFormp = async (req, res) => {
  
  const infoempleado = await Empleado.findById(req.params.id).lean();
  const infopiezas = await Crellenador.find().lean();
  const infopiezap = await Crellenador.find().lean();
  const infopiezast = await Ctrazador.find().lean();
  const pago = await Pagosemanal.findById(req.params.id).lean();
const infopiezaprice = await Crellenador.find({ nombrePieza: pago.nombrePieza }).select('nombrePieza precioPieza -_id').lean();
  const piezas = await Pagosemanal.find(req.params.nombrePieza).lean();
  const piezatipo = await Cvaciador.find(req.params.tipo).lean();
  const pvaciador = await Cvaciador.find({
    tipo: "Vaciador",
    $expr: { $eq: ["$tipo", "$asistencia.tipoEmpleado"] }
  }).lean();
    const ppulidor = await Cvaciador.find({tipo: "Vaciador"}).lean()
  const ptrazador = await Cvaciador.find({tipo: "Trazador"}).lean()
  const prellenador = await Crellenador.find({tipo: "Pulidor"}).lean();
  if (pago.user != req.user.id) {
    req.flash("error_msg", "Not Authorized");
    return res.redirect("/pasings");
  }
  res.render("pasing/edit-pasing", { pago, infopiezas, infoempleado, piezas, piezatipo, pvaciador, ptrazador, ppulidor, prellenador, infopiezap, infopiezast, infopiezaprice });
};

export const renderEditFormt = async (req, res) => {
  
  const infoempleado = await Empleado.findById(req.params.id).lean();
  const infopiezas = await Ctrazador.find().lean();
  const infopiezap = await Crellenador.find().lean();
  const infopiezast = await Ctrazador.find().lean();
  const pago = await Pagosemanal.findById(req.params.id).lean();
  const infopiezaprice = await Ctrazador.find({ nombrePieza: pago.nombrePieza }).select('nombrePieza precioPieza -_id').lean();
  const piezas = await Pagosemanal.find(req.params.nombrePieza).lean();
  const piezatipo = await Cvaciador.find(req.params.tipo).lean();
  const pvaciador = await Cvaciador.find({
    tipo: "Vaciador",
    $expr: { $eq: ["$tipo", "$asistencia.tipoEmpleado"] }
  }).lean();
    const ppulidor = await Cvaciador.find({tipo: "Vaciador"}).lean()
  const ptrazador = await Cvaciador.find({tipo: "Trazador"}).lean()
  const prellenador = await Crellenador.find({tipo: "Pulidor"}).lean();
  if (pago.user != req.user.id) {
    req.flash("error_msg", "Not Authorized");
    return res.redirect("/pasings");
  }
  res.render("pasing/edit-pasing", { pago, infopiezas, infoempleado, piezas, piezatipo, pvaciador, ptrazador, ppulidor, prellenador, infopiezap, infopiezast, infopiezaprice });
};

export const renderEditFormr = async (req, res) => {
  
  const infoempleado = await Empleado.findById(req.params.id).lean();
  const infopiezas = await Ctrazador.find().lean();
  const infopiezap = await Crellenador.find().lean();
  const infopiezast = await Ctrazador.find().lean();
  const pago = await Pagosemanal.findById(req.params.id).lean();
  const infopiezaprice = await Crelle.find({ nombrePieza: pago.nombrePieza }).select('nombrePieza precioPieza -_id').lean();
  const piezas = await Pagosemanal.find(req.params.nombrePieza).lean();
  const piezatipo = await Cvaciador.find(req.params.tipo).lean();
  const pvaciador = await Cvaciador.find({
    tipo: "Vaciador",
    $expr: { $eq: ["$tipo", "$asistencia.tipoEmpleado"] }
  }).lean();
    const ppulidor = await Cvaciador.find({tipo: "Vaciador"}).lean()
  const ptrazador = await Cvaciador.find({tipo: "Trazador"}).lean()
  const prellenador = await Crellenador.find({tipo: "Pulidor"}).lean();
  if (pago.user != req.user.id) {
    req.flash("error_msg", "Not Authorized");
    return res.redirect("/pasings");
  }
  res.render("pasing/edit-pasing", { pago, infopiezas, infoempleado, piezas, piezatipo, pvaciador, ptrazador, ppulidor, prellenador, infopiezap, infopiezast, infopiezaprice });
};



export const updatePagoSemanal = async (req, res) => {
  const { nombrePieza, precioPieza, cantPieza, asistencia, nombre, fecha } = req.body;
  await Pagosemanal.findByIdAndUpdate(req.params.id, { nombrePieza, precioPieza, cantPieza, asistencia, nombre, fecha });
  req.flash("success_msg", "Empleado Updated Successfully");
  res.redirect("/pasings");
};

export const deletePagoSemanal = async (req, res) => {
  await Pagosemanal.findByIdAndDelete(req.params.id);
  req.flash("success_msg", "Empleado Deleted Successfully");
  res.redirect("/pasings");
};

export const generatePDF = async (req, res) => {
  const pago = await Pagosemanal.findById(req.params.id).lean();
  const infoempleado = await Empleado.find().lean();
  const infopiezas = await Cvaciador.find().lean();
  const fs = require('fs');
  const path = require('path');
  const { createCanvas, loadImage } = require('canvas');
  

  const doc = new jsPDF({
  });

  var fontSize = 18; // Tamaño de fuente deseado
  doc.setFontSize(fontSize);
  doc.text('Nombre del Empleado: ' + pago.nombre, 10, 30);
// Coordenadas iniciales
const x = 10; // Coordenada X inicial
let y = 40; // Coordenada Y

// Datos de ejemplo
const nombresPieza = pago.nombrePieza;
const precios = pago.precioPieza;
const cantidades = pago.cantPieza;
const anchoMaximo = 170; // Ancho máximo permitido antes de realizar un salto de línea

// Establecer el tamaño de fuente
var fontSize = 10;
doc.setFontSize(fontSize);

// Agregar encabezado
nombresPieza.forEach((nombre, indice) => {
  var precio = parseFloat(precios[indice]).toFixed(2);
  // const precio = precios[indice];
  const cantidad = cantidades[indice];
  const subtotal = precio * cantidad;
  const texto = `Pieza: ${nombre} | Cantidad: ${cantidad} | Precio: $${precio} | Subtotal: $${subtotal.toFixed(2)}`;

  const lineasTexto = doc.splitTextToSize(texto, anchoMaximo);
  lineasTexto.forEach((linea, subIndice) => {
    doc.text(linea, x, y + (indice * 10) + (subIndice * 10));
  });
});
  
  if (pago.precioPieza.length === pago.cantPieza.length) {
    let totalPagar = 0;
    for (let i = 0; i < pago.precioPieza.length; i++) {
      const precio = parseFloat(pago.precioPieza[i]);
      const cantidad = parseInt(pago.cantPieza[i]);
      if (!isNaN(precio) && !isNaN(cantidad)) {
        totalPagar += precio * cantidad;
      }
    }
    doc.text('Total a Pagar: $' + totalPagar.toFixed(2), x, y + nombresPieza.length * 10 + 10);
  } else {
    doc.text('Total a Pagar: N/A', x, y + nombresPieza.length * 10 + 10);
  }
  doc.text('Asistencia: ' + pago.asistencia, x, y + nombresPieza.length * 10 + 15);
  doc.text('Fecha: ' + pago.fecha.toLocaleDateString(), x + 60, y + nombresPieza.length * 10 + 15);

  const formattedDate = pago.fecha.toLocaleDateString().replace(/\//g, '-');


  const folderPath = 'C:\\Users\\Oscar\\Desktop\\Reportes'; // Ruta donde se guardarán los archivos
  if (!fs.existsSync(folderPath)) {
    fs.mkdirSync(folderPath);
  }

  const paymentFolderPath = path.join(folderPath, pago.nombre);
  if (!fs.existsSync(paymentFolderPath)) {
    fs.mkdirSync(paymentFolderPath);
  }

const image = await loadImage('src/public/img/01.jpg');
  
// Crear un lienzo de dibujo utilizando canvas
const canvas = createCanvas(image.width, image.height);
const ctx = canvas.getContext('2d');

// Dibujar la imagen en el lienzo
ctx.drawImage(image, 0, 0);

// Obtener la representación de datos de URL de la imagen
const dataURL = canvas.toDataURL('image/jpg');

// Agregar la imagen al documento PDF
doc.addImage(dataURL, 'PNG', 10, 0, 30, 20);
  const fileName = `reporte_${pago.nombre}_${formattedDate}.pdf`; // Nombre del archivo
  const filePath = path.join(paymentFolderPath, fileName);

  // Guardar el PDF con la ruta y nombre específicos
  doc.save(filePath);

  // Descargar el archivo PDF
  res.download(filePath);
};


export const mergePDFs = async (req, res) => {
  const pago = await Pagosemanal.findById(req.params.id).lean();
  const infoempleado = await Empleado.find().lean();
  const infopiezas = await Cvaciador.find().lean();
  const fs = require('fs');
  const path = require('path');
  const { createCanvas, loadImage } = require('canvas');
  try {
    const fechaHace7Dias = new Date();
    fechaHace7Dias.setDate(fechaHace7Dias.getDate() - 7);
    // Obtener los pagos semanales de los últimos 7 días con la ID específica
    const pagos = await Pagosemanal.find({fecha: { $gte: fechaHace7Dias } });

    // const pagos = await Pagosemanal.find({ fecha: { $gte: fechaHace7Dias }});

    const mergedPDF = await PDFDocument.create();

    for (const pago of pagos) {
      const doc = new jsPDF();
      const formattedDate = pago.fecha.toLocaleDateString().replace(/\//g, '-');

      doc.text('Nombre del Empleado: ' + pago.nombre, 10, 30);
      // Coordenadas iniciales
      const x = 10; // Coordenada X inicial
      let y = 40; // Coordenada Y

      // Datos de ejemplo
      const nombresPieza = pago.nombrePieza;
      const precios = pago.precioPieza;
      const cantidades = pago.cantPieza;
      const anchoMaximo = 170; // Ancho máximo permitido antes de realizar un salto de línea

      // Establecer el tamaño de fuente
      var fontSize = 10;
      doc.setFontSize(fontSize);

      // Agregar encabezado
      nombresPieza.forEach((nombre, indice) => {
        var precio = parseFloat(precios[indice]).toFixed(2);
        // const precio = precios[indice];
        const cantidad = cantidades[indice];
        const subtotal = precio * cantidad;
        const texto = `Nombre de Pieza: ${nombre} | Cantidad Realizada: ${cantidad} | Precio: $${precio} | Subtotal: $${subtotal.toFixed(2)}`;

        const lineasTexto = doc.splitTextToSize(texto, anchoMaximo);
        lineasTexto.forEach((linea, subIndice) => {
          doc.text(linea, x, y + (indice * 10) + (subIndice * 10));
        });
      });

      if (pago.precioPieza.length === pago.cantPieza.length) {
        let totalPagar = 0;
        for (let i = 0; i < pago.precioPieza.length; i++) {
          const precio = parseFloat(pago.precioPieza[i]);
          const cantidad = parseInt(pago.cantPieza[i]);
          if (!isNaN(precio) && !isNaN(cantidad)) {
            totalPagar += precio * cantidad;
          }
        }
        doc.text('Total a Pagar: $' + totalPagar.toFixed(2), x, y + nombresPieza.length * 10 + 10);
      } else {
        doc.text('Total a Pagar: N/A', x, y + nombresPieza.length * 10 + 10);
      }
      doc.text('Asistencia: ' + pago.asistencia, x, y + nombresPieza.length * 10 + 15);
      doc.text('Fecha: ' + pago.fecha.toLocaleDateString(), x + 60, y + nombresPieza.length * 10 + 15);

      const folderPath = 'C:\\Users\\Oscar\\Desktop\\Reportes'; // Ruta donde se guardarán los archivos
      if (!fs.existsSync(folderPath)) {
        fs.mkdirSync(folderPath);
      }

      const paymentFolderPath = path.join(folderPath, pago.nombre);
      if (!fs.existsSync(paymentFolderPath)) {
        fs.mkdirSync(paymentFolderPath);
      }

      const image = await loadImage('src/public/img/01.jpg');

      // Crear un lienzo de dibujo utilizando canvas
      const canvas = createCanvas(image.width, image.height);
      const ctx = canvas.getContext('2d');

      // Dibujar la imagen en el lienzo
      ctx.drawImage(image, 0, 0);

      // Obtener la representación de datos de URL de la imagen
      const dataURL = canvas.toDataURL('image/jpg');

      // Agregar la imagen al documento PDF
      doc.addImage(dataURL, 'PNG', 10, 0, 30, 20);
      const fileName = `reporte_${pago.nombre}_${formattedDate}.pdf`; // Nombre del archivo
      const filePath = path.join(paymentFolderPath, fileName);

      // Guardar el PDF con la ruta y nombre específicos
      doc.save(filePath);

      const pdfBytes = doc.output('arraybuffer');
      const pdfDoc = await PDFDocument.load(pdfBytes);

      const [existingPage] = await mergedPDF.copyPages(pdfDoc, [0]);
      mergedPDF.addPage(existingPage);
    }

    const folderPath = 'C:\\Users\\Oscar\\Desktop\\Reportes'; // Ruta donde se guardarán los archivos
    if (!fs.existsSync(folderPath)) {
      fs.mkdirSync(folderPath);
    }

    const fileName = 'reportes_ultimos_7_dias.pdf';
    const filePath = path.join(folderPath, fileName);

    const mergedPDFBytes = await mergedPDF.save();

    fs.writeFileSync(filePath, mergedPDFBytes);

    res.download(filePath);
  } catch (error) {
    console.error(error);
    res.status(500).send("Error al generar el PDF");
  }
};

export const fusionPDFs = async (req, res) => {
  const fs = require('fs');
  const { PDFDocument } = require('pdf-lib');
  const pago = await Pagosemanal.findById(req.params.id).lean();

  try {
    const folderPath = `C:/Users/Oscar/Desktop/Reportes`; // Ruta de la carpeta que contiene los archivos PDF
    const outputFilePath = `C:/Users/Oscar/Desktop/Reportes/Semanal/${pago.nombre}.pdf`; // Ruta del archivo PDF fusionado de salida

    const files = fs.readdirSync(folderPath);

    const mergedPdf = await PDFDocument.create();

    for (const file of files) {
      if (file.endsWith('.pdf')) {
        const filePath = `${folderPath}/${file}`;
        const pdfBytes = fs.readFileSync(filePath);

        const pdf = await PDFDocument.load(pdfBytes);
        const pages = pdf.getPages();

        for (let i = 0; i < pages.length; i++) {
          const page = pages[i];
          const copiedPage = await mergedPdf.copyPages(pdf, [i]);
          mergedPdf.addPage(copiedPage[0]);
        }
      }
    }
    const mergedPdfBytes = await mergedPdf.save();
    fs.writeFileSync(outputFilePath, mergedPdfBytes);

    console.log('PDFs fusionados correctamente.');
    res.download(outputFilePath)
    // Puedes enviar la respuesta si estás utilizando Express.js
  } catch (error) {
    console.error('Error al fusionar los PDFs:', error);
    // Puedes enviar la respuesta de error si estás utilizando Express.js
  }
};
