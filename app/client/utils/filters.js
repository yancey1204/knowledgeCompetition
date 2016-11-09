import shortcutMap from '../services/shortcutMap.json';

function symbolFilter(text) {
  const textArray = text.split(' ');
  const returnArray = [];
  let tempText;

  textArray.forEach((aText) => {
    tempText = shortcutMap[aText] || aText;
    returnArray.push(tempText);
  });

  return returnArray.join(' ');
}

function identity(text) {
  return text;
}

export { symbolFilter, identity };
