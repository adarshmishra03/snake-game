
function SnakeDot (props){
  let element = props.dots.map((dot,i) => {
    const style = {
      left: `${dot[0]}%`,
      top: `${dot[1]}%`
    }
    return (
      <div className="snake-dot" key={i} style={style}></div>
    )
  });
  return (
    <div>
      {element}
    </div>
  );
}

export default SnakeDot;
