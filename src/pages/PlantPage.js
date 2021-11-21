import React, { useState, useEffect, Fragment } from 'react'
import { ShoppingCartOutlined } from '@ant-design/icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFillDrip, faSeedling, faSun, faTruck } from '@fortawesome/free-solid-svg-icons'
import { Row, Col } from 'antd';
import { Carousel } from 'antd';
import Comment from '../components/comment';
import { useHistory, useParams } from "react-router-dom";
import axios from 'axios';
import "antd/dist/antd.css";
import '../styles/plantPage.scss'
import { Tabs } from 'antd';
const { TabPane } = Tabs;


export default function PlantPage() {
    const history = useHistory();
    function handleClick() {
        history.goBack();
    }

    const { id } = useParams();
    const [checkData, setCheckData] = useState(true);
    const [plantImage, setPlantImage] = useState([]);
    const [plantData, setPlantData] = useState({});
    const [numberOfCommentsPhoto, setNumberOfCommentsPhoto] = useState(0);
    const [comments, setComments] = useState([]);

    useEffect(() => {
        let apiUrl = 'http://' + window.location.hostname + ':8000/getPlantsDetail'
        axios.get(apiUrl)
            .then(function (response) {
                const data = response.data.find(data => data.id == id);
                if (data) {
                    setPlantData(response.data.find(data => data.id == id));
                } else {
                    setCheckData(false)
                }
            })
            .catch(function (error) {
                console.log(error);
            });

    }, []);

    useEffect(() => {
        if (Object.keys(plantData).length) {
            setNumberOfCommentsPhoto(
                (plantData.comments.filter(comment => comment.images.length > 0)).length
            )
            setComments(plantData.comments);
            setPlantImage(plantData.images);
        }
    }, [plantData]);

    return (
        <Fragment>
            {
                Object.keys(plantData).length > 0 ?
                    <div style={{ margin: '20px 0' }}>
                        <Row className="plantInfo">
                            <Col xs={24} sm={12} md={12} lg={12}>
                                <Carousel>
                                    {
                                        plantImage.map(image => {
                                            return (
                                                <div className="slide">
                                                    <img src={image} alt="" />
                                                </div>
                                            )
                                        })
                                    }
                                </Carousel>
                            </Col>
                            <Col xs={24} sm={12} md={12} lg={12} style={{ padding: '0 30px' }}>
                                <p className="name">{plantData.name}</p>
                                <p className="desc">{plantData.description}</p>
                                <ul style={{ 'margin': '20px 0' }}>
                                    <li><FontAwesomeIcon icon={faSeedling} />: {plantData.type}</li>
                                    <li><FontAwesomeIcon icon={faSun} />: Needs {plantData.light} hours of light per day</li>
                                    <li><FontAwesomeIcon icon={faFillDrip} />: Needs {plantData.water} times a week of water</li>
                                </ul>
                                <hr />
                                <div className="price-div">
                                    <div>
                                        {
                                            plantData.discount > 0 ?
                                                <Fragment>
                                                    <p className="old-price">{plantData.price} SAR</p>
                                                    <p className="price">{plantData.price - (plantData.discount * plantData.price / 100)} SAR</p>
                                                </Fragment>
                                                :
                                                <Fragment>
                                                    <p className="price">{plantData.price} SAR</p>
                                                </Fragment>
                                        }
                                    </div>
                                    <button type="button" className="addToCart"><ShoppingCartOutlined /> ADD TO CART</button>
                                </div>
                                <hr />
                                <div className="shipment-div">
                                    <FontAwesomeIcon className="icon" icon={faTruck} /> <p>Shipment will take 3-5 work days to arrive</p>
                                </div>
                            </Col>
                        </Row>
                        <Tabs defaultActiveKey="1" style={{ margin: '20px 0' }}>
                            <TabPane tab={'Comment (' + comments.length + ')'} key="1">
                                {
                                    plantData.comments.length > 0 ?
                                        plantData.comments.map((comment) => {
                                            return (
                                                <Comment data={comment} />
                                            )
                                        })
                                        :
                                        <p>No comments</p>
                                }
                            </TabPane>
                            <TabPane tab={'Comments (' + numberOfCommentsPhoto + ')'} key="2">
                                {
                                    numberOfCommentsPhoto > 0 ?
                                        comments.filter(comment => comment.images.length > 0).map((comment) => {
                                            return (
                                                <Comment data={comment} />
                                            )
                                        })
                                        :
                                        <p>No comments with photos</p>
                                }
                            </TabPane>
                        </Tabs>
                    </div>
                    :
                    <div>
                        {
                            checkData ?
                                <div className="alertMsg">
                                    <div class="lds-circle"></div>
                                    <p>Loading...</p>
                                </div>
                                :
                                <div className="alertMsg">

                                    <p>Oops Sorry ! somthing went wrong <br /> it seams like there is no data we could display</p>
                                    <button type="button" className="btn" onClick={handleClick}>Go Back</button>
                                    <div>
                                        <img src="/images/divider-left.png" alt="divider-right" className="divider" />

                                        <img src="/images/divider-right.png" alt="divider-right" className="divider" />
                                    </div>
                                </div>
                        }
                    </div>
            }
        </Fragment>
    )
}
