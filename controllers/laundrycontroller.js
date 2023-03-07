const Laundry = require("../models/Laundry")
const CustomError = require("../errors");
const { StatusCodes } = require("http-status-codes");
const { checkPermissions, assetCheck } = require("../utils");

const getAllMachines = async(req,res) => {
    
    const machines = await Laundry.find({})
    res.status(StatusCodes.OK).json({machines});

};
const getSingleMachine = async(req,res) => {
    const {id:machineId} = req.params

    const machine = await Laundry.findById({_id:machineId});
    res.status(StatusCodes.OK).json({machine});

};
const getCurrentUser = async(req,res) => {
    const {id:machineId} = req.params
    const machine = await Laundry.findById({_id:machineId});
    if (machine.currentUser == null) {
        throw new CustomError.BadRequestError("No one using this machine")
    }
    res.status(StatusCodes.OK).json({currentuseratthismachine:machine.currentUser});
};

const createMachine = async(req,res) => {
    req.body.executive = req.user.userId;
    const machine = await Laundry.create(req.body)
    res.status(StatusCodes.CREATED).json(machine)

};
const updateMachine = async(req,res) => {
    const {id:machineId} = req.params
    const machine = await Laundry.findById({_id:machineId});

    assetCheck(machine,machineId,"machine");
    checkPermissions(req.user,machine.executive);

    await Laundry.findByIdAndUpdate({_id:machineId},req.body,{new:true,runValidators:true});
    res.status(StatusCodes.OK).json({ msg: "Succes! Machine updated" });
};
const deleteMachine = async(req,res) => {
    const {id:machineId} = req.params
    const machine = await Laundry.findById({_id:machineId});

    assetCheck(machine,machineId,"machine");
    checkPermissions(req.user,machine.executive);

    machine.remove();
    res.status(StatusCodes.OK).json({ msg: "Succes! Machine deleted" });
};
const useMachine = async(req,res) => {
    const {id:machineId} = req.params
    const machine = await Laundry.findById({_id:machineId});
    if (machine.brokenInfo == true) {
        throw new CustomError.BadRequestError("This machine is broken please use another machine")
    }
    else if (machine.emptyInfo == false) {
        throw new CustomError.BadRequestError("This machine is not empty please use another machine")
    }
    else{
        machine.currentUser = req.user.userId
        machine.emptyInfo = false
    }
    await machine.save();
    res.status(StatusCodes.OK).json({ msg: "Succes! Machine is using" });
};
const emptytomachine = async(req,res) => {
    const {id:machineId} = req.params
    const machine = await Laundry.findById({_id:machineId});
    checkPermissions(req.user,machine.currentUser)
    if (machine.emptyInfo == true) {
        throw new CustomError.BadRequestError("This machine is already empty ")
    }
    else{
        machine.emptyInfo = true
        machine.currentUser = null;
    }
    await machine.save();
    res.status(StatusCodes.OK).json({ msg: "Succes! Machine is empty now" });
};
const addmetothequeue = async(req,res) => {
    const {id:machineId} = req.params
    const machine = await Laundry.findById({_id:machineId});

    machine.queue.push(req.user.userId);
    await machine.save();
    res.status(StatusCodes.OK).json(machine.queue)
};


module.exports = {getAllMachines,getSingleMachine,getCurrentUser,createMachine,updateMachine,deleteMachine,useMachine,emptytomachine,addmetothequeue}


