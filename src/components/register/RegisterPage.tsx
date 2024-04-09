import { useState } from "react";
import ImportInfo from "./ImportInfo";
// import ShowInfo from "./ShowInfo";

interface FormData {
  id?: string;
  fullName: string;
  userName: string;
  email: string;
  password: string;
}

function RegisterPage() {
  // Get data from child
  const [transferData, setTransferData] = useState<[] | null>(null);
  const getData = (dataFormChild: FormData) => {
    const childData: any = [];
    childData.push({ ...dataFormChild });
    setTransferData(childData);
  };

  return (
    <div className="bg-[#D8C3A5] flex items-center justify-center h-screen">
      <div className="max-w-[800px] p-6 flex justify-center bg-white rounded-lg">
        <div className="h-full">
          <ImportInfo sendData={getData}></ImportInfo>
        </div>
        {/* <div className="flex flex-col items-start">
          <ShowInfo userInfos={transferData}></ShowInfo>
        </div> */}
      </div>
    </div>
  );
}

export default RegisterPage;
