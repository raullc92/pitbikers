import Navbar from "../components/presentation/navbar"
import "../styles/globals.css"
import { AuthProvider } from "../components/application/useAuth"
import "../components/infrastructure/firebaseApp"

function MyApp({ Component, pageProps }) {
  return (
    <AuthProvider>
      <Navbar />
      <Component {...pageProps} />
    </AuthProvider>
  )
}

export default MyApp
