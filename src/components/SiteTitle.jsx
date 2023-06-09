import { useState, useEffect } from 'react'
import { useLocation } from 'react-router-dom'

/**
 * Displays the content of the <meta title> based on current location.
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
