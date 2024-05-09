 const catchAsyncErrors = (controllerFunc) => {
     return (req, res, next) => {
       Promise.resolve(controllerFunc(req, res, next)).catch(next);
     };
   };

   module.exports=catchAsyncErrors;