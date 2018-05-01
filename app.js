const apiKey = '893e2c2053864988bbaedb9f315bbc8a';
const newsArticles = document.querySelector('main');
const sourceSelector = document.querySelector('#sources');
const defaultSource = 'google-news-br';

window.addEventListener('load', async e => {
    updateNews();
    await updateNewsSources();
    sourceSelector.value = defaultSource;
});

async function updateNewsSources() {
    const resp = await fetch(`https://newsapi.org/v2/sources?apiKey=${apiKey}`);
    const json = await resp.json();
    sourceSelector.innerHTML =
        json.sources
            .map(source => `<option value="${source.id}">${source.name}</option>`)
            .join('\n');
}

async function updateNews(source = defaultSource) {
    newsArticles.innerHTML = '';
    const resp = await fetch(`https://newsapi.org/v2/top-headlines?sources=${source}&apiKey=${apiKey}`);
    const json = await resp.json();

    newsArticles.innerHTML = json.articles.map(createArticle).join('\n');
}

function createArticle(article) {
    return `
        <div class="article">
        <a href="${article.url}">
            <h2>${article.title}</h2>
            <img src="${article.urlToImage}" alt="${article.title}">
            <p>${article.description}</p>
        </a>
        </div>
    `;
}