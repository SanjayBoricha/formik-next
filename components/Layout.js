import Head from 'next/head';

const Layout = props => {
  return (
    <div className="content-wrapper">
      <Head>
        <title>{props.title ? `${props.title} | Cool App` : 'Cool App'}</title>
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, shrink-to-fit=no"
        />
      </Head>

      <div className="container d-flex justify-content-center align-items-center">
        {props.children}
      </div>

      <style jsx global>{`
        *,
        *::before,
        *::after {
          box-sizing: border-box;
        }

        html {
          height: 100%;
        }

        body {
          margin: 0;
          line-height: 1.7;
          font-weight: 400;
          color: #353535;
          font-family: -apple-system, BlinkMacSystemFont, Roboto, 'Segoe UI',
            'Fira Sans', Avenir, 'Helvetica Neue', 'Lucida Grande', sans-serif;
          text-rendering: optimizeLegibility;
          height: 100%;
        }

        a {
          color: #353535;
          text-decoration: none;
        }

        a:hover {
          color: #151515;
        }

        h1,
        h2,
        h3 {
          margin: 40px 0 30px;
        }

        h1 {
          font-size: 42px;
        }

        h2 {
          font-size: 36px;
        }

        p {
          margin: 0 0 10px;
        }
        /* Layout */
      `}</style>
    </div>
  );
};

export default Layout;
