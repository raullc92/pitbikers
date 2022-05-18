import { firestore } from "./firebaseApp"
import {
  doc,
  getDoc,
  setDoc,
  collection,
  getDocs,
  getFirestore,
  query,
  where,
  deleteDoc,
  updateDoc,
  addDoc,
} from "firebase/firestore"
import {
  getStorage,
  ref,
  uploadBytes,
  getDownloadURL,
  deleteObject,
} from "firebase/storage"
import app from "./firebaseApp"
import { articlePermission } from "../application/usePermissions"
import { timestampToDate } from "../application/parseDates"

export const firestoreService = {
  newUser: async (uid, newUser) => {
    const firestore = getFirestore(app)
    const docRef = doc(firestore, `users/${uid}`)
    const docSnap = await getDoc(docRef)
    if (!docSnap.exists()) {
      setDoc(docRef, newUser)
    }
  },
  getUser: async (uid) => {
    const firestore = getFirestore(app)
    const docRef = doc(firestore, `users/${uid}`)
    const docSnap = await getDoc(docRef)
    if (docSnap.exists()) {
      return docSnap.data()
    }
  },

  deleteUser: async (uid) => {
    const firestore = getFirestore(app)
    const docRef = doc(firestore, `users/${uid}`)
    const result = await deleteDoc(docRef)
  },

  getUsers: async () => {
    const firestore = getFirestore(app)
    const collectionRef = collection(firestore, "users")
    const docSnap = await getDocs(collectionRef)
    const users = []
    docSnap.forEach((doc) => {
      users.push(doc.data())
    })
    return users
  },

  updateUserRole: async (uid, role) => {
    const firestore = getFirestore(app)
    const docRef = doc(firestore, `users/${uid}`)
    await updateDoc(docRef, { role: role })
  },

  getArticles: async () => {
    const firestore = getFirestore(app)
    const querySnapshot = await getDocs(collection(firestore, "articles"))
    const articles = []
    querySnapshot.forEach((doc) => {
      // let { date, ...data } = doc.data()
      // articles.push({ id: doc.id, date: timestampToDate(date), ...data })
      let { ...data } = doc.data()
      articles.push({ id: doc.id, ...data })
    })
    return articles
  },

  getArticleByTitle: async (title) => {
    const firestore = getFirestore(app)
    const q = query(
      collection(firestore, "articles"),
      where("title", "==", title)
    )
    const querySnapshot = await getDocs(q)
    const articles = []
    querySnapshot.forEach((doc) => {
      // let { date, ...data } = doc.data()
      // articles.push({ id: doc.id, date: timestampToDate(date), ...data })
      let { ...data } = doc.data()
      articles.push({ id: doc.id, ...data })
    })
    return articles[0]
  },

  addImage: async (image) => {
    const storage = getStorage(app)
    const imageRef = ref(storage, image.name)
    const storageRef = ref(storage, `images/${image.name}`)
    const snapshopt = await uploadBytes(storageRef, image)
    const url = await getDownloadURL(snapshopt.ref)
    return { url, imageName: image.name }
  },

  createArticle: async (article) => {
    const firestore = getFirestore(app)
    const docRef = await addDoc(collection(firestore, "articles"), article)
  },

  increaseVote: async (articleId, uid) => {
    const firestore = getFirestore(app)

    const docRef = doc(firestore, `articles/${articleId}`)
    const article = await getDoc(docRef)
    const { likes } = article.data()
    const newLikes = {
      count: likes.count + 1,
      users: [...likes.users, uid],
    }
    await updateDoc(docRef, { likes: newLikes })
  },

  decreaseVote: async (articleId, uid) => {
    const firestore = getFirestore(app)

    const docRef = doc(firestore, `articles/${articleId}`)
    const article = await getDoc(docRef)
    const { likes } = article.data()
    const newLikes = {
      count: likes.count - 1,
      users: likes.users.filter((user) => user !== uid),
    }
    await updateDoc(docRef, { likes: newLikes })
  },

  deleteArticle: async (articleId, uid, imageName) => {
    const firestore = getFirestore(app)
    const storage = getStorage(app)
    const user = await firestoreService.getUser(uid)
    if (articlePermission(user?.role)) {
      const docRef = doc(firestore, `articles/${articleId}`)
      await deleteDoc(docRef)
      const imageRef = ref(storage, `images/${imageName}`)
      await deleteObject(imageRef)
    }
  },
}
