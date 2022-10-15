const Joi = require("@hapi/joi");

const registerValidation = (data) => {
  // Validation schema
  const schema = Joi.object({
    email: Joi.string().min(6).required().email(),
    username: Joi.string().min(6).required(),
    password: Joi.string().min(6).required(),
  });

  // Validate the request body. Will return a object.
  return schema.validate(data);
};

const loginValidation = (data) => {
  // Validate schema
  const schema = Joi.object({
    email: Joi.string().min(6).required().email(),
    password: Joi.string().min(6).required(),
  });

  // Validate the request body. Will return a object.
  return schema.validate(data);
};

const listValidation = (data) => {
  // Validate schema
  // Validate the request body. Will return a object.
  const schema = Joi.object({
    title: Joi.string().min(6).required(),
    description: Joi.string().min(6).required(),
    createdDate: Joi.string().min(6).required(),
    endDate: Joi.string().min(6).required(),
  });

  return schema.validate(data);
};

module.exports.registerValidation = registerValidation;
module.exports.loginValidation = loginValidation;
module.exports.listValidation = listValidation;
