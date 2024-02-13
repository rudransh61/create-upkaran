// // app.js
// import { createState } from "../src/state.js";
// import { routes } from "../src/Route.js"; // Import routes
// import { render } from "../src/Upkaran.js";
// import {ListComponent} from "../src/Component/ListComponent.js";

// // Create reactive state
// const initialState = {
//     count: 0,
// };
// const state = createState(initialState);

// // Define components
// const Increment = () => {
//     state.setState({ count: state.getState().count + 1 });
//     console.log(state.getState().count);
// };

// const Decrement = () => {
//     state.setState({ count: state.getState().count - 1 });
//     console.log(state.getState().count);
// };

// export function App() {
//     return {
//         type: "div",
//         content: [
//             {
//                 type: 'button',
//                 onclick:`navigateTo('/contact)`,
//                 content : 'Contact'
//             },
//             {
//                 type: "p",
//                 id: "text",
//                 content: `Count: ${state.getState().count}`
//             },
//             {
//                 type: "button",
//                 content: "Increment",
//                 onclick: Increment
//             },
//             {
//                 type: "button",
//                 content: "Decrement",
//                 onclick: Decrement
//             },
//             ListComponent(state.getState().count)
//         ],
//     };
// }

// // Contact
// function Contact() {
//     return {
//         type: 'div',
//         content: 'Contact Page',
//     };
// }

// // Function to render based on route
// function renderRoute(route) {
//     const component = route.component();
//     render(document.getElementById('root'), component);
// }

// // Function to navigate to a specific route
// export function navigateTo(path) {
//     const route = routes.find(route => route.path === path);
//     if (route) {
//         window.history.pushState({}, '', path);
//         renderRoute(route);
//     } else {
//         console.error("Route not found:", path);
//     }
// }

// // Function to handle popstate event
// window.onpopstate = () => {
//     const path = window.location.pathname;
//     navigateTo(path);
// };

// // Initial render
// const initialPath = window.location.pathname;
// const initialRoute = routes.find(route => route.path === initialPath);
// if (initialRoute) {
//     renderRoute(initialRoute);
// } else {
//     console.error("Initial route not found:", initialPath);
// }

// app.js
import { createState } from "./state.js";
// import {ListComponent} from "./Component/ListComponent.js";

// Create reactive state
const initialState = {
    count: 0,
};
const state = createState(initialState);

// Define components
const Increment = () => {
    state.setState({ count: state.getState().count + 1 });
    console.log(state.getState().count);
};

const Decrement = () => {
    state.setState({ count: state.getState().count - 1 });
    console.log(state.getState().count);
};

export function App() {
    return {
        type: "div",
        content: [
            {
                type: "p",
                id: "text",
                content: `Count: ${state.getState().count}`
            },
            {
                type: "button",
                content: "Increment",
                onclick: Increment
            },
            {
                type: "button",
                content: "Decrement",
                onclick: Decrement
            },
            ListComponent(state.getState().count)
        ],
    };
}

// Component/ListComponent.js
// ListComponent.js
// import { renderListItem  } from "./RenderCount.js";
// Define a component for rendering a list
export function ListComponent(num) {
    // Function to render the list items
    const renderListItems = () => {
        const comp = [];
        for(let i=0;i<num;i++){
            comp.push(renderListItem());
        }
        return comp;
    };

    return {
        type: 'ul',
        content: renderListItems() // Render the list items dynamically
    };
}

// RenderCount.js

// Define a component to render the count dynamically
export function renderListItem() {
    return {
        type: 'li',
        content: 'HELO' // Function to dynamically render the count
    };
}