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

export function avatarUser(i) {
  var index = i;
  
  while (index > 10) {
    var index = index - 10;
  }

  if (index === 0) return user1;
  if (index === 1) return user10;
  if (index === 2) return user2;
  if (index === 3) return user3;
  if (index === 4) return user4;
  if (index === 5) return user5;
  if (index === 6) return user6;
  if (index === 7) return user7;
  if (index === 8) return user8;
  if (index === 9) return user9;
  if (index === 10) return user10;
}

export function utilDate(date) {
  const newDate = new Date(date);
  return `${newDate.getDate()} / ${newDate.getMonth()} /${newDate.getUTCFullYear() - 2000} - ${newDate.getHours()} : ${newDate.getMinutes()} `;
}


export function registerUtil(register){
   const data = register[register.length-1]
  return 'hola'
}

export function statusTitle (status){
  if(status === "Close"){
return "TICKET CERRADO"
  }
  if(status === "Pending_Feedback"){
    return "ESPERANDO FEEDBACK DEL USUARIO"
  }
  if(status == "Cancel"){
    return "TICKET CANCELADO"
  }
  if(status === "Active"){
    return "ACTIVO"
  }
}