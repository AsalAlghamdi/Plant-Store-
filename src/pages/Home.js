import React, { useState, useEffect } from 'react'
import { Skeleton, Card } from 'antd';
import { EyeOutlined, ShoppingCartOutlined } from '@ant-design/icons';
import { Row, Col } from 'antd';
import PlantCard from '../components/PlantCard';
import '../styles/home.scss'

const { Meta } = Card;

export default function Home() {
    const [numOfSkeleton, setnumOfSkeleton] = useState(1)
    const [plants, setPlants] = useState([
    ])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        setTimeout(() => {
            let apiUrl = 'http://' + window.location.hostname + ':8000/plants'
            fetch(apiUrl)
                .then(response => response.json())
                .then(data => {
                    setPlants(data);
                    // setLoading(false);
                });
        }, 1000);
        window.innerWidth <= 768 ? setnumOfSkeleton(2) : setnumOfSkeleton(3)
    }, [])

    return (
        <div className="home">
            <Row>
                {
                    plants.length > 0 ?
                        plants.map((plant) => {
                            return (
                                <Col xs={24} sm={12} md={8} style={{ padding: '10px' }} key={plant.id}>
                                    <PlantCard data={plant} />
                                </Col>
                            )
                        })
                        :
                        [...Array(numOfSkeleton)].map((elementInArray, index) => (
                            <Col xs={24} sm={12} md={8} style={{ padding: '10px' }} key={index}>
                                <Card>
                                    <Skeleton loading={loading} active>
                                        <Meta
                                            title=''
                                            description=''
                                        />
                                    </Skeleton>
                                </Card>
                            </Col>
                        )
                        )
                }
            </Row>
        </div>
    )
}
