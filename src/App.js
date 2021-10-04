import React, { Fragment, useState, useEffect } from "react"
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

import apiServices from "./services/apiServices"

function App() {
  const [modal, setModal] = useState(false)
  const [modalContent, setModalContent] = useState({ title: "", body: "" })
  const [page, setPage] = useState(0)
  const [data, setData] = useState(null)

  const toggle = () => setModal(!modal)

  useEffect(() => {
    getHousesPage()
  }, [getHousesPage])

  useEffect(() => {
    getHousesPage()
  }, [page])

  const getHousesPage = () => {
    apiServices
      .getHousesByPage(page + 1)
      .then((houses) => {
        const hasMore =
          houses.headers.link.split(",")[0].match(/(?<=rel=")(.*?)(?=")/g)[0] === "next"
        if (data) {
          let currentData = data.data
          houses.data.forEach((el) => currentData.push(el))
          setData({ hasMore: hasMore, data: currentData })
        } else setData({ hasMore: hasMore, data: houses.data })
      })
      .catch((err) => console.error(err))
  }

  if (!data)
    return <div className="loading">Please wait a minute! Loading data may take some time...</div>

  const renderTable = () => {
    let Houses = data.data.map((house, index) => {
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
        <Button
          color="primary"
          onClick={() => {
            if (data.hasMore) {
              setPage((old) => old + 1)
            }
          }}
          disabled={!data.hasMore}
        >
          Load more
        </Button>
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
