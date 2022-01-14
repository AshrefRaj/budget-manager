import Container from 'react-bootstrap/Container'
import Stack from 'react-bootstrap/Stack'
import Button from 'react-bootstrap/Button'
import BudgetCard from './components/BudgetCard'
import AddBudgetModal from './components/addBudgetModal'
import AddExpenseModal from './components/addExpenseModal'
import UnCategorisedBudgetCard from './components/UnCategorisedBudgetCard'
import { useState } from 'react'
import { UNCAT, useBudget } from './context/budgetContext'
import TotalBudgetCard from './components/TotalBudgetCard'
import ViewExpenseModal from './components/viewExpenseModal'

function App() {
  const [showAddBudget, setShowAddBudget] = useState(false)
  const [showAddExpense, setShowAddExpense] = useState(false)
  const [addExpenseByBudget, setAddExpenseByBudget] = useState()
  const [viewExpenseByBudget, setViewExpenseByBudget] = useState()
  const { budgets, getBudgetExpense } = useBudget()
  const addexpenseByBudget = (id) => {
    setShowAddExpense(true)
    setAddExpenseByBudget(id)
  }
  return (
    <>
      <Container className="my-4">
        <Stack direction="horizontal" gap="2" className="mb-4">
          <h1 className="me-auto">Budget Manager</h1>
          <Button
            variant="primary"
            onClick={() => {
              setShowAddBudget(!showAddBudget)
            }}
          >
            Add Budget
          </Button>
          <Button variant="outline-primary" onClick={addexpenseByBudget}>
            Add Expense
          </Button>
        </Stack>
        <div
          className="d-grid"
          style={{
            gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
            gap: '1rem',
            alignItems: 'flex-start',
          }}
        >
          {budgets.map((budget) => {
            const amount = getBudgetExpense(budget.id).reduce(
              (total, expense) => total + expense.amount,
              0,
            )
            return (
              <BudgetCard
                key={budget.id}
                name={budget.name}
                amount={amount}
                max={budget.max}
                addexpenseByBudget={() => addexpenseByBudget(budget.id)}
                onViewExpense={() => setViewExpenseByBudget(budget.id)}
              />
            )
          })}
          <UnCategorisedBudgetCard
            gray
            name="Uncategorised"
            addexpenseByBudget={addexpenseByBudget}
            onViewExpense={() => setViewExpenseByBudget(UNCAT)}
          />
          <TotalBudgetCard />
        </div>
      </Container>
      <AddBudgetModal
        show={showAddBudget}
        handleClose={() => {
          setShowAddBudget(false)
        }}
      />
      <AddExpenseModal
        show={showAddExpense}
        handleClose={() => {
          setShowAddExpense(false)
        }}
        defaultBudgetId={addExpenseByBudget}
      />
      <ViewExpenseModal
        budgetId={viewExpenseByBudget}
        handleClose={() => setViewExpenseByBudget()}
      />
    </>
  )
}

export default App
