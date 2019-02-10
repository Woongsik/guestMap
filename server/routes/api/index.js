const express = require('express');
const router = express.Router();
const userMessageModel = require('../../models/userMessageModel');



router.get("/getMessages", function(req,res){
    console.log("getMessages request from Server")
    return res.status(200).json({"message":"Connection successful"})
    // userMessageModel.find().then( response => {
    //     if(response.ok){
    //         response.json().then( resData =>{
    //             return res.status(200).json(resData);
    //         }).catch( error =>{
    //             res.status(409).json({"message":"response is not ok"})
    //         })
    //     } else{
    //         return res.status(409).json({"message":"response is not ok"})
    //     }
    // }).catch( err => {
    //     return res.status(409).json({"message":"server error with "+ err})
    // }).sort({"date":1})
})

router.post("/saveMessage", function(req,res){
    console.log("saveMessage request from Server")
    const item = new userMessageModel({
        name: req.body.name,
        message: req.body.message, 
        lng: req.body.lng,
        lat: req.body.lat,
        date: new Date()
    });    

    item.save( function (err){
        if(err){
            return res.status(409).json({"message" : "item not saved"})
        }
        return res.status(200).json({"message":"Connection successful"})
    })
})
    

module.exports = router;