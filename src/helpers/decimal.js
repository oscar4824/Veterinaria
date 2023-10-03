const Handlebars = require('handlebars');

// Define el helper personalizado
Handlebars.registerHelper('formatDecimal', function(value) {
    return parseFloat(value).toFixed(2);
  });
  