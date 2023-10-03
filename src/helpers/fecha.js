const Handlebars = require('handlebars');

Handlebars.registerHelper('dateFormat', function(date, options) {
  const { hash } = options;
  const formattedDate = new Date(date).toLocaleDateString(undefined, hash);
  return formattedDate;
});
