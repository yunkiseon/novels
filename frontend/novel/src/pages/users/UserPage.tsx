import { Outlet } from "react-router-dom";
import BasicLayout from "../../layouts/BasicLayout";

function UserPage() {
  return (
    <BasicLayout>
      <h1 className="text-[32px]">Register of Login</h1>
      <Outlet />
    </BasicLayout>
  );
}

export default UserPage;
