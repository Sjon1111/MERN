import mongoose from 'mongoose';
import { Schema, model } from "mongoose";
const userSchema = new Schema({
  Fullname: {
    type: String,
    // minlength: 8,
    // maxlength: 30,
    required: true,
  },
  Email: {
    type: String,
    minlength: 10,
    maxlength: 50,
    required: true,
    lowercase: true,
    unique: true,
    validate: {
      validator: function (value) {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
      },
      message: "Invalid Email"
    },
  },
  Password: {
    type: String,
    minlength: 8,
    maxlength: 150,
    required: true,
  },
  contact: {
    type: String,
    minlength: 10,
    maxlength: 10,

    required: true
  }
})
const user = model("user", userSchema);
export default user;