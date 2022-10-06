import { calcDaysUntil } from "../utils/days_until";

const google_sheets_url =
  "https://sheets.googleapis.com/v4/spreadsheets/13ROGhTaYSxWIT509hgRsn1MGKRIKaRR7D6Pyiyv5O5M/values/Sheet1?key=AIzaSyC2WDeyMkG_NaoKat8qiq-1NRX8xb-Cp3c";

async function loadData() {
  const response = await fetch(google_sheets_url);
  const data = await response.json();

  let result = [];
  let currentPerson = {};
  let currentCategory = {};
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
      };

      currentPerson = person;
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
      currentCategory.wishes.push(wish);
    }
  });

  result = result.sort((a, b) => {
    if (a.birthday === undefined) {
      return 1;
    }
    if (b.birthday === undefined) {
      return -1;
    }
    return calcDaysUntil(a.birthday) - calcDaysUntil(b.birthday);
  });

  return result;
}

export default loadData;
