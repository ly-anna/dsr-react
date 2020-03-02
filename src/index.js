import React from 'react' 
import ReactDOM from 'react-dom'
import App from './App'
import './index.css';

/* 
ReactDom - библиотека, ответственная за то, чтобы вносить данные в html
render - метод ReactDOM, с помощью которого происходит инъекция какого-либо компонента реакта в html
в данном случае <App/>
render метод принимает два параметра:
1 - указываем какой компонент мы хотим занести в html - это <App/>
2 - указываем корневой блок, куда будет вставлен этот компонент - 
в данном случае это тег div c id='root' - единственный тег, который указан в <body> в файле index.html
*/

ReactDOM.render(<App/>, document.getElementById('root'))