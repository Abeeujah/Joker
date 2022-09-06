// DOM
const containerElement = document.getElementById('container');
const buttonElement = document.getElementById('button');
const audioElement = document.getElementById('audio');

// VoiceRSS API
const voiceRSSApiKey = '61a5727b49f546ff84b08eccf42f3533';

// Tell Me a Joke
function tellMeAJoke(joke) {
    VoiceRSS.speech({
        key: `${voiceRSSApiKey}`,
        src: joke,
        hl: 'en-us',
        v: 'Linda',
        r: 0, 
        c: 'mp3',
        f: '44khz_16bit_stereo',
        ssml: false
    });
}

// Get Jokes from Joke Api using Fetch API
async function getJokes() {
    buttonElement.disabled = true;
    const jokeApiUrl = 'https://v2.jokeapi.dev/joke/Programming?blacklistFlags=nsfw,religious,political,racist,sexist,explicit';
    let joke = '';
    try {
        const response = await fetch(jokeApiUrl);
        const data = await response.json();
        if (data.setup) {
            joke = `${data.setup} ${data.delivery}`;
        }   else {
            joke = data.joke;
        }
        tellMeAJoke(joke);
    } catch (error) {
        console.log('Joke Fetch Error', error);
    }
}

// Event Listeners
buttonElement.addEventListener('click', () => {
    getJokes();
});

audioElement.addEventListener('ended', () => {
    buttonElement.disabled = false;
})