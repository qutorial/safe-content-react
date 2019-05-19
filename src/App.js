import React from 'react';
import './App.css';
import HazardComponent from './HazardComponent';

function sanitizeMercator(s){
  
}

function App() {
  const hazard='<p onclick="alert(\'Hacked!\');">click me</p><ul><li>one</li></ul>Some of this text shall be <b>fat</b> and then on the <br> next line.<table><tr><td>and a little</td><td>table</td></tr></table>';
  return (
    <HazardComponent hazardWarning={hazard}></HazardComponent>
  );
}

export default App;
