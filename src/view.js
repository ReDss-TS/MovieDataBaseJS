export default {
  render(templateName, model) {
    templateName = templateName + 'Template';
    const Handlebars = require("handlebars");
    const templateElement = document.getElementById(templateName);
    const templateSource = templateElement.innerHTML;
    const renderFn = Handlebars.compile(templateSource);

    return renderFn(model);
  }
};
