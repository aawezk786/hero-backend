const createError = require('http-errors');
const Hero = require('../models/hero');
const mongoose = require('mongoose');

exports.postCourse = (req,res,next) =>{
    if (!req.file && !req.body) {
        const error = new Error("Body is Empty");
        error.statusCode = 422;
        return next(error);
    }
    const hero = new Hero({
        _id : new mongoose.Types.ObjectId(),
        name : req.body.name,
        rating : req.body.rating
    })

    hero.save()
    .then(data =>{
        res.status(201).json({
            statusCode : 201,
            message : "Created Successfully",
            data : data
        });
    }).catch(err=>{
        next(err)
    });
}

exports.getcourseById = async (req,res,next) =>{
    try {
        const course = await Hero.findById(req.params.id);
        res.status(200).json({
            statusCode: 200,
            message: "success",
            data: course
        });
    } catch (err) {
        next(err);
    }
}

exports.getAllcourse = async (req,res,next) =>{
    try {
        const course = await Hero.find({});
        res.status(200).json(course);
    } catch (err) {
        next(err);
    }
}

exports.getRatingcourse = async (req,res,next) =>{
    try {
        const course = await Hero.find({rating:10}).limit(4);
        res.status(200).json(course);
    } catch (err) {
        next(err);
    }
}

exports.updateCourse = (req,res,next) =>{
    const id = req.params.id;

    Hero.updateOne({_id: id},{
        name : req.body.name,
        rating : req.body.rating
    }).then(result =>{
        res.status(200).json({
            statusCode: 200,
            message: "success",
            data: result
        });
    }).catch(err=>{
        next(err)
    });
}


exports.delById = async (req,res,next)=>{
    try {
        const course = await Hero.findById(req.params.id);
        const deletedCourse = await Hero.findByIdAndRemove(req.params.id);

        if(!course)
        throw next(createError.NotAcceptable('Check ID'));

        res.status(200).json({
            statusCode : 200,
            message: "Course Deleted Successfully",
            data: deletedCourse
        });
    } catch (err) {
        next(err);
    }
}
