import React, { useEffect, useState } from "react";
import { customAxios } from "../function/customAxios";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { Cookies } from "react-cookie";

type UserType = {
  id: number;
  nickname: string;
  email: string;
};

function Header() {
  const [user, setUser] = useState<UserType>();
  const navigate = useNavigate();
  const cookies = new Cookies();

  const onClick = () => {
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

  useEffect(() => {
    customAxios.get("user").then((res) => {
      setUser(res.data);
    });
  }, []);

  return (
    <div>
      {user ? (
        <div>
          <Link to="/house">
            <button className="fixed top-2 left-4">HouseList</button>
          </Link>
          <Link to="/setting">
            <button className="fixed top-2 right-20"> {user.nickname}</button>
          </Link>
          <button className="fixed top-2 right-4" onClick={onClick}>
            | logout
          </button>
        </div>
      ) : null}
    </div>
  );
}

export default Header;
