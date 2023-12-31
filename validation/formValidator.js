import Joi from 'joi';
import {formSchema, postCacSchema, taxSchema, userSchema} from '../utils/validationSchemas.js';


export async function baseValidator(req,res,next){
  // Moved the form schema to a static file: Better for performance
  console.log("Validating...")
  const validation = formSchema.validate(req.body);

  if (validation.error) {
    console.log(validation.error);
    const error = validation.error.message ? validation.error.message : validation.error.details[0].message;
    return res.status(400).json({error})
  }
  return next()      
}


export async function postCacValidation(req,res,next){
  // Moved the postCac schema to a static file: Better for performance
  const validation = postCacSchema.validate(req.body);

  if (validation.error) {
    const error = validation.error.message ? validation.error.message : validation.error.details[0].message;
    return res.status(400).json({error})
  }
  return next()
}

export async function updateStatusValidation(req,res,next){

  const schema = Joi.object({
    status:Joi.string().required(),
  })
  
  const validation = schema.validate(req.body);
  if (validation.error) {
    const error = validation.error.message ? validation.error.message : validation.error.details[0].message;
    return res.status(400).json({error})
  }
  return next()
}


export async function validateNewUser(req,res,next){
  // Moved the form userSchema to a static file: Better for performance
  const validation = userSchema.validate(req.body);
  if (validation.error) {
    const error = validation.error.message ? validation.error.message : validation.error.details[0].message;
    return res.status(400).json({error})
  }
  return next()
}

export async function taxvalidator(req,res,next){
  const validation = taxSchema.validate(req.body)
  if (validation.error) {
    
    const error = validation.error.message ? validation.error.message : validation.error.details[0].message;
    return res.status(400).json({error})
  }
  return next()
}
