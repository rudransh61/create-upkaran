// Upkaran.js
// import { App } from "./App.js";
import { createState } from "../src/state.js";
import * as Route from "../src/Route.js";

// Render function with reactive state management
export function render(rootElement, component) {
    // Check if component is an array, if not, convert it into an array with a single element
    const components = Array.isArray(component) ? component : [component];

    // Function to update the DOM
    function update() {
        rootElement.innerHTML = ''; // Clear previous content
        components.forEach(component => {
            // Create new DOM element
            const newElement = document.createElement(component.type);

            // Set attributes
            if (component.attr) {
                for (const attr in component.attr) {
                    newElement.setAttribute(attr, component.attr[attr]);
                }
            }

            // Set content
            if (component.content) {
                if (typeof component.content === 'string') {
                    newElement.textContent = component.content;
                } else if (typeof component.content === 'function') {
                    // Pass state to content function and render its result
                    render(newElement, component.content());
                } else {
                    // Render nested components
                    render(newElement, component.content);
                }
            }

            // Set other properties
            if ((component.onClick && typeof component.onClick === 'function') ||(component.onclick && typeof component.onclick === 'function')) {
                if(component.onClick){
                    newElement.addEventListener('click', component.onClick);
                }
                else{
                    newElement.addEventListener('click', component.onclick);
                }
            }

            //Set className and id attributes
            if(component.className && typeof component.className === 'string'){
                newElement.className = component.className
            }
            if(component.id && typeof component.id === 'string'){
                newElement.id = component.id
            }

            // Append new element to root element
            rootElement.appendChild(newElement);
        });
    }

    // Initial render
    update();

    // Subscribe to state changes and re-render
    if (component.state) {
        component.state.subscribe(update);
    }
}
