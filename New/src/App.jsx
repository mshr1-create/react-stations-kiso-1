import './App.css'
import  { Header }  from "./header.jsx";
import ThreadList from './ThreadList.jsx';
import ThreadCreate from './ThreadCreate.jsx';

const App = () => {

 
  return (
  <div>
    <Header/>
    <ThreadCreate/>
    <ThreadList/>
  </div>
  
  )
};

export default App;
