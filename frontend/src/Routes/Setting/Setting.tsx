import React from "react";
import Button from "../../Components/Button";
import { Link, useNavigate } from "react-router-dom";
import { customAxios } from "../../function/customAxios";
import axios from "axios";
import { Cookies } from "react-cookie";
import Footer from "../../Components/Footer";

function Setting() {
  const navigate = useNavigate();
  const cookies = new Cookies();
  const onClick = () => {
    if (window.confirm("정말 탈퇴하시겠습니까?")) {
      customAxios.delete("user").then(() => navigate("/"));
    }
  };

  const onClickLogout = () => {
    axios
      .post(
        process.env.REACT_APP_API_URL + "auth/logout",
        {},
        {
          headers: {
            Authorization: "Bearer " + cookies.get("refreshToken"),
          },
        },
      )
      .then(() => {
        cookies.remove("accessToken");
        cookies.remove("refreshToken");

        navigate("/");
      });
  };

  return (
    <div>
      <Link to="/importance">
        <Button style="mb-4" text="중요도 수정"></Button>
      </Link>
      <Link to="/user">
        <Button style="mb-4" text="회원정보 수정"></Button>
      </Link>
      <Link to="/house/offering/0">
        <Button style="mb-4" text="방 내놓기"></Button>
      </Link>
      <Link to="/house/offering">
        <Button style="mb-4" text="내놓은 방 보기"></Button>
      </Link>
      <Button onClick={onClickLogout} style="mb-4" text="로그아웃"></Button>
      <Button onClick={onClick} style="mb-4" text="회원 탈퇴"></Button>
      <Footer />
    </div>
  );
}

export default Setting;
