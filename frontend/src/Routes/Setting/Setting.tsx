import React from "react";
import Button from "../../Components/Button";
import Header from "../../Components/Header";
import { Link } from "react-router-dom";

function Setting() {
  return (
    <div>
      <Header />
      <Link to="/importance">
        <Button style="mb-4" text="중요도 수정"></Button>
      </Link>
      <Link to="/user">
        <Button style="mb-4" text="회원정보 수정"></Button>
      </Link>
      <Button style="mb-4" text="회원 탈퇴"></Button>
    </div>
  );
}

export default Setting;
