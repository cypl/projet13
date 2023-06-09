import HomeBanner from "../components/HomeBanner"
import Features from "../components/Features"

/**
 * Displays content elements from Home page. Child element of Logged.jsx (page).
 * @returns {JSX.Element} - The JSX markup for the Home component.
 */
function Home(){
    return(
        <main>
            <HomeBanner />
            <Features />
        </main>
    )
}
export default Home
