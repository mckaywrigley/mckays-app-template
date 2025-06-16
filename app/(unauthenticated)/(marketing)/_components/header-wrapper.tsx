import { getCustomerByUserId } from "@/actions/customers"
import { SelectCustomer } from "@/db/schema/customers"
import { currentUser } from "@clerk/nextjs/server"
import { Header } from "./header"

export async function HeaderWrapper() {
  const user = await currentUser()
  let membership: SelectCustomer["membership"] | null = null

  if (user) {
    const customer = await getCustomerByUserId(user.id)
    membership = customer?.membership ?? "free"
  }

  return <Header userMembership={membership} />
}
