import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import Modal from 'react-bootstrap/Modal'
import { useRef } from 'react'
import { useBudget } from '../context/budgetContext'

export default function AddBudgetModal({ show, handleClose }) {
  const nameRef = useRef()
  const amountRef = useRef()
  const { addBudget } = useBudget()

  const handleSubmit = (submitEvent) => {
    submitEvent.preventDefault()
    addBudget({
      name: nameRef.current.value,
      max: parseFloat(amountRef.current.value),
    })
    handleClose()
  }
  return (
    <Modal show={show} onHide={handleClose}>
      <Form onSubmit={handleSubmit}>
        <Modal.Header closeButton>
          <Modal.Title>Add new budget</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form.Group className="mb-4" controlId="name">
            <Form.Label>Name</Form.Label>
            <Form.Control ref={nameRef} type="text" required></Form.Control>
          </Form.Group>
          <Form.Group className="mb-4" controlId="spending">
            <Form.Label>Maximum Spending</Form.Label>
            <Form.Control
              ref={amountRef}
              type="number"
              required
              min={0}
              step={0.1}
            ></Form.Control>
          </Form.Group>
          <div className="d-flex justify-content-end">
            <Button variant="primary" type="submit">
              Add budget
            </Button>
          </div>
        </Modal.Body>
      </Form>
    </Modal>
  )
}
