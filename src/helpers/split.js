const Handlebars = require('handlebars');

// Helper split para dividir una cadena en un array
// Helper split para dividir una cadena en un array
Handlebars.registerHelper('split', function (string, delimiter) {
  if (typeof string === 'string') {
    return string.split(delimiter);
  } else {
    return string;
  }
});
