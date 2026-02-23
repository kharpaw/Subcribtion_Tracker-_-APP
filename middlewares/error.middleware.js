
// create a subcribtion --> middleware --> error middleware(check for renewal date) --> midleware(check for error ) -->
const errorMiddleWare = (err, req, res, next) => {
    try {
        let error = { ...err }
        
        error.message = err.message;

        // Mongoose bas ObjectId
        if (err.name === 'castError') {
            const message = 'Resource not found'

            error = new Error(message);
            error.statuscode = 404;
        }

        // Mongoose dupliate key
        if (err.code === 11000) {
            const message = 'Duplicate field value entered' 
            error = new Error(message);
            error.status = 400;
        }

        //Mongooose vlidation error
        if (err.name === 'validationError') {
            const message = Object.values(err.erros).map(val => val.message);
            error = new Error(message.join(', '));
            error.statusCode = 400
        }

        res.status(error.statuscode || 500).json({success:false, error: error})

    } catch (error) {
        next(error)
    }
}
 

export default errorMiddleWare;