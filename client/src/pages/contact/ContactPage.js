import Map from "../../components/maps/Map";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelope, faPhone, faLocationDot } from "@fortawesome/free-solid-svg-icons";


const ContactPage = () => {


    return (
        <>
            <div className="main-wrapper">
                <div className="wrapper contact-wrapper__container">
                    <div className="contact__header">
                        <div className="contact__title">Contact Us</div>
                        <div className="contact__description">
                            Any questions or remarks? Just write us a message or e-mail us at{" "}
                            <a
                                href="mailto:gamesworld@gmail.com"
                                className="contact-form__description-link"
                            >
                                gamesworld@gmail.com
                            </a>
                            <br />
                            and we will get back to you promptly regarding your request.
                        </div>
                    </div>
                    <div className="contact__wrapper">
                        <div>
                            <Map />
                        </div>
                        <div className="contact__info">
                            <div className="contact__info-item">
                                <a
                                    className="contact__info-link link"
                                    href="mailto:gamesworld@gmail.com"
                                >
                                    <div className="contact__info-circle">
                                        <FontAwesomeIcon icon={faEnvelope} className="contact__img contact__img-nav" />
                                    </div>
                                    <div className="contact__info-text">gamesworld@gmail.com</div>
                                </a>
                            </div>
                            <div className="contact__info-item">
                                <a className="contact__info-link link" href="tel:359-555-754-777">
                                    <div className="contact__info-circle">
                                        <FontAwesomeIcon icon={faPhone} className="contact__img contact__img-nav" />
                                    </div>
                                    <div className="contact__info-text">+359 555 754 777</div>
                                </a>
                            </div>
                            <div className="contact__info-item">
                                <div className="contact__info-circle">
                                    <FontAwesomeIcon icon={faLocationDot} className="contact__img contact__img-nav" />
                                </div>
                                <div className="contact__info-text">
                                    bul.Bulgaria 100, 1330 Sofia, Bulgaria
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>

    );
}

export default ContactPage;