import OxxoLogo from "../assets/oxxo_logo.png";
import User from "../assets/user.png";
import NavbarStyles from "../styles/NavbarStyles.css";

function Navbar() {
  return (
    <div className="Navbar">
      <a href="#" className="OxxoLogoLink">
        <img className="OxxoLogo" src={OxxoLogo} alt="Oxxo Logo" />
      </a>
      <h1 className="Title">Administrador</h1>
      <a className="UserLink" href="#">
        <img className="User" src={User} alt="User" />
      </a>
    </div>
  );
}

export default Navbar;
