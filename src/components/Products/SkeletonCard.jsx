import React from 'react'
import Skeleton from 'react-loading-skeleton'
import { Link } from 'react-router-dom'
import { Row, Col, Card, Button } from 'react-bootstrap'
import './skeleton.css'
import './products.css'

const SkeletonCard = (props) => {
    const number = [1, 2, 3, 4, 5,6,7,8,9,10,11,12,13,14,15]
    return (

        number.slice(0,props.count).map((_, index) => (

            <Col>
                <Skeleton key={index} className='card__btnx' ></Skeleton>
            </Col>
            // <Col key={index}>
            //     <Card className='card__product'>
            //         <div className='card__img'>
            //             <Skeleton className='card__btnx' ></Skeleton>
            //         </div>
            //         <Card.Body>
            //             <Card.Title className='cursor-btn'><Skeleton className='card__btnx' ></Skeleton></Card.Title>
            //             <Card.Text>
            //                 <Skeleton className='card__btnx' ></Skeleton>
            //             </Card.Text>

            //         </Card.Body>
            //             <Skeleton className='card__btnx' ></Skeleton>
            //     </Card>
            // </Col>
        ))

    )
}

export default SkeletonCard
