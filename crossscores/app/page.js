import Header from './Header.jsx'
import Welcome from './Welcome.jsx'
import Module from './Module.jsx'
import ApiTesting from './ApiTesting.jsx';

function App() {

  return(
    <div className="app-container">
      <Header/>
      <Welcome/>
      <Module/>
      <ApiTesting/>
    </div>
  );

}

export default App