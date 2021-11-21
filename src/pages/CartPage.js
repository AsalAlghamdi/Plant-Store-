import { Col, Row } from 'antd';
import React, { useContext, useEffect } from 'react'
import { Fragment } from 'react'
import { Context } from '../App';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrashAlt } from '@fortawesome/free-solid-svg-icons'
import axios from 'axios';
import { useState } from 'react/cjs/react.development';
import '../styles/cartPage.scss'
import { Input } from 'antd';
import { useForm } from "react-hook-form";

export default function CartPage(props) {
    const { register, handleSubmit } = useForm();

    // const cart = useContext(Context)
    const { cart, setCart } = useContext(Context);

    const [items, setItems] = useState([])
    const [checkData, setCheckData] = useState(false)

    const [discount, setDiscount] = useState(0)
    const [subtotal, setSubtotal] = useState(0)
    const [vat, setVat] = useState(0)
    const [tottal, setTottal] = useState(0)

    const [coupon, setCoupon] = useState(0)

    const deleteFromCart = (id) => {
        props.updateCart(cart.filter(cartId => cartId != id))
        
        // setCart(cart.filter(cartId => cartId != id));
        setItems(items.filter(item => item.id != id));
    }

    useEffect(() => {
        if (cart.length > 0) {
            let apiUrl = 'http://' + window.location.hostname + ':8000/getPlantsDetail'
            axios.get(apiUrl)
                .then(function (response) {
                    let items = []
                    for (let itemID in cart) {
                        items.push(response.data.find(data => data.id == cart[itemID]));
                    }
                    setItems(items);
                })
                .catch(function (error) {
                    console.log(error);
                });
        }
    }, []);

    const summations = () => {
        let sum = 0;
        items.forEach(item => {
            sum += (item.price - (item.discount * item.price / 100))
        });

        setDiscount(sum * coupon / 100);
        sum = sum - (sum * coupon / 100);

        setSubtotal(sum.toFixed(2));
        let vatSum = sum * 15 / 100;
        setVat(vatSum.toFixed(2));
        setTottal((vatSum + sum).toFixed(2));
    }

    useEffect(() => {
        if (Object.keys(items).length) {
            setCheckData(true)
            summations()
        }
    }, [items]);

    useEffect(() => {
        summations()
    }, [coupon]);

    const checkCoupon = (data) => {
        let { coupon } = data;
        coupon = (coupon.replace(/\s/g, '')).toLowerCase(); // make it lowercase and remove whitespace 

        let apiUrl = 'http://' + window.location.hostname + ':8000/coupons'
        axios.get(apiUrl)
            .then(function (response) {
                const results = response.data;
                if (coupon in results) {
                    setCoupon(results[coupon])
                    summations();
                    document.querySelector(".coupon-field").classList.remove("error-coupon");
                    document.querySelector(".coupon-field").classList.add("success-coupon");
                } else {
                    document.querySelector(".coupon-field").classList.add("error-coupon");
                    document.querySelector(".coupon-field").classList.remove("success-coupon");
                }
            })
            .catch(function (error) {
                console.log(error);
            });
    }

    return (
        <Fragment>
            {
                cart.length > 0 && checkData ?
                    <Row style={{ margin: '20px 0' }}>
                        <Col xs={12} md={14} style={{ padding: '0 10px' }}>
                            {
                                items.map(item => {
                                    return (
                                        <div className="item" key={item.id}>
                                            <div style={{ display: "flex", flexWrap: "nowrap", gap: "10px" }}>
                                                <div className="image">
                                                    <img src={item.images[0]} alt="" />
                                                </div>
                                                <div>
                                                    <p className="name">{item.name}</p>
                                                    <p>{item.type}</p>
                                                </div>
                                            </div>
                                            <div style={{ display: "flex", "flexDirection": 'column', "alignItems": "end" }}>
                                                {
                                                    item.discount > 0 ?
                                                        <Fragment>
                                                            <p className="old-price">{item.price} SAR</p>
                                                            <p className="price"> {item.price - (item.discount * item.price / 100)} SAR</p>
                                                        </Fragment>
                                                        :
                                                        <p className="price">{item.price} SAR</p>
                                                }
                                                <button type="button" className="btn delete" onClick={() => deleteFromCart(item.id)} style={{ "marginTop": "auto", width: 'auto' }}><FontAwesomeIcon icon={faTrashAlt} /> Delete</button>
                                            </div>
                                        </div>
                                    )
                                })
                            }
                        </Col>
                        <Col xs={12} md={10} style={{ padding: '0 10px' }}>
                            <div className="bill">
                                <div className="coupon">
                                    <Input.Group size="large">
                                        <form
                                            onSubmit={handleSubmit((data) => checkCoupon(data))}>
                                            <div className="coupon-field">
                                                <input placeholder="Enter Coupon Code" {...register("coupon")} />
                                                <button type="submit" className="btn dark" >CHECK CODE</button>
                                            </div>
                                            <p className="alert-msg">
                                                <span className="hint">Try one of ( coupon20, coupon30, coupon50 )</span>
                                                <span className="error">Invalid Coupon Code</span>
                                                <span className="success">Valid Coupon, You Get {coupon}%</span>
                                            </p>
                                        </form>
                                    </Input.Group>
                                </div>
                                <div>
                                    <p>Discount:</p>
                                    <p>{discount} SAR</p>
                                </div>
                                <div>
                                    <p>Subtotal:</p>
                                    <p>{subtotal} SAR</p>
                                </div>
                                <div>
                                    <p>VAT (15%):</p>
                                    <p>{vat} SAR</p>
                                </div>
                                <div className="total">
                                    <p>Tottal:</p>
                                    <p>{tottal} SAR</p>
                                </div>
                            </div>
                        </Col>
                    </Row>
                    :
                    <div className="alertMsg">
                        <p>There is no items in your cart </p>
                        <div>
                            <img src="/images/divider-left.png" alt="divider-right" className="divider" />

                            <img src="/images/divider-right.png" alt="divider-right" className="divider" />
                        </div>
                    </div>
            }
        </Fragment>
    )
}
