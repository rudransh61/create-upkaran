// router.js
import { render } from './Upkaran.js';
import { App } from './App.js';
import { NotFound } from './404.js';

const routes = {
    '/app': 'App',
    '/about': 'About',
    '/contact': 'Contact',
    '404': '404', // Default route for 404 errors
};

export function handleRouteChange() {
    console.log('handleRouteChange working...');
    const path = window.location.pathname;
    const component = routes[path] || routes['404']; // Check if route exists, otherwise use 404 route
    renderComponent(component);
    // handleRouteChange();
}

function renderComponent(componentName) {
    // Import components dynamically based on component name
    import(`../src/${componentName}.js`)
        .then(module => {
            const {Component} = module; // idk
            render(document.getElementById('root'), Component());
            // handleRouteChange();
        })
        .catch(error => {
            console.error('Error loading component:', error);
            // If there's an error loading the component, render the NotFound component
            render(document.getElementById('root'), NotFound());
            // handleRouteChange();
        });
}

window.onpopstate = handleRouteChange;


// About.js
export function About() {
    return {
        type: 'div',
        content: 'About Page Content',
    };
}


// Contact.js
export function Contact() {
    return {
        type: 'div',
        content: 'Contact Page Content',
    };
}
