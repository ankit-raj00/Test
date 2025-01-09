import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { Question } from "../models/question.model.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import mongoose from "mongoose";

// CREATE: Add new questions
const addQuestion = asyncHandler(async (req, res, next) => {
  const { questions } = req.body;

  if (!questions || questions.length === 0) {
    throw new ApiError(400, "Provide valid question input");
  }

  try {
    const addedQuestions = await Question.create(questions);
    res.status(200).json(new ApiResponse(200, addedQuestions, "Questions added successfully"));
  } catch (error) {
    throw new ApiError(500, "Error occurred while adding questions");
  }
});

// READ: Get all questions or a single question by ID
const getQuestions = asyncHandler(async (req, res, next) => {
  const { id } = req.params;

  if (id) {
    // Get a specific question by ID
    if (!mongoose.Types.ObjectId.isValid(id)) {
      throw new ApiError(400, "Invalid question ID");
    }

    const question = await Question.findById(id);
    if (!question) {
      throw new ApiError(404, "Question not found");
    }

    res.status(200).json(new ApiResponse(200, question, "Question fetched successfully"));
  } else {
    // Get all questions
    const questions = await Question.find();
    res.status(200).json(new ApiResponse(200, questions, "Questions fetched successfully"));
  }
});

// UPDATE: Update a question by ID
// UPDATE: Update a question by ID
const updateQuestion = asyncHandler(async (req, res, next) => {
    const {questionText, option, questionType } = req.body;
    const {id} = req.params
  
    // Validate ID from the body
    if (!id || !mongoose.Types.ObjectId.isValid(id)) {
      throw new ApiError(400, "Invalid or missing question ID in the request body");
    }
  
    const updateData = {};
    if (questionText) updateData.questionText = questionText;
    if (option) updateData.option = option;
    if (questionType) updateData.questionType = questionType;
  
    if (Object.keys(updateData).length === 0) {
      throw new ApiError(400, "No valid fields provided for update");
    }
  
    const updatedQuestion = await Question.findByIdAndUpdate(id, updateData, {
      new: true,
      runValidators: true,
    });
  
    if (!updatedQuestion) {
      throw new ApiError(404, "Question not found");
    }
  
    res.status(200).json(new ApiResponse(200, updatedQuestion, "Question updated successfully"));
  });
  

// DELETE: Delete a question by ID
const deleteQuestion = asyncHandler(async (req, res, next) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    throw new ApiError(400, "Invalid question ID");
  }

  const deletedQuestion = await Question.findByIdAndDelete(id);
  if (!deletedQuestion) {
    throw new ApiError(404, "Question not found");
  }

  res.status(200).json(new ApiResponse(200, deletedQuestion, "Question deleted successfully"));
});

export { addQuestion, getQuestions, updateQuestion, deleteQuestion };
