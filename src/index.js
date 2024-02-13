// index.js

import { render } from './Upkaran.js';
import { App } from './App.js';
import { handleRouteChange } from './Route.js'; // Import the route handling function

// Get the root element
const rootElement = document.getElementById('root');

// Initial rendering
render(rootElement, App());

// Listen for route changes
// window.addEventListener('popstate', handleRouteChange);

//Repeat Render
function RepeatRender (){
    render(rootElement, App());
    // handleRouteChange();
}

//Repeat it
setInterval(RepeatRender, 300);

 
