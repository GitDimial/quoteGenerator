const quoteContainer = document.getElementById('quote-container');
const quoteText = document.getElementById('quote');
const authorText = document.getElementById('author');
const twitterBtn = document.getElementById('twitter');
const newQuoteBtn = document.getElementById('new-quote');
let randomQuote = 0;
//Get Quotes function here
async function getQuote(){
    const quoteUrl = 'https://gitdimial.github.io/quoteGenerator/data/quotes.json';
    randomQuote = Math.floor(Math.random() * 8000);
    try{
        const response = await fetch(quoteUrl);
        const data = await response.json();

        //Long quote. Reduce it font size
        if(data[randomQuote].text.length > 120){
            quoteText.classList.add('long-quote');
        }else{
            quoteText.classList.remove('long-quote');
        }
        quoteText.innerText = data[randomQuote].text;

        //If author is blank and unknown -we use this block
        if(data[randomQuote].author === ''){
            authorText.innerText = 'Unknown';
        }else{
            authorText.innerText = data[randomQuote].author;
        }
    }catch(err){
        console.log('Nice, you have an error: ' + err);
    }
}

//Twitter quote function
function tweetQuote(){
    const quote = quoteText.innerText;
    const author = authorText.innerText ;
    const twitterUrl = `https://twitter.com/intent/tweet?text=${quote} - ${author}`;
    window.open(twitterUrl, '_blank');
}

//Event listeners
newQuoteBtn.addEventListener('click', getQuote);
twitterBtn.addEventListener('click',tweetQuote);