import { useEffect, useState } from "react";
import DataTable from "react-data-table-component";

import UserModal from "../Components/UserModal";
import axiosInstance from "../Config/axiosInstance";
import HomeLayout from "../Layouts/HomeLayout";
function ListAllUsers() {
  const columns = [
    {
      name: "User Id",
      selector: (row) => row._id,
      reorder: true,
    },
    {
      name: "Email",
      selector: (row) => row.email,
      reorder: true,
    },
    {
      name: "Name",
      selector: (row) => row.name,
      reorder: true,
    },
    {
      name: "Status",
      selector: (row) => row.userStatus,
      reorder: true,
    },
    {
      name: "Type",
      selector: (row) => row.userType,
      reorder: true,
      sortable: true,
    },
  ];

  const [userList, setUserList] = useState([]);
  const [userDisplayDetails, setUserDisplayDetails] = useState({
    name: "",
    email: "",
    userStatus: "",
    userType: "",
    clientName: "",
    id:""
  });

  async function loadUsers() {
    const response = await axiosInstance.get("/users", {
      headers: {
        "x-access-token": localStorage.getItem("token"),
      },
    });
    setUserList(response?.data?.result);
  }

  useEffect(() => {
    loadUsers();
  }, []);

  return (
    <HomeLayout>
      <div className="min-h-[90vh] flex items-center justify-center">
        {userList && (
          <DataTable
            onRowClicked={(row) => {
              setUserDisplayDetails({
                id:row._id,
                name: row.name,
                email: row.email,
                userStatus: row.userStatus,
                userType: row.userType,
                clientName: row.clientName,
              });
              document.getElementById("user_details_modal").showModal();
            }}
            columns={columns}
            data={userList}
          />
        )}
      </div>

      <UserModal key={userDisplayDetails.email} userDisplayDetails={userDisplayDetails} resetTable={loadUsers}/>
    </HomeLayout>
  );
}

export default ListAllUsers;
