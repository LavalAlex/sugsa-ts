import React from 'react'
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
// import AdminFollowingCard from '../../../Components/Admin/Ticket/AdminFollowingCard';

import style from './AdminFollowing.module.css'

export default function AdminFollowing(){
  const tickets = useSelector((state) => state.tickets.tickets);
  let { id } = useParams();
    return(
        <div className={style.container}>
            <div className={style.followinCard}>

            {/* <AdminFollowingCard data={tickets[id]}/> */}
            </div>
        </div>
    )
}