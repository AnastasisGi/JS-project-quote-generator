const quoteContainer = document.getElementById('quote-container');
const quoteText = document.getElementById('quote');
const quoteAutho = document.getElementById('author');
const twitterButton = document.getElementById('twitter');
const newQuoteBtn = document.getElementById('new-quote');
const loader = document.getElementById('loader');



// Loader
function loading (){
  loader.hidden = false;
  quoteContainer.hidden = true;
}
// Hide loading
function complete(){
  if (!loader.hidden) {
    quoteContainer.hidden=false;
    loader.hidden=true
  }
}

// Get quote from API
async function getQuote(){
  //Start loader
  loading();
  const proxyUrl='https://cors-anywhere.herokuapp.com/'
const apiUrl='http://api.forismatic.com/api/1.0/?method=getQuote&lang=en&format=json';
try{
    const response = await fetch(proxyUrl+apiUrl);
    const data = await response.json();
    if (data.quoteAuthor==='') {
quoteAutho.innerText='Unknown'
} else {
  quoteAutho.innerText = data.quoteAuthor

}
// reduce the fontsize to fit container
    if (data.quoteText.length>120) {
      quoteText.classList.add('long-quote')
    }else {
      quoteText.classList.remove('long-quote')
    }


    quoteText.innerText = data.quoteText;
    //Stop loader
    complete();
} catch (error){
  getQuote();
  }

}

function tweetQuote(){
  const quote=quoteText.innerText;
  const author=quoteAutho.innerText
  const twitterUrl = `https://twitter.com/intent/tweet?text=${quote} - ${author}`
  window.open(twitterUrl, '_blank')

}

// Add event listeners
newQuoteBtn.addEventListener('click',getQuote);
twitterButton.addEventListener('click',tweetQuote)


// On Load
getQuote();
