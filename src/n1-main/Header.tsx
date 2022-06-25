import React from "react";
import { Link } from "react-router-dom";
import s from "./style.module.css";

export const Header = () => {
  return (
    <div className={s.headerContainer}>
      <ul>
        <li>
          <Link to={"/login"}>login</Link>
        </li>
        <li>
          <Link to={"/register"}>register</Link>
        </li>
        <li>
          <Link to={"/forgot"}>forgot</Link>
        </li>
        <li>
          <Link to={"/"}>profile</Link>
        </li>
        <li>
          <Link to={"/list"}>packsList</Link>
        </li>
      </ul>
    </div>
  );
};
