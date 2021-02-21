"use strict";

const body = document.querySelector("body");
const btnSubmit = document.querySelector("#generate");
const options = document.querySelector("#quote__options");
const quoteConainer = document.querySelector(".quote__container");
const quote = document.querySelector(".quote");
const quotesChild = document.querySelector(".quotes__child");

const quoteOptions = ["general", "advice", "jokes"];

const api = {
  general: "https://api.quotable.io/random",
  advice: "https://api.adviceslip.com/advice",
  jokes: "https://official-joke-api.appspot.com/random_joke",
};

// fetch("https://official-joke-api.appspot.com/random_joke")
//   .then((res) => res.json())
//   .then((data) => console.log(data));

//Create random color generator
let color = "";
const randomColor = function () {
  let randomColorNum = Math.floor(Math.random() * 16777215).toString(16);
  color = `#${randomColorNum}`;
  return (quoteConainer.style.backgroundColor = color);
};

//API fetcher
async function apiFetcher(api) {
  try {
    const getApi = await fetch(api);
    const res = await getApi.json();
    return res;
  } catch (err) {
    console.error(err);
  }
}

// apiFetcher(api.jokes).then((res) => res);

//Generate General Quote
const generalQuote = function () {
  apiFetcher(api.general).then((res) => {
    randomColor();
    quote.textContent = res.content;
    quotesChild.textContent = res.author;
  });
};

//Generate Advice
const adviceQuote = function () {
  apiFetcher(api.advice).then((res) => {
    randomColor();
    quote.textContent = res.slip.advice;
    quotesChild.textContent = "";
  });
};

//Generate jokes
const jokesQuote = function () {
  apiFetcher(api.jokes).then((res) => {
    randomColor();
    quote.textContent = res.setup;
    setTimeout(() => (quotesChild.textContent = res.punchline), 3000);
  });
};

//clear container
const clear = function () {
  quote.textContent = "";
  quotesChild.textContent = "";
};

//Generate random index to pick a quote
const quoteArray = ["generalQuote", "adviceQuote", "jokesQuote"];
let randomQuoteNum = Math.floor(Math.random() * 3);
let randomQuote = quoteArray[randomQuoteNum];

const generateQuote = function (quote) {
  if (quote === "generalQuote") {
    generalQuote();
  }
  if (quote === "adviceQuote") {
    adviceQuote();
  }
  if (quote === "jokesQuote") {
    jokesQuote();
  }
};

btnSubmit.addEventListener("click", function () {
  clear();
  generateQuote(randomQuote);
});
