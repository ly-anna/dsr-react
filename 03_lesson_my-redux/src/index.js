const createStore = (reducer, initialState) => ({});

// reducer
const reducer = (state, action) => {
  switch (action.type) {
    case "INCREMENT":
      return state + 1;
    case "DECREMENT":
      return state - 1;
    default:
      return state;
  }
};
// reducer

const store = createStore(reducer, 0);

window.increment = () => {
  store.dispatch({ type: "INCREMENT" });
};

window.decrement = () => {
  store.dispatch({ type: "DECREMENT" });
};

// first component
const buttonIncrement =
  "<div><button onclick='increment()'>INCREMENT</button></div>";
const buttonDecrement =
  "<div><button onclick='decrement()'>DECREMENT</button></div>";
const buttonUnsubscribe =
  "<div><button onclick='unsubscribe()'>UNSUBSCRIBE</button></div>";

const result = "<div id='result'></div>";

const render = () => {
  document.getElementById("root").innerHTML =
    result + buttonIncrement + buttonDecrement + buttonUnsubscribe;
  document.getElementById("result").innerHTML = store.getState();
};

// second component
const result2 = "<div id='result2'></div>";
const buttonUnsubscribe2 =
  "<div><button onclick='unsubscribe2()'>UNSUBSCRIBE</button></div>";
const render2 = () => {
  document.getElementById("root2").innerHTML =
    "<br/>" + result2 + buttonUnsubscribe2;
  document.getElementById("result2").innerHTML = store.getState();
};

window.unsubscribe = store.subscribe(render);
window.unsubscribe2 = store.subscribe(render2);
render();
render2();
