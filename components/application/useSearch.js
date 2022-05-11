import { UseArticles } from "./useArticles"

export function useSearch() {
  const { getArticles } = UseArticles()

  const searchArticles = async (text, tags) => {
    let articles = await getArticles()
    if (text.length > 0) {
      const words = text.toLowerCase().split(" ")
      articles = articles.filter((article) => {
        const title = article.title.toLowerCase()
        return words.some((word) => title.includes(word))
      })
    }
    if (tags.length > 0) {
      articles = articles.filter((article) => {
        return tags.some((tag) => article.tags.includes(tag))
      })
    }
    return articles
  }

  const searchArticlesByTitle = async (text) => {
    const articles = await getArticles()
    const words = text.toLowerCase().split(" ")
    const foundArticles = articles.filter((article) => {
      const title = article.title.toLowerCase()
      return words.some((word) => title.includes(word))
    })
    return foundArticles
  }

  const searchArticlesByTags = (tags, articles) => {
    const foundArticles = articles.filter((article) => {
      return tags.some((tag) => article.tags.includes(tag))
    })
    return foundArticles
  }

  return {
    searchArticlesByTitle,
    searchArticlesByTags,
    searchArticles,
  }
}
