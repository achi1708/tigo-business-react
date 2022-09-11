import { Link } from 'react-router-dom';
import tigoBusiness from './../../Assets/images/tigo-business-logo.png';
import congrats from './../../Assets/images/congrats.png';
import winnerMessage from './../../Assets/images/winner-message.png';

const Winner = () => {
    return(
        <div id="winner-page" className="content-page">
            <div id="decoration" className="full-width"></div>
            <div>
                <div id="congrats">
                    <img src={congrats} alt="Felicitaciones" />
                </div>
                <div id="winner-message">
                    <img src={winnerMessage} alt="Eres el ganador del gran premio" /><br/>
                    <Link to={`${process.env.REACT_APP_BASE_URL}/`} className="blue-btn">Nuevo Registro</Link>
                </div>
            </div>
            <div id="footer-form">
                <img src={tigoBusiness} width="200px" alt="Tigo Business" />
            </div>
        </div>
    );
}

export default Winner;