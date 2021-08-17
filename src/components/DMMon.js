import React from 'react'

export default function DMMon({idDM,srcImg,tenDM,onChangeIdDMValue}) {
   return (
      <div style={{width:'120px', height:'120px',display:'flex', flexDirection:'column'
      ,margin:0,textAlign:'center',alignItems:'center',
      boxShadow: '0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)',
      borderRadius:'5px'
      }} onClick = {() =>{
         onChangeIdDMValue(idDM)
      }}>
         <img src={srcImg} style={{flex:'1',width:'120px',height:'100px'}}></img>
         <div style={{height:'20px',width:'100%',fontWeight:'800',color:'blueviolet'}}>{tenDM}</div>
      </div>
   )
}
