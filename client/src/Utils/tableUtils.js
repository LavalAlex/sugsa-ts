import user1 from "../Img/users/user1.jpg";
import user2 from "../Img/users/user2.jpg";
import user3 from "../Img/users/user3.jpg";
import user4 from "../Img/users/user4.jpg";
import user5 from "../Img/users/user5.jpg";
import user6 from "../Img/users/user1.jpg";
import user7 from "../Img/users/user2.jpg";
import user8 from "../Img/users/user3.jpg";
import user9 from "../Img/users/user4.jpg";
import user10 from "../Img/users/user5.jpg";

export  function avatarUser() {
  const user = "user" + Math.floor(Math.random() * 10);
  
  if (user === "user0") return user1;
  if (user === "user1") return user1;
  if (user === "user2") return user2;
  if (user === "user3") return user3;
  if (user === "user4") return user4;
  if (user === "user5") return user5;
  if (user === "user6") return user6;
  if (user === "user7") return user7;
  if (user === "user8") return user8;
  if (user === "user9") return user9;
  if (user === "user10") return user10;
}

export  function utilDate(date){
  const newDate = new Date(date)
  return `${newDate.getDate()} / ${newDate.getMonth()} /${newDate.getFullYear()}`
}