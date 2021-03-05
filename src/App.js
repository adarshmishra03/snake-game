import React from 'react';
import SnakeDot from './SnakeDot';
import Food from './Food';

const getPosition = ()=> {
  let min = 1;
  let max = 98;
  let x = Math.floor((Math.random()*(max-min+1)+min)/2)*2;
  let y = Math.floor((Math.random()*(max-min+1)+min)/2)*2;
  return [x,y]
}

class App extends React.Component {
  constructor(props){
    super(props);
    this.state={
      snakeDots:[
        [0,0],
        [2,0]
      ],
      food:getPosition(),
      direction:'RIGHT',
      speed:300
    }
  }

  componentDidMount() {
    setInterval(this.movement, this.state.speed);
    document.onkeydown = this.onKeyDown;
  }

  componentDidUpdate() {
    this.checkCollapse();
    this.checkEatFood();
  }

  onKeyDown = (e) => {
    e = e || window.event;
    switch (e.keyCode) {
      case 38:
        this.setState({direction: 'UP'});
        break;
      case 40:
        this.setState({direction: 'DOWN'});
        break;
      case 37:
        this.setState({direction: 'LEFT'});
        break;
      case 39:
        this.setState({direction: 'RIGHT'});
        break;
    }
  }

  movement = () => {
    let dots = [...this.state.snakeDots];
    let head = dots[dots.length-1];

    switch (this.state.direction) {
      case 'UP':
        head=[head[0],head[1]-2];
        break;
      case 'DOWN':
        head=[head[0],head[1]+2];
        break;
      case 'LEFT':
        head=[head[0]-2,head[1]];
        break;
      case 'RIGHT':
        head=[head[0]+2,head[1]];
        break;
    }
    dots.shift();
    dots.push(head);
    this.setState({
      snakeDots:dots
    })
  }

  checkCollapse = () => {
    let dots = [...this.state.snakeDots];
    let head = dots[dots.length-1];
    if(head[0]<0 || head[1]<0 || head[0]>=100 || head[1]>=100){
      this.gameOver();
    }

    dots.pop();
    dots.forEach((dot) => {
      if(head[0]===dot[0] && head[1]===dot[1]){
        this.gameOver();
      }
    });
  }

  gameOver = () => {
    alert(`Game over. Snake length is ${this.state.snakeDots.length}`)
    this.setState({
      snakeDots:[
        [0,0],
        [2,0]
      ],
      food:getPosition(),
      direction:'RIGHT',
      speed:300
    })
  }

  checkEatFood = () => {
    let dots = [...this.state.snakeDots];
    let head = dots[dots.length-1];
    let food = this.state.food;
    if(head[0] === food[0] && head[1] === food[1] ){
      this.setState({
        food:getPosition(),
      });
      this.enlargeSnake();
    }
  }
  
  enlargeSnake = () => {
    let dots = [...this.state.snakeDots];
    dots.unshift([]);
    this.setState({
      snakeDots:dots
    })
    if (this.state.speed > 10) {
      this.setState({
        speed: this.state.speed - 10
      })
    }
  }

  render(){
    return (
      <div className="game">
        <SnakeDot dots={this.state.snakeDots} />
        <Food dot={this.state.food} />
      </div>
    );
  }
}

export default App;
