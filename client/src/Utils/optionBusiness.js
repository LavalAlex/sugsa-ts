export const optionSelect = (allBussines) => {
    let options = [];
    if (allBussines[0]) {
      for (var i = 0; i < allBussines.length; i++) {

        options.push({ value: allBussines[i].name, label:allBussines[i].name });
      }
    }
  
    return options;
  };

  export const selectDepartament= (allDepartament)=>{
   
    let options = [];
    if (allDepartament[0]) {
      for (var i = 0; i < allDepartament.length; i++) {

        options.push({ value: allDepartament[i], label:allDepartament[i] });
      }
    }
  
    return options;
  };
  