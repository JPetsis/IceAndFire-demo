import React, { Fragment, useState, useEffect } from "react"
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

async function fetchHouses(page) {
  console.log("Fetch Houses Function => ", page)
  const { data } = await axios.get(
    `https://www.anapioficeandfire.com/api/houses?page=${page}&pageSize=13`
  )
  return data
}

function App() {
  const [modal, setModal] = useState(false)
  const [modalContent, setModalContent] = useState({ title: "", body: "" })
  const [page, setPage] = useState(0)

  const toggle = () => setModal(!modal)

  // const fetchHouses = async (page = 1) =>
  //   await fetch(`https://www.anapioficeandfire.com/api/houses?page=${page}&pageSize=13`).then(
  //     (res) => res.json()
  //   )

  const { data, error, isError, isLoading, isFetching, isPreviousData } = useQuery(
    ["houses", page],
    () => fetchHouses(page),
    { keepPreviousData: true }
  )
  console.log(data)

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
        <span>Current Page: {page + 1}</span>
        <button onClick={() => setPage((old) => Math.max(old - 1, 0))} disabled={page === 0}>
          Previous Page
        </button>{" "}
        <button
          onClick={() => {
            if (!isPreviousData && data.hasMore) {
              setPage((old) => old + 1)
            }
          }}
          disabled={isPreviousData || !data?.hasMore}
        >
          Next Page
        </button>
        {isFetching ? <span> Loading...</span> : null}{" "}
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
