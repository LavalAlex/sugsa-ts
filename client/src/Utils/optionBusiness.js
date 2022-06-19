export const optionSelect = (allBussines) => {
  let options = [];
  if (allBussines[0]) {
    for (var i = 0; i < allBussines.length; i++) {
      options.push({
        value: allBussines[i],
        label: allBussines[i].name.toUpperCase(),
      });
    }
  }
  return options;
};

export const selectDepartament = (allDepartament) => {
  let options = [];
  if (allDepartament[0]) {
    for (var i = 0; i < allDepartament.length; i++) {
      options.push({
        value: allDepartament[i],
        label: allDepartament[i].name.toUpperCase(),
      });
    }
  }
  return options;
};

export const selectDepartBusiness = (allDepartament, derparBusin) => {
  let options = [];
  if (allDepartament[0]) {
    for (var j = 0; j < derparBusin.length; j++) {
      allDepartament = allDepartament.filter((e) => e.name != derparBusin[j]);
    }
    for (var i = 0; i < allDepartament.length; i++) {
      options.push({
        value: allDepartament[i],
        label: allDepartament[i].name.toUpperCase(),
      });
    }
  }

  return options;
};
