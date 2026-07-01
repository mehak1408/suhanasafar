const driverOnly = (req,res,next) => {
    if(req.user && (req.user.role === "driver" || req.user.role === "admin")){
        next();
    }
    else{
        res.status(403).json({
            message : "Access denied , Driver Only"
        })
    }
}

module.exports = driverOnly;