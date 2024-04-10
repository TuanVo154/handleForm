import { TextField } from "@mui/material";
import { useEffect, useState } from "react";
import Cookies from "universal-cookie";
const loginItems = [
  {
    id: 1,
    name: "userName",
    label: "Username",
    inputType: "text",
  },
  {
    id: 2,
    name: "password",
    label: "Password",
    inputType: "password",
  },
];

interface FormErrors {
  userName?: string;
  password?: string;
}

function LoginForm() {
  //State
  const [loginInfo, setLoginInfo] = useState({});
  const [userInLocalStorage, setUserInLocalStorage] = useState([]);
  const [errors, setErrors] = useState<FormErrors>({});
  const [isLogin, setIsLogin] = useState(false);

  //Get data in form
  const getLoginInfo = (event: React.ChangeEvent<HTMLInputElement>) => {
    const key = event.target.name;
    const value = event.target.value;
    setLoginInfo((values) => ({ ...values, [key]: value }));
    setErrors((values) => ({ ...values, [key]: "" }));
  };

  //Get data from Storage
  useEffect(() => {
    getDataFromStorage();
  }, []);

  const getDataFromStorage = () => {
    const dataInfoString = localStorage.getItem("userInfo");
    if (dataInfoString) {
      const dataJson = JSON.parse(dataInfoString) || [];
      setUserInLocalStorage(dataJson);
    }
  };

  //Handle Login
  const handleLogin = (event: React.FormEvent) => {
    event.preventDefault();
    const formErrors = validateForm(loginInfo);
    const userLogin: any = verifyUser(loginInfo);
    if (Object.keys(formErrors).length === 0 && userLogin) {
      alert("Login Success !!!");
      // Create token
      const token = {
        userID: userLogin?.id,
        name: userLogin?.userName,
      };
      console.log("This is your token", token);

      // Set cookies and expiration
      const cookies = new Cookies();
      const expiration = new Date();
      expiration.setTime(expiration.getTime() + 120000); // 2 minutes
      cookies.set("token", token, { path: "/", expires: expiration });

      setIsLogin(true);
      localStorage.setItem("isLogin", JSON.stringify(isLogin));
      window.location.assign("http://localhost:3000/user-profile");
    } else {
      alert("Login Fail!!!");
      setErrors(formErrors);
    }
  };

  //Validate Form
  const validateForm = (obj: any) => {
    let errorsString: FormErrors = {};
    if (!obj.userName) {
      errorsString.userName = "Please enter your username";
    }
    if (!obj.password) {
      errorsString.password = "Please enter your password";
    }

    return errorsString;
  };

  const verifyUser = (obj: any) => {
    const userFound = userInLocalStorage.find(
      (user: any) =>
        user.userName === obj.userName && user.password === obj.password
    );
    if (!userFound) {
      alert("Incorrect username or password");
    } else {
      return userFound;
    }
  };

  return (
    <div className="bg-white p-4 rounded-lg">
      <h2 className="text-2xl text-[#e85a4f] mb-6">Login</h2>
      <form action="" onSubmit={handleLogin}>
        <div className="">
          {loginItems.map((loginItem) => (
            <div key={loginItem.id} className="my-5">
              <TextField
                id="standard-basic"
                label={loginItem.label}
                variant="standard"
                onChange={getLoginInfo}
                name={loginItem.name}
                type={loginItem.inputType}
                helperText={errors[loginItem.name as keyof FormErrors]}
              ></TextField>
            </div>
          ))}
          <input
            className="block m-auto px-3 py-2 border border-solid border-[#e85a4f] rounded-lg cursor-pointer hover:border-white hover:bg-[#e85a4f] hover:text-white"
            type="submit"
          />
        </div>
      </form>
    </div>
  );
}

export default LoginForm;
