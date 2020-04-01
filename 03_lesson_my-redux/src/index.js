// const createStore = (reducer, initialState) => ({});

const createStore = (rootReducer, initialState) => {
  let state = rootReducer(initialState, { type: '__INIT__' })
  let listeners = [];

  const getState = () => state;

  const dispatch = action => {
    state = rootReducer(state, action);
    listeners.forEach(listener => listener(state));
    console.log('listeners from dispatch', listeners)

  };

  const subscribe = listener => {
    listeners.push(listener);
    // return () => {
    //   listeners = listeners.filter(el => el !== listener);
    // };
    console.log('listeners from sub', listeners)
    return listeners 
  };

  const unsubscribe = listener => {
    return () => {
      listeners = listeners.filter(el => el !== listener)
      console.log('listeners from UNsub', listeners)
    }
  }

  dispatch({});

  return { getState, dispatch, subscribe, unsubscribe };
};

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
  renderState();

};

window.decrement = () => {
  store.dispatch({ type: "DECREMENT" });
  renderState();
};


// view
const state =
"<div><h5 class='card-title' id='state'></h5></div>";

const buttonIncrement =
  "<div class='card-title'><button class='btn btn-primary' onclick='increment()'>INCREMENT</button></div>";
const buttonDecrement =
  "<div class='card-title'><button class='btn btn-primary' onclick='decrement()'>DECREMENT</button></div>";


// first component
const buttonSubscribe =
  "<div class='card-title'><button class='btn btn-success' onclick='subscribe()'>SUBSCRIBE</button></div>";
const buttonUnsubscribe =
  "<div class='card-title'><button class='btn btn-danger' onclick='unsubscribe()'>UNSUBSCRIBE</button></div>";
const result =
"<div><h5 class='card-title' id='result'></h5></div>";

// second component
const buttonSubscribe2 =
  "<div class='card-title'><button class='btn btn-success' onclick='subscribe2()'>SUBSCRIBE2</button></div>";
const buttonUnsubscribe2 =
  "<div class='card-title'><button class='btn btn-danger' onclick='unsubscribe2()'>UNSUBSCRIBE2</button></div>";
const result2 =
"<div><h5 class='card-title' id='result2'></h5></div>";




const render = () => {
  document.getElementById("root").innerHTML =
    buttonIncrement + buttonDecrement + "<br/>" + 'Component 1:' + result + buttonSubscribe + buttonUnsubscribe;
    document.getElementById("result").innerHTML = store.getState();
};

const render2 = () => {
  document.getElementById("root2").innerHTML =
    "<br/>" + 'Component 2:' + result2 + buttonSubscribe2 + buttonUnsubscribe2;
    document.getElementById("result2").innerHTML = store.getState();
};

const renderState = () => {
  document.getElementById("rootstate").innerHTML =
    'Current State of Store:' + state;
    document.getElementById("state").innerHTML = store.getState();
};

//у стора вызываем метод subscribe, в который передается колбэк функция render
window.subscribe = () => store.subscribe(render);
window.subscribe2 = () => store.subscribe(render2);
window.unsubscribe = store.unsubscribe(render);
window.unsubscribe2 = store.unsubscribe(render2);

render();
render2();
renderState()

// window.subscribe = store.subscribe(render);
// по умолчанию подписка оформлена