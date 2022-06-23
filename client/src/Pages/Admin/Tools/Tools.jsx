import React from "react";
import { useNavigate } from "react-router-dom";

import style from "./Tools.module.css";
import { IoBusiness, IoFileTrayStackedOutline } from "react-icons/io5";
import { AiOutlineUserAdd } from "react-icons/ai";
import { MdAdminPanelSettings } from "react-icons/md";
import NavBarTools from "../../../Components/Admin/NavBarTool/NavBarTools";
import { useState } from "react";
import Departament from "./Departament/Departament";
import BusinessAdd from "./Business/BusinessAdd";
import Technicals from "./Technicals/Technicals"
import User from "./User/UserAdd"
import BusinessEdit from "./Business/BusinessEdit";
import TicketConfig from "./TIcket/TicketConfig";
import UserEdit from "./User/UserEdit";



export default function Tools() {
  let navitage = useNavigate();
  const [selectLink, setSelectLink] = useState({businessAdd:"businessAdd"});

  const handleLink = (path) => {
    navitage(`/admin/tool/${path}`);
  };

  return (
    <div className={style.container}>
      <NavBarTools handleLink={setSelectLink} active={selectLink} />
      {selectLink.businessAdd? <BusinessAdd/>:""}
      {selectLink.businessEdit? <BusinessEdit/>:""}
      {selectLink.departament ? <Departament /> : ""}
      {selectLink.technical? <Technicals/>: ""}
      {selectLink.user? <User setSelectLink={setSelectLink}/>:""}
      {selectLink.ticket? <TicketConfig/> :""}
      {selectLink.userEdit ? <UserEdit  setSelectLink={setSelectLink}/> : ""}
    </div>
  );
}
