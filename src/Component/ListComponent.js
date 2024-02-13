// ListComponent.js
import { renderListItem  } from "./RenderCount.js";
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
