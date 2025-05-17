import Header from './Header.jsx'
import Welcome from './Welcome.jsx'
import Module from './Module.jsx'
import ApiTesting from './ApiTesting.jsx';
import Searchbar from './Searchbar.jsx';
import Dropdown from './Dropdown.jsx';
import TeamModule from './TeamModule.jsx';
import ModuleGrid from './ModuleGrid.jsx';

function App() {

  return(
    <div className="app-container">
      <Header/>
      <div className="workspace-container">
        
        <ModuleGrid/>
      </div>
      <Welcome/>
    </div>
  );

}

export default App