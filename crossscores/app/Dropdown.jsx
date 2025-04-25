import './Dropdown.css'
import Searchbar from './searchbar.jsx';

function Dropdown() {

    /*return(
        <div className="container">
            <input className="input" placeholder="Search your club, country, sport"/>

        </div>
    );*/

    return( 
        <div className='container'>
            <Searchbar/>
        </div>
    );

}

export default Dropdown