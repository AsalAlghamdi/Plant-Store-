import React, { useContext } from 'react'
import { Context } from '../App';
import { Tooltip } from 'antd';
import { EyeOutlined, ShoppingCartOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';
import '../styles/plantCard.scss'

export default function PlantCard({ data }) {
    const { cart, setCart } = useContext(Context);
    const addToCart = (id) => {
        const cartContent = [...cart];
        cartContent.push(id) ;
        setCart(cartContent)
    }
    return (
        <div className="card">
            <div>
                {
                    data.discount > 0 ?
                        <div className="discount" >{data.discount}%</div>
                        :
                        ''
                }
                <img src={data.image} alt={data.name} />
            </div>
            <div className="info">
                <p className="name">{data.name}</p>
                <p className="description">{data.description}</p>
                {
                    data.discount > 0 ?
                        <p className="price">{data.price - (data.discount * data.price / 100)} SAR<span>{data.price} SAR</span></p>
                        :
                        <p className="price">{data.price} SAR</p>
                }
            </div>
            <div className="action">
                <Tooltip title='Display'>
                    <Link to={'/plant/' + data.id}><EyeOutlined /></Link>
                </Tooltip>
                <Tooltip title='Add To Card'>
                    <p onClick={() => { addToCart(data.id) }} ><ShoppingCartOutlined /></p>
                </Tooltip>
            </div>
        </div>
    )
}
