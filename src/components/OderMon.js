import React,{useState,useEffect} from 'react';
import '../assets/ordermon.css';
import Ban from './Ban';
import com from '../image/com.jpg';
import hap from '../image/hap.jpg';
import khangiay from '../image/khangiay.jpg';
import lau from '../image/lau.jpg';
import nuong from '../image/nuong1.jpg';
import thucuong from '../image/thucuong.jpg';
import { Button, NativeSelect, TextField} from '@material-ui/core';
import DMMon from './DMMon';


export default function OderMon({nguoiDung}) {
const[bans,setBans] = useState([]);
const[ban,setBan] = useState({idBan:'0', tenBan : 'Null'});
const[idDM,setIdDM] = useState('1');
const[mons,setMons] = useState([]);
const[cthd,setCTHD] = useState([]);
const[ngayHD,setNgayHD] = useState('');
const[tongTien,setTongTien] = useState({ tTien: 0 , Nhan: '' });
const[monOrder,setMonOrder] = useState(1);
const[slMon,setSlMon] = useState(1);
const[giamGia,setGiamGia] = useState(0);
const[ttOrder,setTTOrder] = useState(0);

//Thanh toán

const thanhToan = (idBan, soTien, idNguoiDung) =>{
     var myHeaders = new Headers();
          myHeaders.append("Authorization", "Bearer "+localStorage.getItem('accessToken'));
          myHeaders.append("Content-Type", "application/json");

          var raw = JSON.stringify({
               "IdBan": idBan,
               "TongTien": soTien,
               "IdNguoiDung": idNguoiDung
          });

          var requestOptions = {
          method: 'POST',
          headers: myHeaders,
          body: raw,
          redirect: 'follow'
          };
          let kq = '';
          console.log(raw);
          fetch("http://192.168.1.9:45455/api/HoaDon/ThanhToan", requestOptions)
          .then(response => response.json())
          .then((result) => {kq = result.TenTrangThai;console.log(result)} )
          .catch(error => console.log('error', error));
          return kq;
     }

//Gọi món
const GioiMon = () =>{
     var myHeaders = new Headers();
     myHeaders.append("Authorization", "Bearer "+localStorage.getItem('accessToken'));
     myHeaders.append("Content-Type", "application/json");

     var raw = JSON.stringify({
     "IdBan": ban.idBan,
     "IdMon": monOrder,
     "SoLuong": slMon,
     "IdNguoiDung": nguoiDung
     });

     var requestOptions = {
     method: 'POST',
     headers: myHeaders,
     body: raw,
     redirect: 'follow'
     };

     fetch("http://192.168.1.9:45455/api/HoaDon/ThemHoaDon/", requestOptions)
     .then(response => response.text())
     .then(result => console.log(result))
     .catch(error => console.log('error', error));
     setTTOrder(ttOrder+1);
}

useEffect(() => {
     var myHeaders = new Headers();
     myHeaders.append("Authorization", "Bearer "+localStorage.getItem('accessToken'));

     var requestOptions = {
     method: 'GET',
     headers: myHeaders,
     redirect: 'follow'
     };

     fetch("http://192.168.1.9:45455/api/HoaDon/LayNgayHD/"+ban.idBan, requestOptions)
     .then(response => response.text())
     .then(result => setNgayHD(result))
     .catch(error => console.log('error', error));
},[ban])

//Lấy danh sách bàn

useEffect(() => {
     var myHeaders = new Headers();
     myHeaders.append("Authorization", "Bearer "+localStorage.getItem("accessToken"));

     var requestOptions = {
          method: 'GET',
          headers: myHeaders,
          redirect: 'follow'
        };
        
        fetch("http://192.168.1.9:45455/api/Ban/LayDSBan", requestOptions)
        .then(response => response.json())
        .then((result) =>{
               setBans(result)
     })
     .catch(error => console.log('error', error));
     document.querySelector('#txtThanhTien').value = 0;

},[ttOrder,cthd]);
//Lấy danh sách món theo danh mục
useEffect(() =>{
     var myHeaders = new Headers();
     myHeaders.append("Authorization", "Bearer "+localStorage.getItem("accessToken"));
     var requestOptions = {
     method: 'GET',
     headers: myHeaders,
     redirect: 'follow'
     };
     fetch("http://192.168.1.9:45455/api/Mon/LayMonTheoDM/"+idDM, requestOptions)
     .then(response => response.json())
     .then((result) =>{
          setMons(result)
     })
     .catch(error => console.log('error', error));
},[idDM])
//Lấy chi tiết hóa đơn theo bàn
useEffect(() => {
     console.log(ban.idBan);
     var myHeaders = new Headers();
     myHeaders.append("Authorization", "Bearer "+localStorage.getItem('accessToken'));

     var requestOptions = {
     method: 'GET',
     headers: myHeaders,
     redirect: 'follow'
     };
     fetch("http://192.168.1.9:45455/api/HoaDon/LayCTHD/"+ban.idBan, requestOptions)
     .then(response => response.json())
     .then(result => {setCTHD(result)})
     .catch(error => console.log('error', error));
     console.log(cthd);
},[ban,ttOrder])
useEffect(() => {
     let tt = 0;
     let laBel = '';
     cthd.map(m => tt+=m.DonGia*m.SoLuong);
     laBel = tt.toLocaleString('it-IT', {style : 'currency', currency : 'VND'});
     setTongTien({tTien:tt,Nhan:laBel});
},[cthd])
     return (
          <div className="container-ordermon">
               <div className="left-ordermon">
                    <div className="left-ordermon_header">
                         <div className="left-ordermon_header_tablename">
                              {ban.tenBan}
                         </div>
                         <div className="left-ordermon_header_detail">
                              <div className="wrapper_detail">
                                   <div style={{width:'70px'}}>Giờ vào</div>
                                   <div className="wrapper_detail-item">
                                        {ngayHD}
                                   </div>
                              </div>
                              <div className="wrapper_detail">
                                   <div style={{width:'70px'}}>Tổng tiền</div>
                                   <div className="wrapper_detail-item">
                                        {tongTien.Nhan}
                                   </div>
                              </div>
                         </div>
                    </div>
                    <div className="left-ordermon_body">
                    <table style={{width:'100%',fontSize:'15px', fontWeight:'700',textAlign:'center'}}>
                         <thead>
                              <tr style={{background:'#ffe28e'}}>
                                   <th style={{width:'130px'}}>Tên món</th>
                                   <th>Đơn giá</th>
                                   <th>SL</th>
                                   <th>Thành tiền</th>
                              </tr>
                         </thead>
                         <tbody>
                                   {
                                        cthd.map((ct) => {
                                             return  <tr key={ct.TenMon}>
                                                       <td style={{width:'130px'}}>{ct.TenMon}</td>
                                                       <td>{ct.DonGia}</td>
                                                       <td>{ct.SoLuong}</td>
                                                       <td>{ct.ThanhTien}</td>
                                                  </tr>
                                        })
                                   }
                              </tbody>
                    </table>
                    </div>
                    <div className="left-ordermon_bottom">
                         <div className="right-ordermon_header-item">
                              <div style={{width:'100px'}}>Giảm giá</div>
                              <input type="number" className="left-ordermon_bottom-textfeild" id="txtGiamGia" defaultValue={0} onChange={
                                   (e) => {
                                        setGiamGia(e.target.value);
                                   }
                              }>
                                   
                              </input>
                         </div>
                         <div className="right-ordermon_header-item">
                              <div style={{width:'100px'}}>Thành tiền</div>
                              <input type="text" className="left-ordermon_bottom-textfeild" id="txtThanhTien">
                                   
                              </input>
                         </div>
                    </div>
               </div>
               <div className="middle-ordermon">
                    <div className="middle-ordermon-top">
                         {
                              bans.map((b) =>  {
                                   return (<Ban tenBan={b.TenBan} trangThai = {b.TinhTrang} idBan = {b.IdBan}
                                   key={b.IdBan} onChangeTableValue = {(ban) => setBan(ban)}/>);})
                         }
                    </div>
                    <div className="middle-ordermon-bottom">
                         <Button variant="contained" color="secondary" onClick={
                              () => {
                              if(giamGia >= 0 || !ban.idBan){
                                   thanhToan(ban.idBan,tongTien.tTien-giamGia,nguoiDung);
                                   document.querySelector('#txtThanhTien').value = tongTien.tTien-giamGia;
                                   setTTOrder(ttOrder+1);
                                   }else{
                                        alert('Giảm giá phải lớn hơn 0');
                                   }
                              }
                         }>Thanh toán</Button>
                         <Button variant="contained" color="primary">Xuất hóa đơn</Button>
                    </div>
               </div>
               
               <div className="right-ordermon">
                    <div className="right-ordermon_header">
                         <div className="right-ordermon_header-item">
                              <div style={{width:'90px',display:'flex',minWidth:'90px',flexDirection:'row',alignItems:'center',justifyContent:'flex-start'}}><span style={{fontWeight:'600'}}>Tên món</span></div>
                              <NativeSelect style={{width:'100%'}} onChange={
                                   (e) => {
                                        setMonOrder(e.target.value)
                                   }
                              }>
                                   {
                                        mons.map((m) => {
                                            return <option value={m.IdMon}>{m.TenMon}</option>
                                        })
                                   }
                              </NativeSelect>
                         </div>
                         <div className="right-ordermon_header-item">
                         <div style={{width:'90px',minWidth:'90px',display:'flex',alignItems:'center',flexDirection:'row',justifyContent:'flex-start'}}><span style={{fontWeight:'600'}}>Số lượng</span></div>
                         <TextField
                              type="number"
                              onChange={(e) => {
                                   setSlMon(e.target.value)
                              }}
                              InputLabelProps={{
                              shrink: true,
                              }}
                         />
                         </div>
                    </div>
                    <div className="right-ordermon_danhmuc">
                         <div className="right-ordermon_danhmuc-row">
                              <div className="right-ordermon_danhmuc-row-item">
                                   <DMMon srcImg={lau} tenDM={'Lẩu'} idDM={'1'} onChangeIdDMValue={idDM => {
                                        setIdDM(idDM)
                                   }}/>
                              </div>
                              <div className="right-ordermon_danhmuc-row-item">
                                   <DMMon srcImg={nuong} tenDM={'Nướng'} idDM={'2'}onChangeIdDMValue={idDM => {
                                        setIdDM(idDM)
                                   }}/>
                              </div>
                         </div>
                         <div className="right-ordermon_danhmuc-row">
                              <div className="right-ordermon_danhmuc-row-item">
                                   <DMMon srcImg={com} tenDM={'Cơm'} idDM={'3'}onChangeIdDMValue={idDM => {
                                        setIdDM(idDM)
                                   }}/>
                              </div>
                              <div className="right-ordermon_danhmuc-row-item">
                                   <DMMon srcImg={hap} tenDM={'Hấp'} idDM={'4'}onChangeIdDMValue={idDM => {
                                        setIdDM(idDM)
                                   }}/>
                              </div>
                         </div>
                         <div className="right-ordermon_danhmuc-row">
                              <div className="right-ordermon_danhmuc-row-item">
                                   <DMMon srcImg={thucuong} tenDM={'Thức uống'} idDM={'5'}onChangeIdDMValue={idDM => {
                                        setIdDM(idDM)
                                   }}/>
                              </div>
                              <div className="right-ordermon_danhmuc-row-item">
                                   <DMMon srcImg={khangiay} tenDM={'Khác'} idDM={'6'}onChangeIdDMValue={idDM => {
                                        setIdDM(idDM)
                                   }}/>
                              </div>
                         </div>
                    </div>
                    <div className="right-ordermon_danhmuc-order">
                         <Button variant="contained" color="secondary" onClick={
                              () =>{
                                   if(slMon > 0){
                                        GioiMon();
                                        setTTOrder(ttOrder+1);
                                        console.log(ttOrder);
                                   }else{
                                        alert("Bạn phải chọn số lượng món > 0");
                                   }
                              }
                         }>Order Món</Button>
                         <Button variant="contained" color="primary" onClick={
                              () =>{
                                   console.log(nguoiDung)
                              }
                         }>Chuyển bàn</Button>
                    </div>
                    <div className="right-ordermon_danhmuc-chuyenban">
                         <div style={{width:'140px',minWidth:'140px'}}>Chọn bàn chuyển</div>
                         <NativeSelect style={{width:'100%'}} 
                         onChange={(e) => console.log(e.target.value)}>
                              {
                                   bans.map((b) => {
                                        return <option value={b.IdBan}>{b.TenBan}</option>
                                   })
                              }
                         </NativeSelect>
                    </div>
               </div>
          </div>
     )
}
