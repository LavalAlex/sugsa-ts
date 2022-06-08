import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { BiSearch } from "react-icons/bi";
// import { searchUser } from "../../Redux/Actions/User";
import {searchTicket} from '../../../Redux/Actions/Ticket'

import style from "./SearchBar.module.css";

export default function SearchBar(props) {
  const dispatch = useDispatch();
  const [input, setInput] = useState("");
  const [show, setShow] = useState(true);

  const ticket = useSelector((state) => state.tickets)

  useEffect(() => dispatch((searchTicket(input))), [input, dispatch]);

  const handleChange = ({ target: { value } }) => {
    setInput(value);
  };

  const handleList = (e) => {
    setShow(e);
  };

  console.log(ticket)
  return (
    <label className={style.inputData}>
      <BiSearch className={style.icon} /> 
      <input
        onBlur={() => handleList(true)}
        onFocus={() => handleList(false)}
        onChange={handleChange}
        placeholder="Search Users... "
        className={style.search}
      />
    </label>
  );
}
