import React from 'react';
import '../assets/ordermon.css'

export default function Ban({idBan,tenBan,trangThai,onChangeTableValue}) {
     return (
          <div className={trangThai == 1 ? "ban ban-true" : "ban"} onClick = {() => onChangeTableValue({idBan : idBan, tenBan : tenBan})}>
               <h3>{tenBan}</h3>
          </div>
     )
}
