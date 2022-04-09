import { useState } from 'react';
import { Link } from 'react-router-dom';
import NavComponent from '../Navigation/NavComponent';
import FooterComponent from './FooterComponent';

function NotFoundComponent() {
  return <div>
    <NavComponent active={"other"} />
    <div className='py-5'>
      <div className="container-fluid">
        <div className="row m-0 p-0">
          <div className='text-center mt-5'>
            <img className='m-0 p-0' style={{ transform: "scale(1)" }} src="https://cdn-icons.flaticon.com/png/128/2797/premium/2797387.png?token=exp=1649519606~hmac=538a7a394dcdda1230fefe1ad13c6a4c" alt="" />
            <p className="fs-5 pt-3 pb-2">Page requested couldn't be found.</p>
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