import React, {useEffect} from "react";
import './App.css';
import { fromEvent,  } from 'rxjs'; 
import { map, buffer, debounceTime, filter } from 'rxjs/operators';

function App() {

  var button = document.getElementsByClassName('button')
  const mouse = fromEvent(button, 'click')
  
  const buff = mouse.pipe(
    debounceTime(300),
  );
  
  const click = mouse.pipe(
    buffer(buff),
    map(arr => {
      return arr.length;
    }),
    filter(x => x === 2),
  );
  
  click.subscribe(() => {
    setTimeOn(false)
  });


  const[timeStart, setTime] =  React.useState(0)
  const[timerOn, setTimeOn] = React.useState(false)

useEffect(()=>{
  let interval 

  if(timerOn){
    interval = setInterval(()=>{
      setTime(previousTime => previousTime + 10)
    },10)
  }else{
    clearInterval(interval)
  }
  return()=> clearInterval(interval)
}, [timerOn])


  return (
    <div className="App">
            <span>{("0" + Math.floor((timeStart / 60000) % 60))}:</span>
            <span>{("0" + Math.floor((timeStart / 1000) % 60))}:</span>
            <span>{("0" + Math.floor((timeStart / 10) % 100)).slice(-2)}</span>
      <div>
        {!timerOn && (
           <button onClick={()=>setTimeOn(true)}>Start</button>

        )}
         {timerOn && (
           <button onClick={()=>setTimeOn(false)}>Stop</button>

        )}
        <button className="button">Wait</button>
        <button onClick={()=>setTime(0)}>Reset</button>
      

      </div>
    </div>
  );
}

export default App;
