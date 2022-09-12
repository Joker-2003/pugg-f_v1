import React from 'react'
import './loading.css'
export default function Loading(props) {
  return (
	 <div className="loading-spinner" style = {{top : props.full && "0", left : props.full && "0",right : props.full && "0" , bottom : props.full && "0"  }}>
  </div>
  )
}
