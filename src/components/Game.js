import React, { Component } from 'react'
import { calculateWinner } from '../helpers';
import Board from './Board'
import HintButton from './HintButton'


/* 
Классовый компонент или реакт-компонент Game, который наследует 
свойства и методы от React.Component
*/



class Game extends Component {
    constructor(props) {
        super(props);
        this.state = {
            history: [{
                squares: Array(9).fill(null),
            }],
            stepNumber: 0,
            xIsNext: true,
        };
    }

    /* создаем функцию-обработчик события нажатия на элемент*/

    handleClick(i) {
        const history = this.state.history.slice(0, this.state.stepNumber + 1); // константа history это все состояния поля после каждого хода, массив объектов
        const current = history[history.length - 1]; // current - это последний элемент игры - состояние массива squares после последнего хода, последний объект, который был добавлен в массив history
        const squares = current.squares.slice(); // с помощью slice() копируем массив squares, чтобы соблюсти иммутабельность
        console.log('squares', squares)
        if (calculateWinner(squares) || squares[i]) { // проверяем есть ли победитель или все клетки заполнены.
            return;
        }
        squares[i] = this.state.xIsNext ? 'X' : 'O';
        this.setState({
            history: history.concat([{   // метод concat() не изменяет оргинальный массив. создает новый и добавляет указанные элементы
              squares: squares,
            }]),
            stepNumber: history.length,
            xIsNext: !this.state.xIsNext,
          }); 
        }

    handleHintClick() {
      const history = this.state.history.slice(0, this.state.stepNumber + 1); // константа history это все состояния поля после каждого хода, массив объектов
      const current = history[history.length - 1]; // current - это последний элемент игры - состояние массива squares после последнего хода, последний объект, который был добавлен в массив history
      const squares = current.squares.slice(); // с помощью slice() копируем массив squares, чтобы соблюсти иммутабельность
      console.log('squaresHint', squares)
      for (let i = 0; i < squares.length; i++) {
        console.log('squaresHint[i]', squares[i])
      
        if (calculateWinner(squares) || squares[i]) { // проверяем есть ли победитель или все клетки заполнены.
            return;
        }
        if (squares[i] === null){
        squares[i] = this.state.xIsNext ? 'X' : 'O';
        this.setState({
            history: history.concat([{   // метод concat() не изменяет оргинальный массив. создает новый и добавляет указанные элементы
              squares: squares,
            }]),
            stepNumber: history.length,
            xIsNext: !this.state.xIsNext,
          }) 
        }}
        }

    



        jumpTo(step) {
          this.setState({
            stepNumber: step,
            xIsNext: (step % 2) === 0,
          })
        }
    
        render() {
          const history = this.state.history;
          const current = history[this.state.stepNumber];
          const winner = calculateWinner(current.squares);


          /* добавляем кнопки перехода к конкретному ходу
          для каждого хода создается элемент списка li, который содержит кнопку button */

          const moves = history.map((step, move) => {
            const desc = move ?
              `Go to move # ${move}` :
              `Start`;
            return (
              <li key={move}>
                <button onClick={() => this.jumpTo(move)}>{desc}</button>
              </li>
            );
          });
          
          let status;
          if (winner) {
            status = `Player ${winner} is WINNER!! 
                            Congratulations!`;
          } else {
            status = `Player ${this.state.xIsNext ? 'X' : 'O'} !   Your turn!`;
          }
    
          return (
            <div className="game">
              <div className="game-board">
              
              <br/>
                <Board 
                  squares={current.squares}
                  onClick={(i) => this.handleClick(i)}
                />
              </div>
              <div className="game-info">
                <div>{ status }</div>
                <HintButton
                  squares={current.squares}
                  onClick={() => this.handleHintClick() }
                />
                <ol>{ moves }</ol>
              </div>
            </div>
          );
        }
      }






export default Game