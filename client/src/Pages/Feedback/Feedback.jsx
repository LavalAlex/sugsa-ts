import React from 'react'
import { useParams } from 'react-router-dom';
import FeedbackCard from '../../Components/Feedback/FeedbackCard';

import style from './Feedback.module.css'

export default function Feedback(){
    let { id } = useParams();
    console.log(id)
    return(
        <div className={style.container}>
   
            <div className={style.feedback}>

            <FeedbackCard id={id}/>
            </div>
            </div>
    )
}