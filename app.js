const apiKey = '893e2c2053864988bbaedb9f315bbc8a';
const newsArticles = document.querySelector('main');

window.addEventListener('load', e => {
    updateNews();
});

async function updateNews() {
    newsArticles.innerHTML = '';
    const resp = await fetch(`https://newsapi.org/v2/top-headlines?country=us&apiKey=${apiKey}`);
    const json = await resp.json();

    newsArticles.innerHTML = json.articles.map(createArticle).join('\n');
}

function createArticle(article) {
    return `
        <div class="article">
            <a href="${article.url}">
                <h2>${article.title}</h2>
                <img src="${article.urlToImage}">
                <p>${article.description}</p>
            </a>
        </div>
    `;
}


