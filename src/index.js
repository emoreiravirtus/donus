import { users, companies } from "./data.js";

let cutAge = 64;
let fUsers = users.map((u) => {
  let s = u.userData.split(";");

  let o = {};

  for (let i in s) {
    let key = s[i].split("=");
    o[key[0]] = key[1];
  }

  o.age = Number(o.age);
  o.reward === "true" ? (o.reward = true) : (o.reward = false);

  return o;
});

export const getBestCreditCompany = (customerName) => {
  const user = fUsers.find(u => u.name == customerName);

  let key;

  if (user.age >= cutAge && user.reward) key = "priceRewardElderly";
  if (user.age >= cutAge && !user.reward) key = "priceElderly";
  if (user.age <= cutAge && user.reward) key = "priceReward";
  if (user.age <= cutAge && !user.reward) key = "price";

  let result = companies[0].name;
  let smallest = companies[0][key];

  for (let i in companies) {
    let quotation = companies[i][key];

    if (quotation < smallest) {
      smallest = quotation;
      result = companies[i].name;
    }
  }

  return result;
};

getBestCreditCompany("Carlos Silva");
