import fs from 'fs';
import foodModel from '../models/foodModel.js';

//add food
const addFood =async(req,res)=>{
    let image_fileName = `${req.file.filename}`;
    const food = new foodModel({
        name:req.body.name,
        description:req.body.description,
        price:req.body.price,
        image:image_fileName,
        category:req.body.category,
    })
    try {
        await food.save();
        res.json({success:true,message:"Food Added"})
    } catch (error) {
        console.log(`${error.message}`)
        res.json({success:false,message:"Error"})
    }
}

//food list
const listFood = async(req,res)=>{
    try {
        const foods = await foodModel.find({});
        res.json({success:true,foods})
    } catch (error) {
        console.log(`${error.message}`)
        res.json({success:false,message:"Error"})
    }
}

//remove food
const removeFood = async(req,res)=>{
    const foodId = req.body.id;
    try {
        const food = await foodModel.findById(foodId);
        if (food) {
            // Remove the image file from the server
            fs.unlink(`uploads/${food.image}`,()=>{});
            await foodModel.findByIdAndDelete(foodId);
            res.json({success:true,message:"Food Removed"});
        } else {
            res.json({success:false,message:"Food not found"});
        }
    } catch (error) {
        console.log(`${error.message}`);
        res.json({success:false,message:"Error"});
    }
}
export {addFood,listFood,removeFood}

