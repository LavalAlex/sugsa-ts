export const optionSelectTechnical = (allTechnical) => {
  let options = [];
  if (allTechnical[0]) {
    for (var i = 0; i < allTechnical.length; i++) {
      options.push({
        value: `${allTechnical[i]._id}`,
        label: `${allTechnical[i].name.toUpperCase()} ${allTechnical[i].last_name.toUpperCase()}`,
      });
    }
  }

  return options;
};
