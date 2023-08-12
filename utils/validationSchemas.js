import Joi from 'joi';

const formSchema = Joi.object().keys({
	activationKey: Joi.string().required(),
	firstName: Joi.string().required(),
	surName: Joi.string().required(),
	middleName: Joi.string().optional().allow(""),
	email: Joi.string().required(),
	phone: Joi.string().required(),
	city: Joi.string().required(),
	state:Joi.string().required(),
	streetName:Joi.string().required(),
	houseNumber:Joi.string().required(),
	dateOfBirth: Joi.date().required(),
	passport: Joi.string().required(),
	signature: Joi.string().required(),
	userid: Joi.string().required(),
	shares:Joi.string().optional().allow(""),
	business:Joi.object().keys({
		companyName1:Joi.string().required(),
		companyName2:Joi.string().required(),
		companyName3:Joi.string().optional().allow(""),
		businessType:Joi.string().required(),
		companyNumber: Joi.string().required(),
		companyStreet: Joi.string().required(),
		companyCity  : Joi.string().required(),
		companyState : Joi.string().required(),
		ngoType:Joi.string().optional().allow(""),
		value:Joi.string().optional().allow(""),
		share:Joi.string().optional().allow(""),
		companyDescription:Joi.string().required(),
		info: Joi.array().items(Joi.object({
			userid: Joi.string().required(),
			shares: Joi.string().allow(""),
			firstName: Joi.string().required(),
			lastName: Joi.string().required(),
			email: Joi.string().required(),
			phone: Joi.string().required(),
			city: Joi.string().required(),
			state:Joi.string().required(),
			officeNumber:Joi.string().required(),
			officeStreet:Joi.string().required(),
			passport: Joi.string().required(),
			signature: Joi.string().required(),
			dateOfBirth: Joi.date().required(),
		})).required()
	})
});


const userSchema = Joi.object({
	isAdmin:Joi.boolean().required(),
	email:Joi.string().required(),
	name:Joi.string().required(),
	password:Joi.string().required()
})


const postCacSchema = Joi.object({
	firstName: Joi.string().required(),
	lastName: Joi.string().required(),
	description: Joi.string(),
	companyName: Joi.string(),
	activationKey: Joi.string(),
	files: Joi.array().items(Joi.string())
});

const taxSchema =Joi.object({
	firstName:Joi.string().required(),
    lastName:Joi.string().required(),
    phone:Joi.string().required(),
    email:Joi.string().required(),
    companyName:Joi.string().required(),
    BNNumber:Joi.string().required(),
    regDate:Joi.date().required(),
    address:Joi.string().required(),
	activationKey:Joi.string().required(),
}) 

export {formSchema, userSchema, postCacSchema,taxSchema};