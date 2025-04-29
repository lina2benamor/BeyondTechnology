"use client"

import { useState } from "react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Coffee, ShoppingBag, Car, Film, Home, MoreVertical, Pencil, Trash2 } from "lucide-react"

const expenses = [
  {
    id: "1",
    date: "2023-06-15",
    description: "Grocery Shopping",
    category: "Food & Dining",
    amount: 85.75,
    icon: Coffee,
  },
  {
    id: "2",
    date: "2023-06-14",
    description: "Gas Station",
    category: "Transportation",
    amount: 45.5,
    icon: Car,
  },
  {
    id: "3",
    date: "2023-06-12",
    description: "Movie Tickets",
    category: "Entertainment",
    amount: 32.0,
    icon: Film,
  },
  {
    id: "4",
    date: "2023-06-10",
    description: "New Shoes",
    category: "Shopping",
    amount: 89.99,
    icon: ShoppingBag,
  },
  {
    id: "5",
    date: "2023-06-08",
    description: "Electricity Bill",
    category: "Utilities",
    amount: 84.0,
    icon: Home,
  },
]

export function RecentExpenses() {
  const [expenseList, setExpenseList] = useState(expenses)

  const deleteExpense = (id: string) => {
    setExpenseList(expenseList.filter((expense) => expense.id !== id))
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return new Intl.DateTimeFormat("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    }).format(date)
  }

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Date</TableHead>
          <TableHead>Description</TableHead>
          <TableHead>Category</TableHead>
          <TableHead className="text-right">Amount</TableHead>
          <TableHead className="w-[50px]"></TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {expenseList.map((expense) => {
          const Icon = expense.icon
          return (
            <TableRow key={expense.id}>
              <TableCell>{formatDate(expense.date)}</TableCell>
              <TableCell>{expense.description}</TableCell>
              <TableCell>
                <div className="flex items-center gap-2">
                  <Icon className="h-4 w-4 text-muted-foreground" />
                  <span>{expense.category}</span>
                </div>
              </TableCell>
              <TableCell className="text-right font-medium">${expense.amount.toFixed(2)}</TableCell>
              <TableCell>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon">
                      <MoreVertical className="h-4 w-4" />
                      <span className="sr-only">Open menu</span>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuLabel>Actions</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem>
                      <Pencil className="mr-2 h-4 w-4" />
                      Edit
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => deleteExpense(expense.id)}>
                      <Trash2 className="mr-2 h-4 w-4" />
                      Delete
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </TableCell>
            </TableRow>
          )
        })}
      </TableBody>
    </Table>
  )
}
