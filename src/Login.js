import { Button } from '@material-ui/core';
import React,{useState} from 'react'
import { useHistory} from 'react-router-dom';
import './assets/login.css';

export default function Login() {
const URL_TOKEN = 'http://192.168.1.3:45455/token';
let history = useHistory();
const [tenDN, setTenDN] = useState('');
const [matKhau, setMatKhau] = useState('');
const login = () =>{
     var myHeaders = new Headers();
     myHeaders.append("Content-Type", "application/x-www-form-urlencoded");

     var urlencoded = new URLSearchParams();
     urlencoded.append("username", tenDN);
     urlencoded.append("password", matKhau);
     urlencoded.append("grant_type", "password");

     var requestOptions = {
          method: 'POST',
          headers: myHeaders,
          body: urlencoded,
          redirect: 'follow'
     };

     fetch(URL_TOKEN, requestOptions)
     .then((response) =>{
          if(response.ok){
               return response.json();
          }
          throw Error(response.status)
     })
     .then((result) => {
          localStorage.setItem("accessToken",result.access_token)
          console.log(result)
          history.replace('/admin');
     })
     .catch((error) => {console.log('error', error);
          localStorage.setItem("accessToken",null);
          alert('Tên đăng nhập hoặc mật khẩu không hợp lệ')      
          });
}
     return (
          <>
               <form className="form-login">
                    <p className="text-label">Đăng nhập</p>
                    <label>Tên đăng nhập</label>
                    <input type="text" className="text-input" placeholder="Nhập tên đăng nhập" onChange={(e) => {
                         setTenDN(e.target.value)
                    }}></input>
                    <label>Mật khẩu</label>
                    <input type="password" className="text-input" placeholder = "Nhập mật khẩu" onChange={(e) => {
                         setMatKhau(e.target.value)
                    }}></input>
                    <Button onClick={login} variant="contained" color="primary">Đăng nhập</Button>
                    <Button color="default" variant="contained" >Hủy</Button>
               </form>
          </>
     )
}
