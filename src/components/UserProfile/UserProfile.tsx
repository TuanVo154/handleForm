import { useEffect, useState } from "react";
import Cookies from "universal-cookie";

interface UserInfo {
  id: string;
  fullName: string;
  userName: string;
  email: string;
  password: string;
}

function UserProfile() {
  const [userDetail, setUserDetail] = useState<UserInfo | null>(null);
  const [userID, setUserID] = useState();
  const cookies = new Cookies();

  useEffect(() => {
    getToken();
  }, []);

  const getToken = () => {
    const token = cookies.get("token");
    if (token) {
      const userID = token.userID;
      setUserID(userID);
      const userInfo = getUserFromStorage(userID);
      setUserDetail(userInfo);
    } else {
      alert("Your cookies expired");
      window.location.assign("http://localhost:3000/");
      localStorage.removeItem("isLogin");
    }
  };

  const getUserFromStorage = (userId: any) => {
    const userListString = localStorage.getItem("userInfo");
    if (userListString) {
      const userList = JSON.parse(userListString);
      const userFound = userList.find((user: any) => user.id === userId);
      return userFound;
    }
  };

  const removeUser = () => {
    alert("Remove user success");

    const userListString: any = localStorage.getItem("userInfo");
    const userList = JSON.parse(userListString);
    const userFound = getUserFromStorage(userID);
    const updateListUser = userList.filter(
      (item: any) => item.id !== userFound.id
    );
    localStorage.setItem("userInfo", JSON.stringify(updateListUser));
    cookies.remove("token");
    window.location.assign("http://localhost:3000/");
    localStorage.removeItem("isLogin");
  };

  const handleLogout = () => {
    alert("Logout user success");
    window.location.assign("http://localhost:3000/");
    localStorage.removeItem("isLogin");
    cookies.remove("token");
  };

  return (
    <div className="bg-white p-4 rounded-lg">
      <h2 className="text-2xl text-[#e85a4f] mb-6">
        This is your current information
      </h2>
      {userDetail && (
        <div key={userDetail.id} className="ml-4 mt-10">
          <label className="block my-4">
            Your full name is: {userDetail.fullName}
          </label>
          <label className="block my-4">
            Your email is: {userDetail.email}
          </label>
          <label className="block my-4">
            Your username is: {userDetail.userName}
          </label>
          <label className="block my-4">
            Your password is: {userDetail.password}
          </label>
        </div>
      )}
      <div className="flex justify-between items-center">
        <button
          className="p-2 cursor-pointer border border-solid border-black rounded-lg hover:bg-gray-400 hover:text-white hover:border-gray-400"
          onClick={handleLogout}
          type="submit"
        >
          Logout
        </button>
        <button
          className="p-2 cursor-pointer border border-solid border-[#e85a4f] rounded-lg hover:bg-[#e85a4f] hover:text-white"
          onClick={removeUser}
          type="submit"
        >
          Remove User
        </button>
        <button
          className="p-2 cursor-pointer border border-solid border-[#e85a4f] rounded-lg hover:bg-[#e85a4f] hover:text-white"
          type="submit"
        >
          test
        </button>
      </div>
    </div>
  );
}

export default UserProfile;
