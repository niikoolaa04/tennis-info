import { useState } from 'react'

function LoadingComponent() {
  return (
    <div className='py-4'>
      <div className='d-flex justify-content-center flex-col'>
        <div className="spinner-border text-primary" style={{ width: "5rem", height: "5rem" }} role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
      <div className='text-center py-0 my-0'>
        <p className='text-light display-6 fw-semibold pt-3'>Loading..</p>
      </div>
    </div>
  )
}

export default LoadingComponent