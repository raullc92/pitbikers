import { UseArticles } from "./useArticles"
import { UseThreats } from "./UseThreats"

export function useSearch() {
  const { getArticles } = UseArticles()
  const { getThreats } = UseThreats()

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

  const searchThreats = async (text, tags) => {
    let threats = await Promise.all(
      tags.map(async (tag) => {
        const document = "tag" + tag
        const threatsByTag = await getThreats(document)
        const threatsWithTag = threatsByTag.map((threat) => {
          return {
            ...threat,
            tag: document,
          }
        })
        return threatsWithTag
      })
    )
    let flatThreats = threats.flat()
    if (text.length > 0) {
      const words = text.toLowerCase().split(" ")
      flatThreats = flatThreats.filter((threat) => {
        const title = threat.title.toLowerCase()
        return words.some((word) => title.includes(word))
      })
    }
    return flatThreats
  }

  return {
    searchArticlesByTitle,
    searchArticlesByTags,
    searchArticles,
    searchThreats,
  }
}
