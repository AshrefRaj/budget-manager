import React, { useContext } from 'react'
import { v4 as uuid } from 'uuid'
import useLocalStorage from '../hooks/useLocalStorage'

const BudgetContext = React.createContext()
export const UNCAT = 'uncategorised'
export function useBudget() {
  return useContext(BudgetContext)
}
export const BudgetProvider = ({ children }) => {
  const [budgets, setBudgets] = useLocalStorage('budgets', [])
  const [expenses, setExpenses] = useLocalStorage('expenses', [])
  const getBudgetExpense = (budgetId) => {
    return expenses.filter((expense) => expense.budgetId === budgetId)
  }
  const addBudget = ({ name, max }) => {
    setBudgets((prevBudgets) => {
      if (prevBudgets.find((budget) => budget.name === name)) return prevBudgets
      return [...prevBudgets, { id: uuid(), name, max }]
    })
  }
  const addExpense = ({ budgetId, desc, amount }) => {
    setExpenses((prevExpenses) => {
      return [...prevExpenses, { id: uuid(), budgetId, desc, amount }]
    })
  }
  const deleteExpense = (id) => {
    setExpenses((prevExpenses) => {
      return prevExpenses.filter((expense) => expense.id !== id)
    })
  }
  const deleteBudget = (id) => {
    setExpenses((prevExpenses) => {
      return prevExpenses.map((expense) => {
        if (expense.budgetId !== id) return expense
        return { ...expense, budgetId: UNCAT }
      })
    })
    setBudgets((prevBudgets) => {
      return prevBudgets.filter((budget) => budget.id !== id)
    })
  }

  return (
    <BudgetContext.Provider
      value={{
        budgets,
        expenses,
        getBudgetExpense,
        addExpense,
        deleteExpense,
        addBudget,
        deleteBudget,
      }}
    >
      {children}
    </BudgetContext.Provider>
  )
}
