import Header from '../components/Header'
import Footer from '../components/Footer'

function Error404(){
    return(
        <div className="root-wrapper">
            <Header/>
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
