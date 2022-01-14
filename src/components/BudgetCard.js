import React from 'react'
import Card from 'react-bootstrap/Card'
import ProgressBar from 'react-bootstrap/ProgressBar'
import Stack from 'react-bootstrap/Stack'
import Button from 'react-bootstrap/Button'
import currencyFormatter from './utils'

function BudgetCard({
  name,
  amount,
  max,
  gray,
  addexpenseByBudget,
  NoStack,
  onViewExpense,
}) {
  const bgcolor = []
  if (amount > max) {
    bgcolor.push('bg-danger', 'bg-opacity-10')
  } else if (gray) {
    bgcolor.push('bg-light')
  }
  return (
    <Card className={`${bgcolor.join(' ')} mb-2`}>
      <Card.Body>
        <Card.Title className="d-flex justify-content-between align-items-baseline fw-normal mb-3">
          <div className="me-2">{name}</div>
          <div className="d-flex align-items-baseline">
            {currencyFormatter.format(amount)}
            {max && (
              <span className="text-muted ms-1 fs-6">
                / {currencyFormatter.format(max)}
              </span>
            )}
          </div>
        </Card.Title>
        {max && (
          <ProgressBar
            className="rounded-pill mt-4"
            variant={getProgressBarVariant(amount, max)}
            min={0}
            max={max}
            now={amount}
          />
        )}
        {!NoStack && (
          <Stack direction="horizontal" gap="2" className="mt-4">
            <Button
              variant="outline-primary"
              className="ms-auto"
              onClick={addexpenseByBudget}
            >
              Add Expense
            </Button>
            {amount > 0 && (
              <Button variant="outline-secondary" onClick={onViewExpense}>
                View Expense
              </Button>
            )}
          </Stack>
        )}
      </Card.Body>
    </Card>
  )
}
const getProgressBarVariant = (amount, max) => {
  const ratio = amount / max
  if (ratio < 0.5) return 'primary'
  if (ratio <= 0.75) return 'warning'
  return 'danger'
}

export default BudgetCard
