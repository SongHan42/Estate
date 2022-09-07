import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { getConfig } from "../function/getConfig";

type UserType = {
  id: number;
  nickname: string;
  email: string;
};

function Header() {
  const [user, setUser] = useState<UserType>();
  useEffect(() => {
    axios
      .get(process.env.REACT_APP_API_URL + "user", getConfig())
      .then((res) => {
        console.log(res.data);
        setUser(res.data);
      });
  }, []);
  return (
    <div>
      {user ? (
        <Link to="/importance">
          <p className="text-right">{user.nickname}</p>
        </Link>
      ) : null}
    </div>
  );
}

export default Header;
