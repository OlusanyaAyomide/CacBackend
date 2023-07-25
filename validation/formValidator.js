import Joi from 'joi';


export async function Basevalidator(req,res,next){
    const schema = Joi.object().keys({
        activationKey: Joi.string().required(),
        firstName: Joi.string().required(),
        surName: Joi.string().required(),
        middleName: Joi.string().required(),
        email: Joi.string().required(),
        phone: Joi.string().required(),
        houseAdress: Joi.string().required(),
        city: Joi.string().required(),
        zipcode: Joi.string().required(),
        dateOfBirth: Joi.date().required(),
        business:Joi.object().keys({
          companyName1:Joi.string().required(),
          companyName2:Joi.string().required(),
          companyName3:Joi.string(),
          businessType:Joi.string().required(),
          ngoType:Joi.string(),
          companyDescription:Joi.string().required(),
          info: Joi.array().items(Joi.object({
            userid: Joi.string().required(),
            shares: Joi.string().required(),
            firstName: Joi.string().required(),
            lastName: Joi.string().required(),
            email: Joi.string().required(),
            phone: Joi.string().required(),
            address: Joi.string().required(),
            city: Joi.string().required(),
            zipcode: Joi.string().required(),
            passport: Joi.string().required(),
            signature: Joi.string().required(),
          })).required()
        })
      });
      
    const validation = schema.validate(req.body);

    if (validation.error) {
        const error = validation.error.message ? validation.error.message : validation.error.details[0].message;

        return res.status(200).json({error})
    }
    return next()
      
}


export async function postCacValidation(req,res,next){
  const schema = Joi.object({
    firstName: Joi.string().required(),
    lastName: Joi.string().required(),
    description: Joi.string(),
    companyName: Joi.string(),
    activationKey: Joi.string(),
    files: Joi.array().items(Joi.string())
  });
  const validation = schema.validate(req.body);

  if (validation.error) {
      const error = validation.error.message ? validation.error.message : validation.error.details[0].message;

      return res.status(200).json({error})
  }
  return next()
}

export async function updateStatusValidation(req,res,next){
  const schema=Joi.object({
    status:Joi.string().required(),
  })  
  const validation = schema.validate(req.body);
  if (validation.error) {
    const error = validation.error.message ? validation.error.message : validation.error.details[0].message;

    return res.status(200).json({error})
  }
return next()
}
