export type Category = {
  id: number
  userId?: string | null
  name: string
  iconName: string
  type: "income" | "expense"
}