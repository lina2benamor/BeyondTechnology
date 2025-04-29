import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Overview } from "@/components/overview"
import { RecentExpenses } from "@/components/recent-expenses"
import { BudgetProgress } from "@/components/budget-progress"
import { DollarSign, CreditCard, Wallet } from "lucide-react"

export default function Home() {
  return (
    <div className="flex min-h-screen w-full flex-col">
      <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-8">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold tracking-tight">Expense Tracker Dashboard</h1>
          <div className="flex items-center gap-2">
            <Link href="/add-expense">
              <Button>
                <DollarSign className="mr-2 h-4 w-4" />
                Add Expense
              </Button>
            </Link>
            <Link href="/budgets">
              <Button variant="outline">
                <Wallet className="mr-2 h-4 w-4" />
                Manage Budgets
              </Button>
            </Link>
          </div>
        </div>
        <div className="grid gap-4 md:grid-cols-3">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Expenses</CardTitle>
              <DollarSign className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">$1,245.89</div>
              <p className="text-xs text-muted-foreground">+20.1% from last month</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Budget Remaining</CardTitle>
              <Wallet className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">$754.11</div>
              <p className="text-xs text-muted-foreground">38% of budget left</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Largest Category</CardTitle>
              <CreditCard className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">Food & Dining</div>
              <p className="text-xs text-muted-foreground">$420.50 (33.7%)</p>
            </CardContent>
          </Card>
        </div>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
          <Card className="lg:col-span-4">
            <CardHeader>
              <CardTitle>Monthly Overview</CardTitle>
              <CardDescription>Your expense trend for the past 6 months</CardDescription>
            </CardHeader>
            <CardContent className="pl-2">
              <Overview />
            </CardContent>
          </Card>
          <Card className="lg:col-span-3">
            <CardHeader>
              <CardTitle>Budget Progress</CardTitle>
              <CardDescription>Your spending by category vs budget</CardDescription>
            </CardHeader>
            <CardContent>
              <BudgetProgress />
            </CardContent>
          </Card>
        </div>
        <Card>
          <CardHeader>
            <CardTitle>Recent Expenses</CardTitle>
            <CardDescription>You've added 12 expenses this month</CardDescription>
          </CardHeader>
          <CardContent>
            <RecentExpenses />
          </CardContent>
        </Card>
      </main>
    </div>
  )
}
