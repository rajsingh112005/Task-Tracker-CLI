#!/usr/bin/env node
const {program}=require("commander");
const  connectdb=require("./db/connection");
const {addTask,updateTask,deleteTask,all}=require("./commands/Taskcommands");

connectdb();

program.version("1.0.0").description("Task Tracker CLI")

program
  .command("add")
  .description("Add a new Task")
  .action(addTask);

program
  .command("delete")
  .description("delete given task")
  .action(deleteTask);

program
  .command("update")
  .description("update task")
  .action(updateTask);

program
  .command("list")
  .description("show all Tasks")
  .action(all);

program.parse(process.argv);