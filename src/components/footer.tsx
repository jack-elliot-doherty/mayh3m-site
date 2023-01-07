const Footer = () => {
  return (
    <footer className="flex justify-between p-6 text-xs">
      <div>
        <p className="text-xs hover:opacity-50">NEWSLETTER</p>
      </div>
      <div className="">
        <p>© 2023 MAYH3M</p>
      </div>

      <div className="flex">
        <div className="p-1">
          <a
            href="https://www.instagram.com/mayh3m.xyz/"
            target="_blank"
            rel="noopener noreferrer"
          >
            <img
              className="h-auto w-3 hover:opacity-50"
              src="/static/img/instagram.png"
            ></img>
          </a>
        </div>
        <div className="p-1">
          <a
            href="https://twitter.com/mayh3m_by_f3z"
            target="_blank"
            rel="noopener noreferrer"
          >
            <img
              className="h-auto w-3 hover:opacity-50"
              src="/static/img/twitter.png"
            ></img>
          </a>
        </div>
      </div>
    </footer>
  );
};
export default Footer;
