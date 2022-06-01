const count = (qty = 1000) => {
  const dataRandom = [];
  for(let i = 0; i < qty; i++) {
    dataRandom.push(Math.floor(Math.random() * 1000) + 1);
  }
  const dataRepeat = [];
  const dataObject = {};
  for (let i = 0; i < dataRandom.length; i++) {
    const elem = dataRandom[i];
    if(!dataRepeat.includes(elem)) {
      dataRepeat.push(elem);
      dataObject[`${elem}`] = 1;
    } else dataObject[`${elem}`]++;
  }
  return dataObject;
};

process.on("message", (data) => { // recibe la data
  let num;
  if(isNaN(data)) num = undefined;
  else num = data;
  process.send(count(num)); // envia la data
});

module.exports = {count}