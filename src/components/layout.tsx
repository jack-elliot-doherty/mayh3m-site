import Header from "./header"
import Footer from "./footer"

const Layout = ({ children }:any) => {
    return (
        <div>
            <Header />
            <main>{children}</main>
            <Footer />
        </div>
    )
}

export default Layout
    