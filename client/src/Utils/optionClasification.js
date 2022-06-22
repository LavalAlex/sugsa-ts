export const selectClasification = (allClasification) => {
    let options = [];
    if (allClasification[0]) {
      for (var i = 0; i < allClasification.length; i++) {
        options.push({
          value: allClasification[i],
          label: allClasification[i].toUpperCase(),
        });
      }
    }
    return options;
  };