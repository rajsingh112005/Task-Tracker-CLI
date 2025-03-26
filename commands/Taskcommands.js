const inquirer=require('inquirer');
const chalk=require('chalk');
const task=require('../db/model');

const addTask=async()=>{
    const {title,description}=await inquirer.prompt([
        {
            type:"input",
            name:"title",
            message:"Enter Task"
        },
        {
            type:"input",
            name:"description",
            message:"Enter Description"
        }
    ]);
    const Task=new task({title,description})
    await Task.save();
    console.log(chalk.green("Task added succesfully"))
    return
};

const updateTask=async ()=>{
    const {title}=await inquirer.prompt([
        {
            type:"input",
            name:"title",
            message:"Title of task to be updated"
        }
    ])
    const Task=task.findOne({title});
    if(Task){
        let {newDesc,newStatus}=await inquirer.prompt([
            {
                type:"input",
                name:"newDesc",
                message:"edit description"
            },
            {
                type:"list",
                name:"newStatus",
                message:"update Status if chnged",
                choices:['pending','complete']
            }
        ])
        if(newDesc===""){
            
            newDesc=Task.description;
        }
        
        await task.findOneAndUpdate({title},{
            description:newDesc,
            status:newStatus
        })
        console.log(chalk.green("task updated succesfully"))
        return
    }
    else{
        console.log(chalk.red("task not found"));
        return;
    }
}
const deleteTask=async ()=>{
    const {title}=await inquirer.prompt([
        {
            type:"input",
            name:"title",
            message:"enter Task title to be deleted"
        }
    ])
    const Task=task.findOne({title});
    if(Task){
        await task.findOneAndDelete({title})
        console.log(chalk.green("task deleted succesfullly"))
        return
    }
    else{
        console.log(chalk.red("task not found"))
        return
    }
}
const all=async ()=>{
    const Tasks=await task.find();
    if(Tasks.length===0){
        console.log(chalk.red("No task added Yet"))
        return
    }
    else {
        Tasks.forEach((task,index)=>{
            console.log(`${index+1}.${chalk.yellow(task.title)}--${task.status}`)
            return
        })
    }
}

module.exports={
    addTask,updateTask,deleteTask,all
}