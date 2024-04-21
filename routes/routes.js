import express from 'express';

import getRoot from './root.js';
import getDownload from './download.js';
import { getGrammar, postGrammar } from './grammar.js';
import { getData, postData } from './data.js';
import { getRecommender, postRecommender } from './recommender.js';

const router = express.Router();

router.get('/', getRoot);

router.get('/download', getDownload);

router.get('/grammar', getGrammar);
router.post('/grammar', postGrammar);

router.get('/data', getData);
router.post('/data',postData);

router.get('/recommender', getRecommender);
router.post('/recommender', postRecommender);

export default router;
