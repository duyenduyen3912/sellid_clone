import { Button, Form, Input } from "antd";
import { useForm } from "antd/es/form/Form";
import styles from "./styles.module.scss";
import { useNavigate } from "react-router";
import { logIn } from "../../../api/admin";
import Cookies from "js-cookie";
import CryptoJS from "crypto-js"
const secretKey = process.env.REACT_APP_SECRET_KEY as string;

interface LogInComponentProps {}

const LogInComponent = () => {
  const [form] = useForm();
  const navigate = useNavigate();

  const onFinish = async (value: any) => {
    try {
      const payload = {
        username: value.username,
        password: value.password,
      };
      const res = await logIn(payload);
      console.log(res)
      //  const token = CryptoJS.AES.encrypt(res.jwt, secretKey).toString();
      const username = CryptoJS.AES.encrypt(res.username, secretKey).toString();
      const isAdmin = CryptoJS.AES.encrypt(res.isAdmin, secretKey).toString();
      const fullname = CryptoJS.AES.encrypt(res.fullname, secretKey).toString();
      const phone = CryptoJS.AES.encrypt(res.phone, secretKey).toString();
      const money = CryptoJS.AES.encrypt(res.money, secretKey).toString();

      if (res.status == "success") {
        if (res.isAdmin === "1") navigate("/admin");
        else navigate("/");
        Cookies.set("token", res.jwt);
        Cookies.set("username", username);
        Cookies.set("admin", isAdmin);
        Cookies.set("fullname", fullname);
        Cookies.set("phone", phone);
        Cookies.set("money", money);
      } else alert(res.data);
    } catch (error: any) {
      alert("Đăng nhập thất bại");
      console.log("error", error);
    }
  };
  return (
    <>
      <Form layout="vertical" form={form} onFinish={onFinish} size="large">
        <Form.Item
          label="Tên đăng nhập"
          name="username"
          rules={[{ required: true, message: "Vui lòng nhập tên tài khoản!" }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="Mật khẩu"
          name="password"
          rules={[{ required: true, message: "Vui lòng nhập mật khẩu" }]}
        >
          <Input.Password />
        </Form.Item>
        <Form.Item>
          <Button className={styles.btn} htmlType="submit" type="primary">
            Đăng nhập
          </Button>
        </Form.Item>
      </Form>
    </>
  );
};

export default LogInComponent;