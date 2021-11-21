import React, { useEffect } from 'react'
import { Comment, Tooltip, Avatar } from 'antd';
import { Image } from 'antd';
import '../styles/comment.scss';

export default function Commentb({ data }) {
    return (
        <div className='comment'>
            <Comment
                author={<a>{data.name}</a>}
                avatar={<Avatar src={"https://ui-avatars.com/api/?name="+data.name+"&background=849c8e&color=ffffff"} alt="Han Solo" />}
                content={
                    <p>
                        {data.comment}
                    </p>
                }
                datetime={
                    <Tooltip title={data.time}>
                        <span>{data.time}</span>
                    </Tooltip>
                }
            />
            <div className='images'>
                {
                    data.images ?
                    data.images.map((image) => {
                        return (
                            <Image
                                src={image}
                            />
                        )
                    })
                    :
                    <div/>
                }
            </div>
        </div>
    )
}
