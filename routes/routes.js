import express from 'express';

import getRoot from './root.js';
import getDownload from './download.js';
import { getGrammar, postGrammar } from './grammar.js';
import { getData, postData } from './data.js';
import { getRecommender, postRecommender } from './recommender.js';
import { getHrInterviewer, postHrInterviewer } from './hrinterviewer.js';
import { getTechInterviewer, postTechInterviewer } from './techinterviewer.js';
import { getTranscriber, postTranscriber } from './transcriber.js';

const router = express.Router();

router.get('/', getRoot);

router.get('/download', getDownload);

router.get('/grammar', getGrammar);
router.post('/grammar', postGrammar);

router.get('/data', getData);
router.post('/data', postData);

router.get('/recommender', getRecommender);
router.post('/recommender', postRecommender);

router.get('/hrinterviewer', getHrInterviewer);
router.post('/hrinterviewer', postHrInterviewer);

router.get('/techinterviewer', getTechInterviewer);
router.post('/techinterviewer', postTechInterviewer);

router.get('/transcriber', getTranscriber);
router.post('/transcriber', postTranscriber);

export default router;
