import { Router } from "express";
import {
    addWord,
    deleteWord,
    addMeaning,
    updateMeaning,
    deleteMeaning,
    updateWordName
} from '../controllers/words.controller.js';

const router = Router();

router.post('/words', addWord);

router.delete('/words/:id', deleteWord);

router.post('/words/:id/meanings', addMeaning);

router.put('/words/:id/meanings/:meaningId', updateMeaning);

router.delete('/words/:id/meanings/:meaningId', deleteMeaning);

router.put('/words/:id', updateWordName);

export default router;
