import { useState, useEffect } from 'react'
import { useLocation } from 'react-router-dom'

/**
 * Ce composant permet changer la balise meta title de la page, après un changement de page
 * @returns
 */
export default function SiteTitle() {
    const { pathname } = useLocation()
    const [pageTitle, setPageTitle] = useState("ARGENT BANK")

    useEffect(() => {
        pathname === "/" && setPageTitle("ARGENT BANK - Home")
        pathname === "/signin" && setPageTitle("ARGENT BANK - Sign In")
        pathname === "/user" && setPageTitle("ARGENT BANK - User Accounts")
        document.title = pageTitle
    }, [pathname, pageTitle])
    return null
}
