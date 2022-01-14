import Button from 'react-bootstrap/Button'
import Modal from 'react-bootstrap/Modal'
import Stack from 'react-bootstrap/Stack'
import { UNCAT, useBudget } from '../context/budgetContext'
import { currencyFormatter } from './utils'

export default function ViewExpenseModal({ budgetId, handleClose }) {
  const { getBudgetExpense, budgets, deleteBudget, deleteExpense } = useBudget()
  const budget =
    UNCAT === budgetId
      ? { name: 'Uncategorised', id: UNCAT }
      : budgets.find((bud) => bud.id === budgetId)
  const expense = getBudgetExpense(budgetId)
  return (
    <Modal show={budgetId != null} onHide={handleClose}>
      <Modal.Header>
        <Modal.Title className="w-100">
          <Stack direction="horizontal">
            <div className="me-auto">{budget?.name}&nbsp;Expenses</div>
            {budgetId !== UNCAT && (
              <Button
                variant="outline-danger"
                className="justify-self-flex-end"
                onClick={() => {
                  deleteBudget(budgetId)
                  handleClose()
                }}
              >
                Delete
              </Button>
            )}
          </Stack>
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Stack direction="vertical" gap="2">
          {expense.map((b) => (
            <Stack direction="horizontal" gap="2" key={b.id}>
              <div className="me-auto fs-4">{b.desc}</div>
              <div className="fs-5">{currencyFormatter.format(b.amount)}</div>
              <Button
                variant="outline-secondary"
                className="me-1"
                onClick={() => deleteExpense(b.id)}
                size="sm"
              >
                &times;
              </Button>
            </Stack>
          ))}
        </Stack>
      </Modal.Body>
      <Modal.Footer>
        <div className="text-align-right me-2">
          <Button
            variant="outline-primary"
            type="submit"
            className="ms-auto"
            onClick={handleClose}
          >
            Close
          </Button>
        </div>
      </Modal.Footer>
    </Modal>
  )
}
