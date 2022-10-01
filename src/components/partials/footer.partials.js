import { Container, Row, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';

/* Components */
const instagram = "./../img/ig.png";
const youtube = "./../img/yt.png";
const telegram = "./../img/tele.png";
const email = "./../img/mail.png";

function Footer(){
    return(
        <Container fluid className="bg-primary mt-5 text-white">
            <Row className='footers'>
                <Col md={4}>
                  <h4 className="mb-3">Lets Rental</h4>
                  <p>
                  Lets Rental adalah platform untuk penyewaan kendaraan roda 4 (mobil), dengan bertujuan untuk memudahkan anda dalam berkeliling kota baik didalam maupun melintasi dunia
                  </p>
                  <p>
                  Kami memiliki banyak koleksi mobil dari harga terjangkau hingga ekslusive sesuai dengan kebutuhan anda. Lets Rental!!
                  </p>
                </Col>
                <Col md={4}>
                  <h4 className="mb-3">Type Car</h4>
                  <ul type="disc">
                    <li>Honda</li>
                    <li>Toyota</li>
                    <li>Mitsubishi</li>
                    <li>BMW</li>
                  </ul>
                </Col>
                <Col md={4}>
                  <h4 className="mb-3">Contact Us</h4>
                  <p>Jl. Suka Maju Blok O No 28, Billford, Rock Island, Newland</p>
                  <p>021-12345678</p>
                  
                  <Row style={{paddingLeft: "8px"}}>
                    <Col className="col-auto me-3 medsos"><img src={instagram} alt="Instagram"/></Col>
                    <Col className="col-auto me-3 medsos"><img src={telegram} alt="Telegram"/></Col>
                    <Col className="col-auto me-3 medsos"><img src={youtube} alt="Youtube"/></Col>
                    <Col className="col-auto me-3 medsos"><img src={email} alt="Email"/></Col>
                  </Row>
                </Col>
            </Row>
        </Container>
    )
}
export default Footer;