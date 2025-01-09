import mongoose, { Schema } from "mongoose";


const questionSchema = new Schema({
  subject: {
    type: String,
    required: true,
  },
  questionText: {
    type: String,
    required: true,
  },
  option: {
    type: [String], // Array of options for MCQs/SCQs
    required: true,
  },
  correctAnswer: {
    type: String,
    
  },
  questionType: {
    type: String,
    enum: ["SCQ", "MCQ", "INT"], // Valid types
    required: true,
  },
  topic : {
    type : String,
    
  },
  subTopic : {
    type : String
  }
});

// Create Models
export const Question = mongoose.model("Question", questionSchema);


