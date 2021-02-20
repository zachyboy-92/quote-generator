"use strict";

const btnSubmit = document.querySelector("#submit");
const options = document.querySelector("#quote__options");

const quoteOptions = ["quote", "advice", "jokes"];

const api = {
  quote: "https://api.quotable.io/random",
  advice: "https://api.adviceslip.com/advice",
  jokes: "https://official-joke-api.appspot.com/random_joke",
};

//Create random color generator
let color = "";
const randomColor = function () {
  let randomColorNum = Math.floor(Math.random() * 16777215).toString(16);
  color = `#${randomColorNum}`;
  return color;
};
console.log(randomColor());

//Generate random index to pick a quote
let randomQuoteNum = Math.floor(Math.random() * 3);
let randomQuote = api[quoteOptions[randomQuoteNum]];
console.log(randomQuote);

const getQuote = async function (quote) {
  if (!quote) return;
  const getUrl = await fetch(quote);
  const res = await getUrl.json();
  return res;
};

getQuote(randomQuote).then((quotes) => {});
