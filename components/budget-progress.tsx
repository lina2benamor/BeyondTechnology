"use client"

import { Cell, Pie, PieChart, ResponsiveContainer, Tooltip } from "@/components/ui/chart"
import { Progress } from "@/components/ui/progress"

const data = [
  { name: "Food & Dining", value: 420.5, budget: 500, color: "#6366f1" },
  { name: "Transportation", value: 250.75, budget: 300, color: "#8b5cf6" },
  { name: "Entertainment", value: 180.25, budget: 200, color: "#ec4899" },
  { name: "Shopping", value: 310.39, budget: 250, color: "#f43f5e" },
  { name: "Utilities", value: 84, budget: 150, color: "#10b981" },
]

export function BudgetProgress() {
  return (
    <div className="space-y-4">
      <div className="h-[200px]">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie data={data} cx="50%" cy="50%" innerRadius={60} outerRadius={80} paddingAngle={2} dataKey="value">
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Pie>
            <Tooltip
              content={({ active, payload }) => {
                if (active && payload && payload.length) {
                  return (
                    <div className="rounded-lg border bg-background p-2 shadow-sm">
                      <div className="grid grid-cols-2 gap-2">
                        <div className="flex flex-col">
                          <span className="text-[0.70rem] uppercase text-muted-foreground">Category</span>
                          <span className="font-bold text-muted-foreground">{payload[0].name}</span>
                        </div>
                        <div className="flex flex-col">
                          <span className="text-[0.70rem] uppercase text-muted-foreground">Spent</span>
                          <span className="font-bold">${payload[0].value.toFixed(2)}</span>
                        </div>
                      </div>
                    </div>
                  )
                }
                return null
              }}
            />
          </PieChart>
        </ResponsiveContainer>
      </div>
      <div className="space-y-2">
        {data.map((category, index) => (
          <div key={index} className="space-y-1">
            <div className="flex items-center justify-between text-sm">
              <div className="flex items-center">
                <div className="mr-2 h-3 w-3 rounded-full" style={{ backgroundColor: category.color }} />
                <span>{category.name}</span>
              </div>
              <span>
                ${category.value} / ${category.budget}
              </span>
            </div>
            <Progress
              value={(category.value / category.budget) * 100}
              className="h-2"
              indicatorClassName={category.value > category.budget ? "bg-destructive" : ""}
            />
          </div>
        ))}
      </div>
    </div>
  )
}
