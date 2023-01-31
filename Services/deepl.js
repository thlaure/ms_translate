import * as deepl from 'deepl-node';
require('dotenv').config();

function getTranslator()
{
    const authKey = process.env.AUTHKEY;
    const translator = new deepl.Translator(authKey);
    return translator;
}

function translate(term, langFrom, langTo)
{
    const translator = getTranslator();
    
}