import Joi from 'joi';
import {formSchema, postCacSchema, userSchema} from '../utils/validationSchemas.js';


export async function baseValidator(req,res,next){
  // Moved the form schema to a static file: Better for performance
  const validation = formSchema.validate(req.body);

  if (validation.error) {
    const error = validation.error.message ? validation.error.message : validation.error.details[0].message;
    return res.status(200).json({error})
  }
  return next()      
}


export async function postCacValidation(req,res,next){
  // Moved the postCac schema to a static file: Better for performance
  const validation = postCacSchema.validate(req.body);

  if (validation.error) {
    const error = validation.error.message ? validation.error.message : validation.error.details[0].message;
    return res.status(200).json({error})
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
    return res.status(200).json({error})
  }
  return next()
}


export async function validateNewUser(req,res,next){
  // Moved the form userSchema to a static file: Better for performance
  const validation = userSchema.validate(req.body);
  if (validation.error) {
    const error = validation.error.message ? validation.error.message : validation.error.details[0].message;
    return res.status(200).json({error})
  }
  return next()
}
