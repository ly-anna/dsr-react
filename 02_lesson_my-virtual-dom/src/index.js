/** @jsx h */

/*
 jsx pragma
Well, it actually tells Babel ‘hey, transpile that jsx but instead of React.createElement, put h’. 

jsx прагма, чтобы вместо React.createElement использовать функцию h.
Она говорит Babel транспилировать jsx код в чистый JS, чтобы браузер мог понять,
но вместо React.createElement используй функцию h.

Когда функция h будет запущена, то она вернет JS объекты - представление нашего 
Виртуального дома.

из этого:
const a = (
  h(‘ul’, { className: ‘list’ },
    h(‘li’, {}, ‘item 1’),
    h(‘li’, {}, ‘item 2’),
  );
);

делает вот это:
const a = (
  { type: ‘ul’, props: { className: ‘list’ }, children: [
    { type: ‘li’, props: {}, children: [‘item 1’] },
    { type: ‘li’, props: {}, children: [‘item 2’] }
  ] }
);
*/

function h(type, props, ...children) {
  return { type, props, children };
}

/* 
функция, которая создает элемент
*/
function createElement(node) {
  if (typeof node === "string") {
    return document.createTextNode(node);
  }
  const $el = document.createElement(node.type);
  node.children.map(createElement).forEach($el.appendChild.bind($el));
  return $el;
}

/* функция isChanged сравнивает узлы - отличаются они или нет
и возвращает либо true либо false
*/

function isChanged(node1, node2) {
  return (
    typeof node1 !== typeof node2 ||   //если типы узлов одинаковые, то вернет false и перейдет к следующему сравнению
    (typeof node1 === "string" && node1 !== node2) || // если тип 1 узла строка и в то же время узлы не одинаковые, то вернет true 
    node1.type !== node2.type           // если до этого в цепочке все сравнения возвращали false, то
  );                                   //сравнивает свойства type двух узлов и вернет либо true либо false
}

//определяем функцию. которая будет обновлять элемент
/* в качестве параметров функция принимает 
$parent - родительский элемент реального ДОМа
newNode - новый узел виртуального дома
oldNode - старый узел виртуального дома
и индекс, который по умолчанию равен 0
*/
function updateElement($parent, newNode, oldNode, index = 0) {
  if (!oldNode) {
    // если в старом доме нет oldNode узла, то добавляем новый узел newNode в ДОМ
    $parent.appendChild(createElement(newNode));
  } else if (!newNode) {
    // если в новом доме нет newNode узла, то удаляем дочерний элемент
    $parent.removeChild(
      $parent.childNodes[index] // index - это позиция узла в родительском элементе
    );
  } else if (isChanged(newNode, oldNode)) {
    // если узел изменился, то заменяем узел  узлом с индексом i
    // replaceChild Заменяет дочерний элемент на выбранный. Возвращает замененный элемент.  
     // MDN: replacedNode = parentNode.replaceChild(newChild, oldChild)
    
    $parent.replaceChild(createElement(newNode), $parent.childNodes[index]);
  } else if (newNode.type) {  // если у нового узла newNode есть свойство type
    const newLength = newNode.children.length; // длина массива дочерних элементов
    const oldLength = oldNode.children.length;
    for (let i = 0; i < newLength || i < oldLength; i++) {
    // рекурсивный вызов updateElement
      updateElement(
        $parent.childNodes[index],
        newNode.children[i],
        oldNode.children[i],
        i
      );
    }
  }
}

const initDOM = (
  <div>
    <p>Hello!</p>
    <ul>
      <li>How is it going?</li>
    </ul>
  </div>
);

const addNode = (
  <div>
    <p>Hello!</p>
    <ul>
      <li>How is it going?</li>
    </ul>
    <p>Good</p>
  </div>
);

const removeNode = (
  <div>
    <p>Hello!</p>
    <ul>
      <li>How is it going?</li>
    </ul>
  </div>
);

const changeNode = (
  <div>
    <p>Hi!</p>
    <ul>
      <li>How is it going?</li>
    </ul>
  </div>
);

const rootElement = document.getElementById("root");
rootElement.appendChild(createElement(initDOM));


const initNodeButton = document.createElement("button");
initNodeButton.innerText = "Init";
rootElement.appendChild(initNodeButton);

initNodeButton.addEventListener("click", () => {
  updateElement(rootElement, initDOM, changeNode);
});


const addNodeButton = document.createElement("button");
addNodeButton.innerText = "Add";
rootElement.appendChild(addNodeButton);

addNodeButton.addEventListener("click", () => {
  updateElement(rootElement, addNode, initDOM);
});


const removeNodeButton = document.createElement("button");
removeNodeButton.innerText = "Remove";
rootElement.appendChild(removeNodeButton);

removeNodeButton.addEventListener("click", () => {
  updateElement(rootElement, removeNode, addNode);
});


const changeNodeButton = document.createElement("button");
changeNodeButton.innerText = "Change";
rootElement.appendChild(changeNodeButton);

changeNodeButton.addEventListener("click", () => {
  updateElement(rootElement, changeNode, removeNode);
});
