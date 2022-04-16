import { useState } from 'react';
import { Link } from 'react-router-dom';
import NavComponent from '../Navigation/NavComponent';
import FooterComponent from './FooterComponent';

function NotFoundComponent() {
  return <div className='bg-darker'>
    <NavComponent active={"other"} />
    <div className='py-5'>
      <div className="container-fluid">
        <div className="row m-0 p-0">
          <div className='text-center mt-5'>
            <img className='m-0 p-0' style={{ transform: "scale(1)" }} src="https://cdn-icons-png.flaticon.com/256/5058/5058040.png" alt="" />
            <p className="text-light fs-3 pt-5 pb-2">Page requested couldn't be found.</p>
            <Link to={"/"}>
              <button type="button" class="btn btn-primary btn-lg">Return Home</button>
            </Link>
          </div>
        </div>
      </div>
    </div>
    <FooterComponent />
  </div>;
}

export default NotFoundComponent;