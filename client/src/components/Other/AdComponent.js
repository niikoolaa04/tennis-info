import { useState } from 'react'

function AdComponent({ url, text = "" }) {
  return (
    <div className='pb-5'>
      <div className="container w-75">
        <div className="row py-3" style={{ height: "5rem", backgroundImage: `url(${url})` }}>
          <p className='text-light'>{ text }</p>
        </div>
      </div>
    </div>
  )
}

export default AdComponent