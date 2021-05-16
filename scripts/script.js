// script.js

import { router } from './router.js'; // Router imported so you can use it to manipulate your SPA app here
const setState = router.setState;

// Make sure you register your service worker here too

document.addEventListener('DOMContentLoaded', () => {
  let count = 0; // grab entry number with counter
  fetch('https://cse110lab6.herokuapp.com/entries')
    .then(response => response.json())
    .then(entries => {
      entries.forEach(entry => {
        count++;
        let newPost = document.createElement('journal-entry');
        newPost.entry = entry;
        const entryNum = count;

        // set state to individual entry when clicked
        newPost.onclick = function() {
            history.pushState(null, '', '#entry' + entryNum); 
            setState({url: "/#entry", entry: entry, num: entryNum});
        }

        document.querySelector('main').appendChild(newPost);
      });
    });
});

var home = document.getElementsByTagName('h1')[0];
home.onclick = function() {
    console.log('header clicked');
    history.pushState({url: "/"}, '', location.origin);
    setState({url: "/"});
};

var settings = document.getElementsByTagName('img')[0];
settings.onclick =  function() {
    console.log('settings clicked');
    history.pushState({url: "/#settings"}, '', '#settings');
    setState({url: "/#settings"});
}

// fires when back button is pressed 
// window.addEventListener('popstate', (e) => {
//     setState(e.state);
// });

window.addEventListener('popstate', (e) => {
    setState("/" + e.target.location.hash);
});
