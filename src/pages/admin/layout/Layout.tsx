import { useState } from "react";
import { Outlet, useNavigate } from "react-router";
import styles from "./styles.module.scss";
import { Link } from "react-router-dom";
import { UserOutlined } from "@ant-design/icons";
import Cookies from "js-cookie";
import { logout } from "../../../api/api";
interface LayoutProps {}

const Layout = () => {
  const navigate = useNavigate();
  const [selectedItem, setSelectedItem] = useState("");
  const handleItemClick = (item: string) => {
    setSelectedItem(item);
    navigate(`./${item}`);
  };
  const handleLogOut = () => {
    logout();
    navigate("/dang-nhap");
  };
  return (
    <>
      <div className={styles.headerContainer}>
        <div
          onClick={() => handleItemClick("")}
          className={`${styles.headerItem} ${
            window.location.pathname.match(/admin(\/|$)/) ? styles.selected : ""
          }`}
        >
          <span className={styles.text}>Trang chủ </span>
        </div>
        <div
          onClick={() => handleItemClick("them-moi")}
          className={`${styles.headerItem} ${
            window.location.pathname.includes("/admin/them-moi")
              ? styles.selected
              : ""
          }`}
        >
          <span className={styles.text}>Thêm Folder</span>
        </div>
        <div
          onClick={() => handleItemClick("quan-ly-chung")}
          className={`${styles.headerItem} ${
            window.location.pathname.includes("/admin/quan-ly-chung")
              ? styles.selected
              : ""
          }`}
        >
          <span className={styles.text}>Quản lý</span>
        </div>
        {/* <div
          onClick={() => handleItemClick("user")}
          className={`${styles.headerItem} ${
            window.location.pathname.includes("/admin/user") ? styles.selected : ""
          }`}
        >
          <span className={styles.text}>User</span>
        </div> */}
        <div className={styles.icon}>
          <UserOutlined className={styles.userIcon}/>
          <div className={`animate__zoomIn ${styles.userMenu}`}>
            {" "}
            <li className={styles.menuItem} onClick={()=>{navigate("/")}}>
              <Link to={"/"} className={styles.menuItemLink}>
                User
              </Link>
            </li>
            <li className={styles.menuItem} onClick={() => handleLogOut()}>
              <Link to={"/dang-nhap"} className={styles.menuItemLink}>
                Đăng xuất
              </Link>
            </li>
          </div>
        </div>
      </div>

      <div className={styles.wraps}>
        {" "}
        <Outlet />
      </div>
    </>
  );
};

export default Layout;
