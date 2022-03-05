import { useParams, useEffect, useState } from 'react'
import NavComponent from '../Navigation/NavComponent'
import FooterComponent from '../Other/FooterComponent'

function InfoComponent() {
  return (
    <div>
      <NavComponent active={"players"} />
      <div>
        {/* GENERAL INFORMATION */}
        <div className="container">
          <div className="row">
            <div className='mt-5 text-center'>
              <img className='tennisIcon' src="https://cdn-icons-png.flaticon.com/128/1163/1163109.png" alt="PlayerInfo" />
              <h1 className='text-center font-weight-bold mt-4'>Player Info</h1>
            </div>
          </div>
        </div>
        {/* PLAYER INFORMATION */}
        <div className="container">
          <div className="row">
            {/* PLAYER */}
          </div>
        </div>
      </div>
      <FooterComponent />
    </div>
  )
}

export default InfoComponent