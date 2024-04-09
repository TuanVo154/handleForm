import { useEffect, useState } from "react";
import Cookies from "universal-cookie";

function UserProfile() {
  const [userDetail, setUserDetail] = useState([]);
  const cookies = new Cookies();

  useEffect(() => {
    checkCookies();
  }, []);

  const getDataFromStorage = () => {
    const getUserDetail: any = localStorage.getItem("userInfo");
    const parseUserDetails = JSON.parse(getUserDetail);
    const userDetail: any = [];
    userDetail.push(parseUserDetails);
    setUserDetail(userDetail);
  };

  const checkCookies = () => {
    const token = cookies.get("token");
    if (token) {
      getDataFromStorage();
    } else {
      alert("Your cookies expired");
      window.location.assign("http://localhost:3000/");
      localStorage.removeItem("isLogin");
    }
  };

  const removeUser = () => {
    alert("Remove user success");
    window.location.assign("http://localhost:3000/");
    localStorage.removeItem("isLogin");
    localStorage.removeItem("userInfo");
    cookies.remove("token");
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
      {userDetail.map((item: any) => (
        <div key={item.id} className="ml-4 mt-10">
          <label className="block my-4">
            Your full name is: {item.fullName}
          </label>
          <label className="block my-4">Your email is: {item.email}</label>
          <label className="block my-4">
            Your username is: {item.userName}
          </label>
          <label className="block my-4">
            Your password is: {item.password}
          </label>
        </div>
      ))}
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
      </div>
    </div>
  );
}

export default UserProfile;
