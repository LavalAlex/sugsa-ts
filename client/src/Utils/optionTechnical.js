export const optionSelectTechnical = (allTechnical) => {
    let options = [];
    if (allTechnical[0]) {
      for (var i = 0; i < allTechnical.length; i++) {

        options.push({ value: allTechnical[i].name, label:allTechnical[i].name });
      }
    }
  
    return options;
  };

