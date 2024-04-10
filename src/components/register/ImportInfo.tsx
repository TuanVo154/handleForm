import { useEffect, useState } from "react";
import { TextField } from "@mui/material";
import { v4 as uuidv4 } from "uuid";

const inputItems = [
  {
    id: 1,
    name: "fullName",
    label: "Full Name",
    inputType: "text",
  },
  {
    id: 2,
    name: "userName",
    label: "Username",
    inputType: "text",
  },
  {
    id: 3,
    name: "email",
    label: "Email Address",
    inputType: "email",
  },
  {
    id: 4,
    name: "password",
    label: "Password",
    inputType: "password",
  },
];

interface ChildData {
  sendData: (childData: any) => void;
}

interface FormErrors {
  fullName?: string;
  userName?: string;
  email?: string;
  password?: string;
}

const ImportInfo: React.FC<ChildData> = ({ sendData }) => {
  //State
  const [userInfo, setUserInfo] = useState({});
  const [errors, setErrors] = useState<FormErrors>({});

  //Get data in Storage
  const getListUser: any = localStorage.getItem("userInfo");
  const dataListUser: any = JSON.parse(getListUser) || [];

  //Get data user
  const getUserInfoAndErrors = (event: React.ChangeEvent<HTMLInputElement>) => {
    const key = event.target.name;
    const value = event.target.value;
    setUserInfo((values) => ({ ...values, [key]: value }));
    setErrors((values) => ({ ...values, [key]: "" }));
  };

  //Check have user in localStorage
  const checkUserInLocalStorage = (obj: any) => {
    if (dataListUser) {
      dataListUser.push(obj);
      localStorage.setItem("userInfo", JSON.stringify(dataListUser));
    } else {
      localStorage.setItem("userInfo", JSON.stringify(obj));
    }
  };

  //Save data user into cookies
  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    const formErrors = validateForm(userInfo);
    if (Object.keys(formErrors).length === 0) {
      alert("Register successfully");
      const userID = uuidv4();
      const userInfoHaveID = { ...userInfo, id: userID };
      checkUserInLocalStorage(userInfoHaveID);
      window.location.assign("http://localhost:3000/login");
    } else {
      alert("Fail successfully");
      setErrors(formErrors);
    }
  };

  //Validate Form
  const validateForm = (obj: any) => {
    let errorsString: FormErrors = {};
    const existsUserName = dataListUser.find(
      (user: any) => user.userName === obj.userName
    );

    if (!obj.fullName) {
      errorsString.fullName = "Please enter your full name";
    }

    if (!obj.userName) {
      errorsString.userName = "Please enter your username";
    } else if (obj.userName.length < 4) {
      errorsString.userName = "Username must be at least 4 characters";
    }

    if (existsUserName) {
      errorsString.userName = "Username already in use";
    }

    if (!obj.email) {
      errorsString.email = "Please enter your email address";
    }
    if (!obj.password) {
      errorsString.password = "Please enter your password";
    } else if (obj.password.length < 6) {
      errorsString.password = "Password must be at least 6 character";
    }

    return errorsString;
  };

  return (
    <div className="max-w-[500px] ">
      <h2 className="text-2xl text-[#e85a4f] mb-6">Register</h2>
      <form action="" onSubmit={handleSubmit}>
        {inputItems.map((inputItem) => (
          <div className="">
            <div key={inputItem.id} className="m-4 px-4">
              <TextField
                className="m-4 px-4"
                id="standard-basic"
                label={inputItem.label}
                variant="standard"
                onChange={getUserInfoAndErrors}
                name={inputItem.name}
                type={inputItem.inputType}
              />
              {errors[inputItem.name as keyof FormErrors] && (
                <span className="block mt-2 text-xs text-red-600">
                  {errors[inputItem.name as keyof FormErrors]}
                </span>
              )}
            </div>
          </div>
        ))}
        <input
          className="block m-auto px-3 py-2 border border-solid border-[#e85a4f] rounded-lg cursor-pointer hover:border-white hover:bg-[#e85a4f] hover:text-white"
          type="submit"
        />
      </form>
    </div>
  );
};

export default ImportInfo;
