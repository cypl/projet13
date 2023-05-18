import PropTypes from 'prop-types'
import Header from '../components/Header'
import Footer from '../components/Footer'

function Error404({isLogged}){
    return(
        <div className="root-wrapper">
            <Header isLogged={isLogged}/>
            <main className="main bg-dark">
                <p>Erreur 404</p>
                {/* <p>Désolé, il n'y a rien sur cette page.</p>
                <p>Retour à la page d'accueil</p> */}
            </main>
            <Footer/>
        </div>
    )

}
export default Error404

Error404.propTypes = {
    isLogged: PropTypes.bool,
  }