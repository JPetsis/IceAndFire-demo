import React, { Fragment } from "react"
import { useQuery } from "react-query"
import axios from "axios"
import { Table } from "reactstrap"
import { Container, Row, Col } from "reactstrap"

async function fetchHouses() {
  const { data } = await axios.get("https://www.anapioficeandfire.com/api/houses?pageSize=14")
  return data
}

function App() {
  const { data, error, isError, isLoading } = useQuery("houses", fetchHouses)
  if (isLoading) {
    return <div classname="loading">Please wait a minute! Loading data may take some time...</div>
  }
  if (isError) {
    return <div classname="error">Error! {error.message}</div>
  }

  return (
    <Fragment>
      <Container>
        <Row>
          <h1>Houses</h1>
          {data.map((house, index) => {
            return (
              <Table bordered>
                <thead>
                  <tr>
                    <th>#</th>
                    <th>House Name</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>{index}</td>
                    <td>{house.name}</td>
                  </tr>
                </tbody>
              </Table>
            )
          })}
        </Row>
      </Container>
    </Fragment>
  )
}

export default App
