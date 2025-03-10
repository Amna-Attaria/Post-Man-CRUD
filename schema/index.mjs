import joi from 'joi'
const schema = joi.object({
    name:joi.string()
    .alphanum()
    .min(3)
    .max(30)
    .required(),
    pass: joi.string().min(5).required(),
    email: joi.string()
        .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } })

})
export default schema;