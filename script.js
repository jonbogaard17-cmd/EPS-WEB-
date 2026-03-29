const RSS_URL = "https://api.rss2json.com/v1/api.json?rss_url=";

const sources = [
  "http://feeds.bbci.co.uk/news/rss.xml",
  "https://rss.nytimes.com/services/xml/rss/nyt/HomePage.xml",
  "https://feeds.a.dj.com/rss/RSSWorldNews.xml"
];

async function loadNews() {
  const container = document.getElementById("news-container");
  container.innerHTML = "Cargando noticias...";

  try {
    let allArticles = [];

    for (let source of sources) {
      const res = await fetch(RSS_URL + encodeURIComponent(source));
      const data = await res.json();

      if (data.items) {
        allArticles = allArticles.concat(data.items);
      }
    }

    // mezclar noticias
    allArticles.sort(() => 0.5 - Math.random());

    // coger 8
    const selected = allArticles.slice(0, 8);

    container.innerHTML = "";

    selected.forEach(article => {
      const div = document.createElement("div");
      div.classList.add("article");

      div.onclick = () => {
        window.open(article.link, "_blank");
      };

      div.innerHTML = `
        <img src="${article.thumbnail || 'https://via.placeholder.com/300'}">
        <div class="article-content">
          <h3>${article.title}</h3>
          <p>${article.description.substring(0, 100)}...</p>
          <div class="source">${article.author || 'Fuente externa'}</div>
        </div>
      `;

      container.appendChild(div);
    });

  } catch (error) {
    container.innerHTML = "Error cargando noticias";
    console.error(error);
  }
}

function scrollToNews() {
  document.getElementById("news").scrollIntoView({
    behavior: "smooth"
  });
}

loadNews();
setInterval(loadNews, 86400000);
