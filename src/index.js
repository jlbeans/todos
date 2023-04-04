
import {add} from 'date-fns';
import './style.css';

function component() {
  const element = document.createElement('div');

  // Lodash, currently included via a script, is required for this line to work
  element.innerHTML = add(Date.now(), {days: 1});

  return element;
}

document.body.appendChild(component());