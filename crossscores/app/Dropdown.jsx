import './Dropdown/Dropdown.css'
import Searchbar from './Searchbar.jsx';

function Dropdown() {

    /*return(
        <div className="container">
            <input className="input" placeholder="Search your club, country, sport"/>

        </div>
    );*/

    return(
        <div className='container'>
            <div className='module-container'>
                <Searchbar/>
            </div>
        </div>
    );

}

export default Dropdown