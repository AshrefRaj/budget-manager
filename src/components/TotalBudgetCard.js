import BudgetCard from './BudgetCard'
import { useBudget } from '../context/budgetContext'

export default function TotalBudgetCard() {
  const { budgets, expenses } = useBudget()
  const amount = expenses.reduce((total, expense) => total + expense.amount, 0)
  const max = budgets.reduce((total, budget) => total + budget.max, 0)
  return (
    <BudgetCard
      name="Total"
      amount={amount}
      gray
      max={max}
      NoStack
    ></BudgetCard>
  )
}
