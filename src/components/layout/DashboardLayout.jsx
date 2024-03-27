import Navbar from "../shared/Navbar";
import { NavLink, Outlet } from "react-router-dom";
import { Layout, Menu } from "antd";
const { Content, Sider } = Layout;

const DashboardLayout = () => {
  const items = [
    {
      key: "1",
      label: <NavLink to="/dashboard">Manage Packages</NavLink>,
    },
    {
      key: "2",
      label: <NavLink to="/dashboard/add-package">Add Package</NavLink>,
    },
  ];

  return (
    <main>
      {/* navbar */}
      <Navbar />

      <Layout className="min-h-[calc(100dvh-64px)]">
        <Sider breakpoint="lg" collapsedWidth="0">
          <Menu
            theme="dark"
            mode="inline"
            defaultSelectedKeys={["1"]}
            items={items}
          />
        </Sider>

        <Layout className="bg-red-500">
          {/* content part */}
          <Content>
            <Outlet />
          </Content>
        </Layout>
      </Layout>

      {/* footer */}
    </main>
  );
};

export default DashboardLayout;
