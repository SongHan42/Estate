import React from "react";
import Button from "../../Components/Button";
import Header from "../../Components/Header";
import { Link, useNavigate } from "react-router-dom";
import { customAxios } from "../../function/customAxios";

function Setting() {
  const navigate = useNavigate();

  const onClick = () => {
    if (window.confirm("정말 탈퇴하시겠습니까?")) {
      customAxios.delete("user").then(() => navigate("/"));
    }
  };

  return (
    <div>
      <Header />
      <Link to="/importance">
        <Button style="mb-4" text="중요도 수정"></Button>
      </Link>
      <Link to="/user">
        <Button style="mb-4" text="회원정보 수정"></Button>
      </Link>
      <Button onClick={onClick} style="mb-4" text="회원 탈퇴"></Button>
    </div>
  );
}

export default Setting;
