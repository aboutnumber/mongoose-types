var mongoose = require('mongoose')

module.exports.loadType = function (mongoose) {
  var SchemaTypes = mongoose.SchemaTypes;

  function Email (path, options) {
    SchemaTypes.String.call(this, path, options);
    function validateEmail (val) {
      return /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i.test(val);
    }
    this.validate(validateEmail, 'email is invalid');
  }
  Email.prototype.__proto__ = SchemaTypes.String.prototype;
  Email.prototype.cast = function (val) {
    return val.toLowerCase();
  };
  SchemaTypes.Email = Email;
  mongoose.Types.Email = String;
};
