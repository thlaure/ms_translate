const express = require('express');
const server = express();
const port = 3000;
const translate = express.Router();

const deepl = require('deepl');
require('dotenv').config();

server.use('/translate', translate);
server.disable('x-powered-by');

/**
 * Call to Deepl service to translate a given text in a given language.
 */
translate.get('/deepl/:source_lang/:target_lang/:text', (req, res) => {
    // Request params
    const sourceLang = req.params.source_lang.toLowerCase();
    const targetLang = req.params.target_lang.toLowerCase();
    const textToTranslate = req.params.text;

    if (textToTranslate.trim().length === 0) {
        res.status(500).json({ error: '[Error] The term must have at least one character' });
    }

    if (!isNaN(textToTranslate)) {
        res.status(200).json({ result: textToTranslate });
    }

    // This array needs to be updated when the list of available languages in Bobcat changes.
    const langs = ['fr', 'en', 'it', 'es', 'pt', 'de', 'fi', 'da', 'nl', 'no', 'sv', 'ru'];
    if (!langs.includes(sourceLang) || !langs.includes(targetLang)) {
        res.status(500).json({ error: '[Error] Use an available language among ' + langs.join(', ') });
    }

    const authKey = process.env.AUTHKEY;
    if (!authKey) {
        res.status(500).json({ error: '[ERROR] Auth key missing' });
    }

    console.debug(`[DEBUG] Sended data:\n - Text: ${textToTranslate}\n - Source Lang: ${sourceLang}\n - Target lang: ${targetLang}\n - AuthKey: ${authKey}`);

    // Call Deepl API service
    deepl({
        free_api: true,
        text: textToTranslate,
        source_lang: sourceLang,
        target_lang: targetLang,
        auth_key: authKey
    })
    .then(result => {
        res.status(200).json({ result: result.data });
    })
    .catch(error => {
        res.status(500).json({ error : `[Error] A problem occurred during the translation: ${error}` });
    })
});

server.listen(port, (error) => {
    if (error) console.error(`[Error] On server listening on port ${port}: ${error}`);
    console.log(`Server listening on port ${port}`);
});