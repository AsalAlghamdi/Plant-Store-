import React, {useContext} from 'react'
import { Context } from '../App';
import { Row, Col } from 'antd';
import { ShoppingCartOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';
import "antd/dist/antd.css";
import '../styles/header.scss'

export default function Header() {
    const { cart, setCart } = useContext(Context);
    return (
        <Row className="header">
            <Col span={12} className="logo">
                <img src='/images/logo.png' alt="logo" />
                Plant Store
            </Col>
            <Col span={12} className="nav">
                <div>
                    <Link to='/'>Plants</Link>
                    <Link to='/FAQ'>FAQ</Link>
                    <Link to="/cart" className="cart" ><ShoppingCartOutlined /><span className="cart-items-number">{cart.length}</span></Link>
                </div>
            </Col>
        </Row>
    )
}
