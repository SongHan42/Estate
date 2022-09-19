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
        <div className="text-right">
          <Link to="/importance">
            <button>{user.nickname}&nbsp;</button>
          </Link>
          <button onClick={onClick}>| logout</button>
        </div>
      ) : null}
    </div>
  );
}

export default Header;
