let allNews = [];

async function loadNews() {

try {

const response = await fetch("feed.json");

const data = await response.json();

allNews = data;

renderNews(data);

document.getElementById("articleCount").textContent =
data.length;

}
catch(error){

document.getElementById("newsContainer").innerHTML = `
<div class="loading">
Failed to load news.
</div>
`;

console.error(error);

}

}

function renderNews(news){

const container =
document.getElementById("newsContainer");

if(news.length === 0){

container.innerHTML = `
<div class="loading">
No articles found.
</div>
`;

return;

}

container.innerHTML = "";

news.forEach(article => {

const card = document.createElement("div");

card.className = "news-card";

card.innerHTML = `

<h2>${article.title}</h2>

<p class="source">
${article.source}
</p>

<p>
${article.description}
</p>

<p>
📅 ${article.date}
</p>

<a
href="${article.link}"
target="_blank"
rel="noopener noreferrer"
>
Read Original Article
</a>

`;

container.appendChild(card);

});

}

function searchNews(){

const search =
document
.getElementById("searchInput")
.value
.toLowerCase()
.trim();

if(search === ""){

renderNews(allNews);

return;

}

const filtered =
allNews.filter(article =>

article.title
.toLowerCase()
.includes(search)

||

article.description
.toLowerCase()
.includes(search)

||

article.source
.toLowerCase()
.includes(search)

);

renderNews(filtered);

}

document
.getElementById("searchInput")
.addEventListener("keyup", e => {

if(e.key === "Enter"){

searchNews();

}

});

loadNews();