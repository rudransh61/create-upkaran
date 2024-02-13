// Define a reactive state
export function createState(initialState) {
    let state = initialState;
    const listeners = new Set();

    function getState() {
        return state;
    }

    function setState(newState) {
        state = { ...state, ...newState };
        // Notify all listeners
        listeners.forEach(listener => listener(state));
        // render(document.getElementById('root'),App())
    }

    function subscribe(listener) {
        listeners.add(listener);
        // Return a function to unsubscribe
        return () => {
            listeners.delete(listener);
        };
    }

    return { getState, setState, subscribe };
}