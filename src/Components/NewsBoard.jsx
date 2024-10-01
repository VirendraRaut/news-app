import { useEffect, useState } from "react";
import NewsItem from "./NewsItem";

const NewsBoard = () => {
  const [articles, setArticles] = useState([]);

  useEffect(() => {
    const fetchArticles = async () => {
      const apiKey = import.meta.env.VITE_API_KEY;
      console.log(apiKey); // Check if the API key is being correctly loaded
      // const url = `https://newsapi.org/v2/top-headlines?country=us&category=${category}&apiKey=${apiKey}`;
      const url = `https://newsapi.org/v2/top-headlines?sources=google-news-in&apiKey=${apiKey}`;

      const response = await fetch(url);
      const data = await response.json();
      if (data.articles) {
        setArticles(data.articles);
      }
    };

    fetchArticles();
  }, []); // Run once on component mount

  return (
    <div>
      <h2 className="text-center">
        Latest <span className="badge bg-danger">News</span>
      </h2>
      {articles.length > 0 ? (
        articles.map((news, index) => (
          <NewsItem
            key={index}
            title={news.title}
            description={news.description}
            src={news.urlToImage}
            url={news.url}
          />
        ))
      ) : (
        <p>No news articles available.</p>
      )}
    </div>
  );
};

export default NewsBoard;
