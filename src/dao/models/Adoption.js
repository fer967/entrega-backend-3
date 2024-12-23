import mongoose from "mongoose";

const schema = new mongoose.Schema({
    owner:{
        type:mongoose.SchemaTypes.ObjectId,
        ref:'users'
    },
    pet:{
        type:mongoose.SchemaTypes.ObjectId,
        ref:'pets'
    }
})

const adoptionModel = mongoose.model("adoptions",schema);

export default adoptionModel;