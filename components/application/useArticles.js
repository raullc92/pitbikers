import { Timestamp } from "firebase/firestore"
import React from "react"
import { firestoreService } from "../infrastructure/firestoreService"

export function UseArticles() {
  const getArticles = async () => {
    const articles = await firestoreService.getArticles()
    return articles
  }

  const getArticleByName = async (title) => {
    const article = await firestoreService.getArticleByTitle(title)
    return article
  }

  const createArticle = async (article, image) => {
    const url = await firestoreService.addImage(image)
    const newArticle = {
      title: article.title,
      description: article.description,
      tags: article.tags,
      url,
      date: Timestamp.fromDate(new Date()),
      likes: {
        count: 0,
        users: [],
      },
    }
    await firestoreService.createArticle(newArticle)
  }

  const increaseVote = async (articleId, uid) => {
    await firestoreService.increaseVote(articleId, uid)
  }

  const decreaseVote = async (articleId, uid) => {
    await firestoreService.decreaseVote(articleId, uid)
  }

  const deleteArticle = async (articleId, uid) => {
    await firestoreService.deleteArticle(articleId, uid)
  }

  return {
    getArticles,
    getArticleByName,
    createArticle,
    increaseVote,
    decreaseVote,
    deleteArticle,
  }
}
