const Bus = require("../models/Bus")
const { getIO } = require("../socket");


exports.createBus = async (req,res) => {
    try{
        const bus = await Bus.create(req.body)
        res.status(201).json(bus)
    }
    catch(error){
        res.status(500).json({message : "Error creating bus",error:error.message})
    }
}


exports.getAllBuses = async (req,res) => {
    try{
        const buses = await Bus.find();
        res.json(buses);
    }
    catch(error){
        res.status(500).json({
            message:"Error fetching buses",
            error : error.message
        })
    }
}

exports.getBusById = async (req,res) => {
    try{
        const bus = await Bus.findById(req.params.id)

        if(!bus){
            return res.status(404).json({
                message : "Bus not found"
            })
        }
        res.json(bus);
    }catch(error){
        res.status(500).json({
            message: "Error fetching Bus"
        })
    }
}

exports.deleteBus = async(req,res) => {
    try{
        await Bus.findByIdAndDelete(req.params.id)
        res.json({message : "Bus deleted"})
    }catch(error){
        res.status(500).json({message:"Error deleting bus"})
    }
}


exports.updateBusLocation = async (req,res) => {
    try{
        const {latitude , longitude} = {
            latitude : req.body.latitude,
            longitude : req.body.longitude
        }
        const bus = await Bus.findById(req.params.id)

        if(!bus){
            return res.status(404).json({
                message : "Bus not found"
            })
        }

        bus.currentLocation = {
            latitude : req.body.latitude,
            longitude : req.body.longitude
        }

        await bus.save()
        
        getIO().emit("busLocationUpdate", bus);
        res.json({
            message : "Bus location updated",
            bus
        })
    }catch(error){
        res.status(500).json({
            message : "Error updating location",
            error : error.message
        })
    }
}

