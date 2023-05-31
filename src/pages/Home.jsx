import Header from "../components/Header"
import HomeBanner from "../components/HomeBanner"
import Features from "../components/Features"
import Footer from "../components/Footer"

function Home(){
    return(
        <div className="root-wrapper">
            <Header/>
            <main>
                <HomeBanner />
                <Features />
            </main>
            <Footer/>
        </div>
    )
}
export default Home
