const API_KEY = "53afb9ea38c0487294de76657b69abf2";

async function loadNews() {
  const container = document.getElementById("news-container");

  try {
    const res = await fetch(
      `https://newsapi.org/v2/top-headlines?language=en&pageSize=8&apiKey=${API_KEY}`
    );

    const data = await res.json();

    container.innerHTML = "";

    data.articles.forEach(article => {
      const div = document.createElement("div");
      div.classList.add("article");

      div.onclick = () => {
        window.open(article.url, "_blank");
      };

      div.innerHTML = `
        <img src="${article.urlToImage || 'https://via.placeholder.com/300'}">
        <div class="article-content">
          <h3>${article.title}</h3>
          <p>${article.description || ''}</p>
          <div class="source">${article.source.name}</div>
        </div>
      `;

      container.appendChild(div);
    });

  } catch (error) {
    console.error("Error:", error);
  }
}

function scrollToNews() {
  document.getElementById("news").scrollIntoView({
    behavior: "smooth"
  });
}

loadNews();
setInterval(loadNews, 86400000);
