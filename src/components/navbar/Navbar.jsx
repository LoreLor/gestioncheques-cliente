import "./Navbar.css";

const Navbar = () => {
  return (
    <header>
      <nav
        className="navbar navbar-expand-lg fixed-top navi"
        data-bs-theme="dark"
      >
        <div className="container-fluid">
          <img
            src="./assets/logo.svg"
            alt=""
            width="75"
            className="img-fluid"
          />
          <span className="text-lg-start text-white d-none d-lg-block">
            Check Control
          </span>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav ms-auto mb-2 mb-sm-0">
              <li className="nav-item">
                <a
                  className="nav-link active"
                  aria-current="page"
                  href="../index.html"
                >
                  Home
                </a>
              </li>
             
              <li className="nav-item">
                <a className="nav-link" href="#">
                  Iniciar Sesion
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link link-verde" href="#">
                  Registrarse
                </a>
              </li>
            </ul>
            <div class="dropdown">
              <button
                className="btn btn-avatar dropdown-toggle"
                type="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                <img
                  src="https://mdbcdn.b-cdn.net/img/new/avatars/2.webp"
                  className="rounded-circle"
                  height="25"
                  alt="Black and White Portrait of a Man"
                  loading="lazy"
                />
              </button>

              <ul className="dropdown-menu dropdown-menu-lg-end">
                <li>
                  <a className="dropdown-item" href="#">
                    Action
                  </a>
                </li>
                <li>
                  <a className="dropdown-item" href="#">
                    Another action
                  </a>
                </li>
                <li>
                  <a className="dropdown-item" href="#">
                    Something else here
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
