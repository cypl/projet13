import PropTypes from 'prop-types'
import Header from "../components/Header"
import Footer from "../components/Footer"

function LoggedPage({children}){
    return(
        <div className="root-wrapper">
            <Header/>
                {children}
            <Footer/>
        </div>
    )
}
export default LoggedPage


LoggedPage.propTypes = {
    children: PropTypes.element,
  }