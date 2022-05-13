import Navbar from "../components/presentation/navbar"
import "../styles/globals.css"
import { AuthProvider } from "../components/application/useAuth"
import "../components/infrastructure/firebaseApp"
import Footer from "../components/presentation/footer"

function MyApp({ Component, pageProps }) {
  return (
    <AuthProvider>
      <Navbar />
      <Component {...pageProps} />
      <Footer />
    </AuthProvider>
  )
}

export default MyApp
