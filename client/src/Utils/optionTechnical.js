export const optionSelectTechnical = (allTechnical) => {
  let options = [];
  console.log(allTechnical);
  if (allTechnical[0]) {
    for (var i = 0; i < allTechnical.length; i++) {
      options.push({
        value: `${allTechnical[i]._id}`,
        label: `${allTechnical[i].name} ${allTechnical[i].last_name}`,
      });
    }
  }

  return options;
};
