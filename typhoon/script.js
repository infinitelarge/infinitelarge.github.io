const axios = require('axios');
const cheerio = require('cheerio');

const url = 'http://typhoon.zjwater.gov.cn';

async function fetchTyphoonData() {
  try {
    const response = await axios.get(url);
    const html = response.data;
    const $ = cheerio.load(html);

    const typhoonList = $('#typhoonList li');

    const typhoonData = [];
    typhoonList.each((index, element) => {
      const name = $(element).find('.info_t').text();
      const date = $(element).find('.info_d').text();
      const level = $(element).find('.info_l').text();
      typhoonData.push({ name, date, level });
    });

    return typhoonData;
  } catch (error) {
    console.error('Error fetching data:', error);
    return [];
  }
}

async function displayTyphoonData() {
  const typhoonData = await fetchTyphoonData();
  const typhoonListElement = document.getElementById('typhoon-list');

  typhoonData.forEach((typhoon) => {
    const listItem = document.createElement('li');
    listItem.textContent = `${typhoon.name} - ${typhoon.date} - ${typhoon.level}`;
    typhoonListElement.appendChild(listItem);
  });
}

displayTyphoonData();
