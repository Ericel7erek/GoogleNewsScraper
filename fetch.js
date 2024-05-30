const axios = require('axios');
const cheerio = require('cheerio');
const fs = require('fs');
const url = 'https://news.google.com/topics/CAAqJggKIiBDQkFTRWdvSUwyMHZNRFZxYUdjU0FtVnpHZ0pGVXlnQVAB?hl=es&gl=ES&ceid=ES%3Aes';

const fetchNews = async () => {
  try {
    const { data } = await axios.get(url);
    const $ = cheerio.load(data);
    const newsItems = [];

    $('article').each((index, element) => {
      const title = $(element).text();
      const link = $(element).find('a').attr('href');
      $('figure').each((index, element) => {
        const image = $(element).find('img').attr('srcset');
        console.log(`https://news.google.com${image}`);
              newsItems.push({ title, link: `https://news.google.com${link}`, image: `https://news.google.com${image}` });
      })

    });
    const jsonData = JSON.stringify(newsItems, null, 2);
      fs.writeFile('output.json', jsonData, 'utf8', (err) => {
      if (err) {
      console.error('Error writing to file:', err);
      return;
      }
      console.log('Data written to file successfully');
      });
  } catch (error) {
    console.error('Error fetching news:', error);
    return [];
  }
};

fetchNews();
