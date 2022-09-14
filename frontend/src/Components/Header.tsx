import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { customAxios } from "../function/customAxios";

type UserType = {
  id: number;
  nickname: string;
  email: string;
};

function Header() {
  const [user, setUser] = useState<UserType>();
  useEffect(() => {
    customAxios.get("user").then((res) => {
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
