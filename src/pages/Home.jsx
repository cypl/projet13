import PropTypes from 'prop-types'
import Header from "../components/Header"
import HomeBanner from "../components/HomeBanner"
import Features from "../components/Features"
import Footer from "../components/Footer"

function Home({isLogged}){
    return(
        <div>
            <Header isLogged={isLogged}/>
        <main>
            <HomeBanner />
            <Features />
        </main>
            <Footer/>
        </div>
    )
}
export default Home

Home.propTypes = {
    isLogged: PropTypes.bool,
  }