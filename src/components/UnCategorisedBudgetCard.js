import BudgetCard from './BudgetCard'
import { UNCAT, useBudget } from '../context/budgetContext'

export default function UnCategorisedBudgetCard(props) {
  const { getBudgetExpense } = useBudget()
  const amount = getBudgetExpense(UNCAT).reduce(
    (total, expense) => total + expense.amount,
    0,
  )
  if (amount === 0) return null
  return <BudgetCard {...props} amount={amount} />
}
