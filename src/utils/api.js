/* global process */
const google_sheets_url = `https://sheets.googleapis.com/v4/spreadsheets/13ROGhTaYSxWIT509hgRsn1MGKRIKaRR7D6Pyiyv5O5M/values/Sheet1?key=${process.env.REACT_APP_GOOGLE_SHEETS_API_KEY}`;

export const loadData = async () => {
  const response = await fetch(google_sheets_url);
  const data = await response.json();

  let result = [];
  let currentPerson = {};
  let currentCategory = null;
  let skipRest = false;

  data.values.forEach((row) => {
    const [title, url, image] = row;

    if (title === undefined || skipRest) {
      skipRest = true;
      return;
    }

    if (title.match(/^##/)) {
      const person = {
        name: title.replace(/^## /, ""),
        categories: [],
        birthday: url,
        details: [],
      };

      currentPerson = person;
      currentCategory = null;
      result.push(person);
    } else if (title.match(/^--/)) {
      const category = {
        title: title.replace(/^-- /, ""),
        wishes: [],
      };

      currentCategory = category;
      currentPerson.categories.push(category);
    } else {
      const wish = { title, url, image };

      if (currentCategory == null) {
        currentPerson.details.push(title);
      } else {
        currentCategory.wishes.push(wish);
      }
    }
  });

  return result;
};
