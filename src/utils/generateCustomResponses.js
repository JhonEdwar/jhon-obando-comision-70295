export const generateCustomResponse =(_, res, next)=>{
    res.sendSuccess = payload => res.status(200).send({status:"success", message: "Request processed successfully.", payload})
    res.sendCreated = payload => res.status(201).send({ status: "success", message: "A resource was created as a result of the request.", payload })
    
    next()

}