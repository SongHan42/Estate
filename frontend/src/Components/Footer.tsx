import React from "react";
import { Link } from "react-router-dom";

function Footer() {
  return (
    <div className="flex justify-between w-full h-12 bg-[#8785a2] p-2 fixed bottom-0 left-0">
      <Link to="/setting">
        <button className="float-left mx-10">
          <img className="w-8" src="/img/white_profile.png" alt="" />
        </button>
      </Link>
      <Link to="/house">
        <button className="mx-20">
          <img className="w-9 items-center" src="/img/white_home.png" alt="" />
        </button>
      </Link>
      <Link to="/">
        <button className="mx-20">
          <img className="w-9 items-center" src="/img/white_heart.png" alt="" />
        </button>
      </Link>
      <Link to="/">
        <button className="mx-20">
          <img
            className="w-8 items-center "
            src="/img/white_search.png"
            alt=""
          />
        </button>
      </Link>
    </div>
  );
}

export default Footer;
