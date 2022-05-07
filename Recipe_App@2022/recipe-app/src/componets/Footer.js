import { Link } from 'react-router-dom';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
  import { faPhone} from '@fortawesome/free-solid-svg-icons'
  import { faEnvelope} from '@fortawesome/free-solid-svg-icons'

//styles & image
import './Footer.css';


function Footer() {
  return (
    <footer className='main-footer'>
       
            <div>
                <h4 className='footer-title'>StartCooking</h4>
            </div>
            <div className="row">
                    <div className="col">
                        <h5>CONTACT</h5>
                        <ul>
                            <li><FontAwesomeIcon icon={faPhone} style={{marginRight:14}}/>(206)-539-8113</li>
                            <li><FontAwesomeIcon icon={faEnvelope} style={{marginRight:14}}/>ydreambig21@gmail.com</li>
                            <li>2900 Century Park Blvd, 78727 Austin,TX</li>
                        </ul>
                    </div>
                    <div className="col second-col">
                            <h5>MENU</h5>
                            <ul className='footer-link'>
                                <li><Link to='/'>Home</Link></li>
                                <li><Link to='/login'>Login</Link></li>
                                <li><Link to='/signup'>Signup</Link></li>
                            </ul>
                    </div>
            </div>
            <hr />
            <div className='row'>
                    <p  className='col-sm'>
                        &copy;{new Date().getFullYear()} IdreamBig INC | All Rights Reserved | Terms of Service | Privacy
                    </p>
            </div>
    </footer>
  )
}

export default Footer