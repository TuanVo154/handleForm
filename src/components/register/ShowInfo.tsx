interface getDataFromParent {
  userInfos:
    | {
        id?: string;
        fullName: string;
        userName: string;
        email: string;
        password: string;
      }[]
    | null;
}

function ShowInfo(props: getDataFromParent) {
  return (
    <div className="">
      <h2 className="text-2xl text-[#e85a4f] mb-6">
        This is your current information
      </h2>
      {props.userInfos?.map((userInfo) => (
        <div key={userInfo.id} className="ml-4 mt-10">
          <label className="block my-4">
            Your full name is: {userInfo.fullName}
          </label>
          <label className="block my-4">Your email is: {userInfo.email}</label>
          <label className="block my-4">
            Your username is: {userInfo.userName}
          </label>
          <label className="block my-4">
            Your password is: {userInfo.password}
          </label>
        </div>
      ))}
    </div>
  );
}

export default ShowInfo;
