export async function fetchNews(page = 1) {
  try {
    const response = await fetch(
      `https://min-api.cryptocompare.com/data/v2/news/?lang=EN&sortOrder=latest&page=${page - 1}`
    );
    
    if (!response.ok) {
      throw new Error('Failed to fetch news');
    }

    const data = await response.json();
    
    if (!data.Data) {
      throw new Error('Invalid news data received');
    }

    const startIndex = (page - 1) * 10 % 50;
    const articles = data.Data.slice(startIndex, startIndex + 10).map(article => ({
      title: article.title,
      description: article.body,
      url: article.url,
      imageUrl: article.imageurl,
      publishedAt: new Date(article.published_on * 1000).toISOString(),
      source: {
        name: article.source
      }
    }));

    return {
      articles,
      totalResults: Math.min(data.Data.length * 5, 100)
    };
  } catch (error) {
    console.error('Error fetching news:', error);
    return {
      articles: [],
      totalResults: 0
    };
  }
}