import React from "react"
import "./houseContent.css"

function HouseContent({ house }) {
  console.log(house)
  return (
    <div>
      <h4>Details</h4>
      <li>region: {house.region}</li>
      <li>coatOfArms: {house.coatOfArms}</li>
      <li>words: {house.words}</li>
      <li>titles: {house.titles}</li>
      <li>seats: {house.seats}</li>
    </div>
  )
}

export default HouseContent
