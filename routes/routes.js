import express from 'express';

import { signup, login, authorize } from '../controllers/auth.js';

import getRoot from './root.js';
import getDownload from './download.js';
import { getGrammar, postGrammar } from './grammar.js';
import { getData, postData } from './data.js';
import { getRecommender, postRecommender } from './recommender.js';
import { getHrInterviewer, postHrInterviewer } from './hrinterviewer.js';
import { getTechInterviewer, postTechInterviewer } from './techinterviewer.js';
import { getTranscriber, postTranscriber } from './transcriber.js';

const router = express.Router();

router.post('/login', login);

router.post('/signup', signup);

router.get('/', getRoot);

router.get('/download', getDownload);

router.get('/grammar', getGrammar);
router.post('/grammar', authorize, postGrammar);

router.get('/data', getData);
router.post('/data', postData);

router.get('/recommender', getRecommender);
router.post('/recommender', authorize, postRecommender);

router.get('/hrinterviewer', getHrInterviewer);
router.post('/hrinterviewer', authorize, postHrInterviewer);

router.get('/techinterviewer', getTechInterviewer);
router.post('/techinterviewer', authorize, postTechInterviewer);

router.get('/transcriber', getTranscriber);
router.post('/transcriber', postTranscriber);

export default router;
