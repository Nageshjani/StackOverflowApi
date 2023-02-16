import logo from './logo.svg';
import './App.css';
import 'bootstrap';
import MainListQuestions from './components/MainListQuestions';
import Loader from './components/Loader';
import BasicExample from './components/BasicExample';

import 'bootstrap/dist/css/bootstrap.min.css';


function App() {
  return (
    <div className="container mt-3">
        <MainListQuestions />
       
    </div>
  );
}

export default App;
