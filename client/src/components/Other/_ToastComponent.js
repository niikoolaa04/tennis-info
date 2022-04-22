import { useEffect, useState, useRef } from 'react'
import { Toast } from 'bootstrap';
import * as bootstrap from 'bootstrap';

function ToastComponent({ title, message, toast, setToast }) {
  const toastRef = useRef();

  useEffect(() => {
      var myToast = toastRef.current
      var bsToast = bootstrap.Toast.getInstance(myToast)
      
      if (!bsToast) {
          bsToast = new Toast(myToast)
          bsToast.hide()
          setToast(false)
      } else {
          toast ? bsToast.show() : bsToast.hide()
      }
  })

  return (
    <div>
      <div className="position-fixed bottom-0 end-0 p-3" style={{ zIndex: 11 }}>
        <div id="liveToast" className="toast" ref={toastRef} role="alert" aria-live="assertive" aria-atomic="true">
          <div className="toast-header">
            {/* <img src="..." className="rounded me-2" alt="..."> */}
            <strong className="me-auto">{ title }</strong>
            <small>just now</small>
            <button type="button" className="btn-close" data-bs-dismiss="toast" aria-label="Close"></button>
          </div>
          <div className="toast-body">
            { message }
          </div>
        </div>
      </div>
    </div>
  )
}

export default ToastComponent