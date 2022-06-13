import React from 'react'; // ES6 js
import {Link} from 'react-router-dom';

function Nav() {
    return(
        <nav class="navbar navbar-expand-lg navbar-dark bg-dark top">
            <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navMainMenu" aria-controls="navMainMenu" aria-expanded="false" aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
            </button>
            <div id="navMainMenu" class="navbar-collapse collapse">
                <div class="navbar-nav ml-auto">
                    <Link to='/' className="nav-item nav-link active">Home</Link>
                    <Link to='/Parts' className="nav-item nav-link">Get List of Parts</Link>
                    <Link to='/SubmitPO' className="nav-item nav-link">Submit a Purchase Order</Link>
                    <Link to='/ListPO' className="nav-item nav-link">List a Purchase Order</Link>
                    <Link to='/ListLines' className="nav-item nav-link">List Lines of PO</Link>
                </div>
            </div>
        </nav>
    );
}

export default Nav;
