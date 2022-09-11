import { Link } from 'react-router-dom';
import tigoBusiness from './../../Assets/images/tigo-business-logo.png';
import goodTry from './../../Assets/images/good-try.png';

const Loser = () => {
    return(
        <div id="loser-page" className="content-page">
            <div>
                <div id="thanks-message">
                    <img src={goodTry} alt="Gracias por participar" />
                </div>
                <div id="btn-content">
                    <Link to={`${process.env.REACT_APP_BASE_URL}/`} className="blue-btn">Nuevo Registro</Link>
                </div>
            </div>
            <div id="footer-form">
                <img src={tigoBusiness} width="200px" alt="Tigo Business" />
            </div>
        </div>
    );
}

export default Loser;