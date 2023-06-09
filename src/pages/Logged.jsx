import PropTypes from 'prop-types'
import Header from "../components/Header"
import Footer from "../components/Footer"

/**
 * Displays the structure of a page with parent components (Header, Footer).
 * @param {Object} props - The child content of LoggedPage component.
 * @returns {JSX.Element} - The JSX markup for the LoggedPage component.
 */
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