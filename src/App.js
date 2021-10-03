import React, { Fragment, useState } from "react"
import { useQuery } from "react-query"
import axios from "axios"
import HouseContent from "./components/houseContent"
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Container,
  Row,
  Col,
  Table,
} from "reactstrap"

async function fetchHouses() {
  const { data } = await axios.get("https://www.anapioficeandfire.com/api/houses?pageSize=14")
  return data
}

function App() {
  const [modal, setModal] = useState(false)
  const [modalContent, setModalContent] = useState({ title: "", body: "" })

  const toggle = () => setModal(!modal)

  const { data, error, isError, isLoading } = useQuery("houses", fetchHouses)
  if (isLoading) {
    return <div className="loading">Please wait a minute! Loading data may take some time...</div>
  }
  if (isError) {
    return <div className="error">Error! {error.message}</div>
  }

  const renderTable = () => {
    let Houses = data.map((house, index) => {
      return (
        <tr key={index}>
          <td>{index + 1}</td>
          <td>{house.name}</td>
          <td>
            <Button
              onClick={() => {
                setModalContent({
                  title: house.name,
                  body: <HouseContent house={house} />,
                })
                toggle()
              }}
            >
              View
            </Button>
          </td>
        </tr>
      )
    })

    return (
      <Table>
        <thead>
          <tr>
            <th>#</th>
            <th>House Name</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>{Houses}</tbody>
      </Table>
    )
  }

  return (
    <Fragment>
      <Container>
        <Row>
          <Col>
            <h1>Houses</h1>
            {renderTable()}
          </Col>
        </Row>
      </Container>
      <Modal isOpen={modal} toggle={toggle}>
        <ModalHeader toggle={toggle}>{modalContent.title}</ModalHeader>
        <ModalBody>{modalContent.body}</ModalBody>
        <ModalFooter>
          <Button color="secondary" onClick={toggle}>
            Close
          </Button>
        </ModalFooter>
      </Modal>
    </Fragment>
  )
}

export default App
