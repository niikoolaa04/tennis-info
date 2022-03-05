import React from 'react'

function PlayerList() {

  const players = [{
    id: 0,
ranking: 1,
    fullName: "Test Test",
    country: "SRB",
    points: 10000
  },{
    id: 0,
ranking: 1,
    fullName: "Test Test",
    country: "SRB",
    points: 10000
  },{
    id: 0,
ranking: 1,
    fullName: "Test Test",
    country: "SRB",
    points: 10000
  },{
    id: 0,
ranking: 1,
    fullName: "Test Test",
    country: "SRB",
    points: 10000
  },{
    id: 0,
ranking: 1,
    fullName: "Test Test",
    country: "SRB",
    points: 10000
  },{
    id: 0,
ranking: 1,
    fullName: "Test Test",
    country: "SRB",
    points: 10000
  },{
    id: 0,
ranking: 1,
    fullName: "Test Test",
    country: "SRB",
    points: 10000
  },{
    id: 0,
ranking: 1,
    fullName: "Test Test",
    country: "SRB",
    points: 10000
  },{
    id: 0,
ranking: 1,
    fullName: "Test Test",
    country: "SRB",
    points: 10000
  },{
    id: 0,
ranking: 1,
    fullName: "Test Test",
    country: "SRB",
    points: 10000
  },{
    id: 0,
ranking: 1,
    fullName: "Test Test",
    country: "SRB",
    points: 10000
  },{
    id: 0,
ranking: 1,
    fullName: "Test Test",
    country: "SRB",
    points: 10000
  },{
    id: 0,
ranking: 1,
    fullName: "Test Test",
    country: "SRB",
    points: 10000
  },{
    id: 0,
ranking: 1,
    fullName: "Test Test",
    country: "SRB",
    points: 10000
  },{
    id: 0,
ranking: 1,
    fullName: "Test Test",
    country: "SRB",
    points: 10000
  }]

  return players.map((p, i) => (
    <tr>
      <th scope="row">{ p.ranking }</th>
      <td>{ p.fullName }</td>
      <td>{ p.country }</td>
      <td>{ p.points }</td>
    </tr>
  ))
}

export default PlayerList