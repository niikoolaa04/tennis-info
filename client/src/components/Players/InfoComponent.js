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
          <div className="row mt-5">
            <div className='col-4'>
              <table className="table table-hover">
                <tbody>
                  <tr>
                    <th>Name</th>
                    <td>Test Test</td>
                  </tr>
                  <tr>
                    <th>Age</th>
                    <td>35</td>
                  </tr>
                  <tr>
                    <th>Country</th>
                    <td>SRB</td>
                  </tr>
                  <tr>
                    <th>Height</th>
                    <td>187cm</td>
                  </tr>
                  <tr>
                    <th>Weight</th>
                    <td>74kg</td>
                  </tr>
                  <tr>
                    <th>Plays</th>
                    <td>Right Handed, Two Handed Backend</td>
                  </tr>
                  <tr>
                    <th>Coach</th>
                    <td>Name Name</td>
                  </tr>
                  <tr>
                    <th>Prize Money</th>
                    <td>$2.000.000</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div className='col-4'>
              <table className="table table-hover">
                <tbody>
                  <tr>
                    <th>Age</th>
                    <td>11</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div className='col-4'>
              <table className="table table-hover">
                <tbody>
                  <tr>
                    <th>Age</th>
                    <td>11</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
      <FooterComponent />
    </div>
  )
}

export default InfoComponent