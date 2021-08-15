import React,{useState,useEffect} from 'react';
import { Link, Route, Router, Switch,useHistory } from 'react-router-dom';
import OderMon from './components/OderMon';
import ThemBan from './components/ThemBan';
import logo from './assets/user.png';
import './assets/admin.css';
import { Button } from '@material-ui/core';

export default function Admin() {
     let history = useHistory();
     const [user, setUser] = useState({ TenHienThi:''});
     //Lấy thông tin người dùng đăng nhập
     useEffect(async () =>{
          var myHeaders = new Headers();
          myHeaders.append("Authorization", "Bearer "+localStorage.getItem("accessToken"));
          var requestOptions = {
          method: 'GET',
          headers: myHeaders,
          redirect: 'follow'
          };
          fetch("http://192.168.1.3:45455/api/NguoiDung/LayND", requestOptions)
          .then(response => response.text())
          .then((result) => {
               var obj = JSON.parse(result)
               console.log(obj)
               setUser(obj)})
          .catch(error => console.log('error', error));
     },[]);
     return (
          <div className="container">
               <div className="navbar">
                    <div className="logo">
                         Quản Lý Nhà Hàng
                    </div>
                    <ul className="nav-group">
                         <li className = "nav-item">
                              <a href="/admin/ordermon">Order món</a>
                         </li>
                         <li className = "nav-item">
                              <a href="/admin/themban">Thêm bàn</a>
                         </li>
                    </ul>
               </div>
               
               <div className="content">
                    <div className="header">
                         <div className="header-main">
                              123
                         </div>
                         <div className="hello-user">
                              <span style={{color:'red', fontSize:'20px',fontStyle:'italic',margin:'5px'}}>Xin chào</span> {user.TenHienThi}
                              <div className="user-detail">
                                   <img src={logo} className="logo-user"/>
                                   <div className="user-detail_info">
                                        <div className="user-detail_info_content">
                                             <span style={{fontSize:'25px',color:'rgb(7, 0, 102)',fontWeight:'700'}}>{user.TenHienThi}</span>
                                             <Button variant="contained" color="primary" >Cập nhật tài khoản</Button>
                                             <Button variant="contained" color="default" onClick={() =>{
                                                  localStorage.removeItem("accessToken");
                                                  history.replace('/login')
                                             } 
                                             }>Đăng xuất</Button>
                                        </div>
                                   </div>
                              </div>
                         </div>
                    </div>
                    <div className="content-body">
                    <Switch>
                         <Route path="/admin/ordermon">
                              <OderMon/>
                         </Route>
                         <Route path="/admin/themban">
                              <ThemBan/>
                         </Route>
                         <Route path="*">
                              <OderMon/>
                         </Route>
                    </Switch>
                    </div>
               </div>
          </div>
     );
}
