import Word from '../modals/word.model.js';
import { ApiError } from '../utils/apiErrorHandler.js';
import { ApiResponse } from '../utils/apiResponse.js';
import { asyncHandler } from '../utils/asyncHandler.js';

const addWord = asyncHandler(async (req, res) => {
    const { word } = req.body;
    const newWord = new Word({ word });
    await newWord.save();
    return res.status(201).json(new ApiResponse(201, newWord, 'Word added successfully'));
});

const deleteWord = asyncHandler(async (req, res) => {
    const { id } = req.params;
    const word = await Word.findById(id);
    if (!word) {
        throw new ApiError(404, 'Word not found');
    }
    await Word.findByIdAndDelete(id);
    return res.status(200).json(new ApiResponse(200, null, 'Word deleted successfully'));
});

const addMeaning = asyncHandler(async (req, res) => {
    const { id } = req.params;
    const { meaning } = req.body;
    const word = await Word.findById(id);
    if (!word) {
        throw new ApiError(404, 'Word not found');
    }
    word.meanings.push({ meaning });
    await word.save();
    return res.status(200).json(new ApiResponse(200, word, 'Meaning added successfully'));
});

const updateMeaning = asyncHandler(async (req, res) => {
    const { id, meaningId } = req.params;
    const { meaning } = req.body;
    const word = await Word.findOne({ _id: id, 'meanings._id': meaningId });
    if (!word) {
        throw new ApiError(404, 'Word or meaning not found');
    }
    const meaningToUpdate = word.meanings.id(meaningId);
    if (meaningToUpdate) {
        meaningToUpdate.meaning = meaning;
        await word.save();
    }
    return res.status(200).json(new ApiResponse(200, word, 'Meaning updated successfully'));
});

const deleteMeaning = asyncHandler(async (req, res) => {
    const { id, meaningId } = req.params;
    const word = await Word.findOne({ _id: id, 'meanings._id': meaningId });
    if (!word) {
        throw new ApiError(404, 'Word or meaning not found');
    }
    word.meanings.id(meaningId).remove();
    await word.save();
    return res.status(200).json(new ApiResponse(200, word, 'Meaning deleted successfully'));
});

const updateWordName = asyncHandler(async (req, res) => {
    const { id } = req.params;
    const { wordName } = req.body;
    const word = await Word.findById(id);
    if (!word) {
        throw new ApiError(404, 'Word not found');
    }
    word.word = wordName;
    await word.save();
    return res.status(200).json(new ApiResponse(200, word, 'Word updated successfully'));
});

export { addWord, deleteWord, addMeaning, updateMeaning, deleteMeaning, updateWordName };
