import Header from './Header.jsx'
import Welcome from './Welcome.jsx'
import Module from './Module.jsx'
import ApiTesting from './ApiTesting.jsx';
import Searchbar from './searchbar.jsx';

function App() {

  return(
    <div className="app-container">
      <Header/>
      <Welcome/>
      <Module/>
      <Searchbar/>
    </div>
  );

}

export default App