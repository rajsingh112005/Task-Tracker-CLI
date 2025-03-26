const mongoose=require('mongoose');
const sch=new mongoose.Schema(
    {
        title: {
            type:String,
            required:true,
            unique:true,
        },
        description:{type:String},
        status:{
            type:String,
            enum:['pending','complete'],default:'pending'
        },
        
        Time:{type:Date ,default:Date.now}
    }
)

module.exports= mongoose.model('task',sch);