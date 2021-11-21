import React from 'react'
import { Row, Col } from 'antd';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEnvelope, faHeart, faPhoneAlt } from '@fortawesome/free-solid-svg-icons'
import '../styles/footer.scss';

export default function Footer() {
    return (
        <footer>
            <div className="main">
                <Row style={{ justifyContent: 'center' }}>
                    <Col span={22} xxl={23}>
                        <Row style={{ justifyContent: 'center', alignItems: 'center' }}>
                            <Col span={24} md={12}>
                                <div className="logo">
                                    <img src='/images/logo-dark.png' alt="logo" />
                                    Plant Store
                                </div>
                                <div>
                                    Plant Store, where you find beauty and green. <br /> We always provide the best
                                </div>
                            </Col>
                            <Col span={24} md={12} style={{ display: 'flex', justifyContent: 'flex-end' }}>
                                <address style={{ margin: 0 }}>
                                    {/* Developed with <FontAwesomeIcon icon={faHeart} className="text-red" /> by <a href="https://asalalghamdi.com/">Asal Alghamdi</a>.<br /> */}
                                    <FontAwesomeIcon icon={faPhoneAlt} />: +12 00 000 0000 <br />
                                    <FontAwesomeIcon icon={faEnvelope} />: support@plantsstore.com <br />
                                    Jeddah, Makkah<br />
                                    Saudi Arabia
                                </address>
                            </Col>
                        </Row>
                    </Col>
                </Row>
            </div>
            <div className="copyrights">
                <p style={{ margin: 0 }}>Copyrights © 2021 All Rights Reserved by Plant Store.</p>
                <div><a href="javascript:void(0)">Terms of Use</a> / <a href="javascript:void(0)" >Privacy Policy</a></div>
            </div>
        </footer>
    )
}
