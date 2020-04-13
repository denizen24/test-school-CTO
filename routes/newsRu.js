const { Router } = require('express');
const fetch = require('node-fetch');
const convert = require('xml-js');

const router = Router();
let resultTitle;
let resultLink;
let newsLink = [];

fetch('https://news.google.com/rss?hl=ru&gl=RU&ceid=RU:ru')  
    .then((res) => {
        return res.text();
    })
    .then((data) => {
        resultJson = convert.xml2json(data, {compact: true, spaces: 4});
        let objNews = JSON.parse(resultJson);
        resultTitle = objNews['rss']['channel']['item'].map(item => item.title._text)
        resultLink = objNews['rss']['channel']['item'].map(item => item.link._text)
        for (let i = 0; i < resultTitle.length; i++) { 
            newsLink.push({ title: resultTitle[i], link: resultLink[i] })
        }
    })
    .catch((error) => {  
        console.log('Request failed', error)  
    });

router.get('/', (req, res) => {
    res.render('newsRu', {
        title: 'Новости России',
        isNewsRu: true,
        newsLink
    })
});

module.exports = router;