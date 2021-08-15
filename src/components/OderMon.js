import React,{useState,useEffect} from 'react';
import '../assets/ordermon.css';
import Ban from './Ban';
import { Grid, TextField } from '@material-ui/core';

export default function OderMon() {
const[bans,setBans] = useState([]);
const[ban,setBan] = useState({idBan:'', tenBan : ''})
useEffect(() => {
     var requestOptions = {
          method: 'GET',
          redirect: 'follow'
        };
        
        fetch("http://192.168.1.3:45455/api/Ban", requestOptions)
          .then(response => response.json())
          .then((result) =>{
               setBans(result)
          })
          .catch(error => console.log('error', error));
},[])
     return (
          <div className="container-ordermon">
               <div className="left-ordermon">
                    <div className="left-ordermon_header">
                         <div className="left-ordermon_header_tablename">
                              {ban.tenBan}
                         </div>
                         <div className="left-ordermon_header_detail">
                              <div className="wrapper_detail">
                                   <span>Giờ vào</span>
                                   <div className="wrapper_detail-item">
                                        5:40
                                   </div>
                              </div>
                              <div className="wrapper_detail">
                                   <span>Tổng tiền</span>
                                   <div className="wrapper_detail-item">
                                        1.200.000 VNĐ
                                   </div>
                              </div>
                         </div>
                    </div>
                    <div className="left-ordermon_body">
                         
                    </div>
                    <div className="left-ordermon_bottom">

                    </div>
               </div>
               <div className="middle-ordermon">
                    {
                         bans.map((b) => <Ban tenBan={b.TenBan} trangThai = {b.TinhTrang} idBan = {b.IdBan} key={b.IdBan} onChangeTableValue = {(ban) => setBan(ban)}/>)
                    }
               </div>
               <div className="right-ordermon">
                    <div className="right-ordermon_header">
                         <Grid container>
                              <Grid item sm={3}>
                                   123
                              </Grid>
                              <Grid item sm={9}>
                                   456
                              </Grid>
                         </Grid>
                         <Grid container>
                              <Grid item sm={3}>
                                   123
                              </Grid>
                              <Grid item sm={9}>
                                   456
                              </Grid>
                         </Grid>
                    </div>
               </div>
          </div>
     )
}
