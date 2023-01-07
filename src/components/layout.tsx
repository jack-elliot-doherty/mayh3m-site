import Header from "./header";
import Footer from "./footer";
import Nav from "./nav";

const Layout = ({ children }: any) => {
  return (
    <div>
      <Header />
      <Nav />
      <main className="font-sm flex min-h-screen justify-center">
        <div className="container flex flex-col items-center  gap-16 px-4 py-10 ">
          {children}
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Layout;
