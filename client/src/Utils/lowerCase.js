export const lowerCaseString = (name) => {
    name = name.split(' ')
    var acum = ""
    for(var i=0; i< name.length; i++){
        if(i === name.length-1){
            acum = acum +  name[i][0].toUpperCase() + name[i].slice(1, name[i].length) 
        }else{
            acum = acum +  name[i][0].toUpperCase() + name[i].slice(1, name[i].length) + " " 
        }
    }
    return(acum)
   

//   if (name && last_name) {
//     name = name[0].toUpperCase() + name.slice(1, name.length);
//     last_name =
//       last_name[0].toUpperCase() + last_name.slice(1, last_name.length);
//     return { name, last_name };
//   }
//   if (name) {
//     name = name[0].toUpperCase() + name.slice(1, name.length);
//     return { name };
//   }

//   if (last_name) {
//     last_name =
//       last_name[0].toUpperCase() + last_name.slice(1, last_name.length);
//     return { last_name };
//   }
};
