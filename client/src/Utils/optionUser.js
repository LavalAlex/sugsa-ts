export const optionSelectUser = (user) => {
    let options = [];
    if (user[0]) {
      for (var i = 0; i < user.length; i++) {

        options.push({ value: `${user[i].name} ${user[i].last_name}`, label:`${user[i].name} ${user[i].last_name}`, id:i });
      }
    }
  
    return options;
  };
