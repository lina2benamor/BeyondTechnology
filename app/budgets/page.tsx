"use client"

import { useState } from "react"
import Link from "next/link"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"
import { ArrowLeft, Plus, Save, Trash2 } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Progress } from "@/components/ui/progress"

const formSchema = z.object({
  category: z.string({
    required_error: "Please select a category.",
  }),
  amount: z.string().refine((val) => !isNaN(Number(val)) && Number(val) > 0, {
    message: "Amount must be a positive number.",
  }),
})

const initialBudgets = [
  { id: "1", category: "Food & Dining", amount: 500, spent: 420.5 },
  { id: "2", category: "Transportation", amount: 300, spent: 250.75 },
  { id: "3", category: "Entertainment", amount: 200, spent: 180.25 },
  { id: "4", category: "Shopping", amount: 250, spent: 310.39 },
  { id: "5", category: "Utilities", amount: 150, spent: 84 },
]

export default function BudgetsPage() {
  const [budgets, setBudgets] = useState(initialBudgets)
  const [isEditing, setIsEditing] = useState(false)

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      amount: "",
    },
  })

  function onSubmit(values: z.infer<typeof formSchema>) {
    const newBudget = {
      id: Date.now().toString(),
      category: values.category,
      amount: Number.parseFloat(values.amount),
      spent: 0,
    }

    setBudgets([...budgets, newBudget])
    form.reset()
  }

  const deleteBudget = (id: string) => {
    setBudgets(budgets.filter((budget) => budget.id !== id))
  }

  const getProgressColor = (spent: number, amount: number) => {
    const percentage = (spent / amount) * 100
    if (percentage > 90) return "bg-destructive"
    if (percentage > 75) return "bg-amber-500"
    return ""
  }

  return (
    <div className="container mx-auto py-8">
      <div className="mb-6">
        <Link href="/" className="flex items-center text-sm text-muted-foreground hover:text-foreground">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Dashboard
        </Link>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <div>
          <Card>
            <CardHeader>
              <CardTitle>Budget Categories</CardTitle>
              <CardDescription>Manage your monthly budget limits by category</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {budgets.map((budget) => (
                  <div key={budget.id} className="space-y-2">
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="font-medium">{budget.category}</h3>
                        <p className="text-sm text-muted-foreground">
                          ${budget.spent.toFixed(2)} / ${budget.amount.toFixed(2)}
                        </p>
                      </div>
                      <div className="flex items-center gap-2">
                        {isEditing && (
                          <Button variant="ghost" size="icon" onClick={() => deleteBudget(budget.id)}>
                            <Trash2 className="h-4 w-4" />
                            <span className="sr-only">Delete</span>
                          </Button>
                        )}
                      </div>
                    </div>
                    <Progress
                      value={(budget.spent / budget.amount) * 100}
                      className="h-2"
                      indicatorClassName={getProgressColor(budget.spent, budget.amount)}
                    />
                  </div>
                ))}

                <div className="flex justify-between pt-4">
                  <Button variant="outline" size="sm" onClick={() => setIsEditing(!isEditing)}>
                    {isEditing ? (
                      <>
                        <Save className="mr-2 h-4 w-4" />
                        Done
                      </>
                    ) : (
                      <>
                        <Trash2 className="mr-2 h-4 w-4" />
                        Edit Budgets
                      </>
                    )}
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div>
          <Card>
            <CardHeader>
              <CardTitle>Add New Budget</CardTitle>
              <CardDescription>Create a new budget category with a monthly limit</CardDescription>
            </CardHeader>
            <CardContent>
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                  <FormField
                    control={form.control}
                    name="category"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Category</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select a category" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="Food & Dining">Food & Dining</SelectItem>
                            <SelectItem value="Transportation">Transportation</SelectItem>
                            <SelectItem value="Entertainment">Entertainment</SelectItem>
                            <SelectItem value="Shopping">Shopping</SelectItem>
                            <SelectItem value="Utilities">Utilities</SelectItem>
                            <SelectItem value="Housing">Housing</SelectItem>
                            <SelectItem value="Healthcare">Healthcare</SelectItem>
                            <SelectItem value="Personal">Personal</SelectItem>
                            <SelectItem value="Education">Education</SelectItem>
                            <SelectItem value="Travel">Travel</SelectItem>
                            <SelectItem value="Other">Other</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormDescription>Select a category for this budget</FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="amount"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Monthly Limit ($)</FormLabel>
                        <FormControl>
                          <Input placeholder="0.00" {...field} />
                        </FormControl>
                        <FormDescription>How much do you want to budget for this category each month?</FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <Button type="submit" className="w-full">
                    <Plus className="mr-2 h-4 w-4" />
                    Add Budget
                  </Button>
                </form>
              </Form>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
