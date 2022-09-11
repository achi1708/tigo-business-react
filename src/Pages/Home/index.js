import { Link } from 'react-router-dom';
import HomeTitle from './../../Assets/images/home-title.png';

const Home = () => {
    return(
        <div id="home-page" className="content-page">
            <div className="full-width" id="home-title">
                <img src={HomeTitle} alt="Un paso adelante del futuro" />
            </div>
            <div className="full-width" id="call-to-action">
                <h3 id="regular-message">!Descubre si eres el</h3>
                <h3 id="bold-message">afortunado ganador<br/>de este gran premio!</h3>
                <Link to="signup" className="blue-btn">Quiero participar</Link>
            </div>
        </div>
    );
}

export default Home;