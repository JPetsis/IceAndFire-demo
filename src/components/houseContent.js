import React from "react"
import "./houseContent.css"

function HouseContent({ house }) {
  // I'm not sure if you've ever seen object destructuring before but { house } is the same as props.house
  console.log(house) // This will help see whats within the house object
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
