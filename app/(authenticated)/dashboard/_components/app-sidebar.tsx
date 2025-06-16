"use client"

import { Link, Settings2, User, Users } from "lucide-react"
import * as React from "react"

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail
} from "@/components/ui/sidebar"
import { NavMain } from "../_components/nav-main"
import { NavUser } from "../_components/nav-user"
import { TeamSwitcher } from "../_components/team-switcher"

export function AppSidebar({
  userData,
  ...props
}: React.ComponentProps<typeof Sidebar> & {
  userData: {
    name: string
    email: string
    avatar: string
    membership: string
  }
}) {
  const data = {
    user: userData,
    teams: [
      {
        name: "Personal",
        logo: User,
        plan: "Account"
      },
      {
        name: "Team 1",
        logo: Users,
        plan: "Team"
      },
      {
        name: "Team 2",
        logo: Users,
        plan: "Team"
      },
      {
        name: "Team 3",
        logo: Users,
        plan: "Team"
      }
    ],
    navMain: [
      {
        title: "Nav Item 1",
        url: "#",
        icon: Link,
        items: [
          {
            title: "Sub Item 1",
            url: "/dashboard/nav-item-1"
          },
          {
            title: "Sub Item 2",
            url: "/dashboard/nav-item-2"
          }
        ]
      },
      {
        title: "Nav Item 2",
        url: "#",
        icon: Link,
        items: [
          {
            title: "Sub Item 1",
            url: "/dashboard/nav-item-1"
          }
        ]
      },
      {
        title: "Settings",
        url: "#",
        icon: Settings2,
        items: [
          {
            title: "General",
            url: "/dashboard/settings"
          }
        ]
      }
    ]
  }
  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <TeamSwitcher teams={data.teams} />
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={data.user} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  )
}
