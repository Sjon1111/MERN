import mongoose from 'mongoose';
import { Schema, model } from "mongoose";
const todoSchema = new Schema({

  todouser: {
    type: String
  },
  title: {
    type: String,
    maxlength: 20,
    required: true
  },
  description: {
    type: String,
    minlength: 20,
    required: true
  },
  createdDate: {
    type: Date,
    default: Date.now
  },
  todochecked: {
    type: String
  }
})
const todo = model("todo", todoSchema);
export default todo;