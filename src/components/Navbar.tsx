import Cookies from "universal-cookie";

const navItems = [
  {
    id: "home",
    name: "Home",
    url: "/",
  },
  {
    id: "formRegister",
    name: "Register",
    url: "/register",
  },
  {
    id: "login",
    name: "Login",
    url: "/login",
  },
];

const navItemsLogin = [
  {
    id: "home",
    name: "Home",
    url: "/",
  },
  {
    id: "userProfile",
    name: "User Profile",
    url: "/user-profile",
  },
];

function Navbar() {
  const cookies = new Cookies();
  const token = cookies.get("token");

  const renderNavbar = () => {
    if (token) {
      return (
        <nav className="max-h-24 bg-[#F9EFDB]">
          <ul className="flex justify-center items-center h-full">
            {navItemsLogin.map((navItemLogin) => (
              <a key={navItemLogin.id} href={navItemLogin.url}>
                <li className=" p-4 cursor-pointer">{navItemLogin.name}</li>
              </a>
            ))}
          </ul>
        </nav>
      );
    } else {
      return (
        <nav className="max-h-24 bg-[#F9EFDB]">
          <ul className="flex justify-center items-center h-full">
            {navItems.map((navbarItem) => (
              <a key={navbarItem.id} href={navbarItem.url}>
                <li className=" p-4 cursor-pointer">{navbarItem.name}</li>
              </a>
            ))}
          </ul>
        </nav>
      );
    }
  };

  return renderNavbar();
}

export default Navbar;
