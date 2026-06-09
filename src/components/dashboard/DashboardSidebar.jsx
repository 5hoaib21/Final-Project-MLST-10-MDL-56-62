import { getUserSession } from "@/lib/core/session";
import {
  LayoutSideContentLeft,
  Bell,
  Envelope,
  Gear,
  House,
  Magnifier,
  Person,
  Briefcase,
  Bookmark,
  FileText,
  LayoutSideContent,
  CreditCard,
} from "@gravity-ui/icons";
import { Button, Drawer } from "@heroui/react";
import Link from "next/link";

export async function DashboardSidebar() {

  const user = await getUserSession()

  const recruiterNavLinks = [
    { icon: House, href: "/dashboard/recruiter", label: "Home" },
    { icon: Magnifier, href: "/dashboard/recruiter/jobs", label: "Jobs" },
    { icon: Bell, href: "/dashboard/recruiter/jobs/new", label: "Post a Job" },
    {
      icon: Briefcase,
      href: "/dashboard/recruiter/company",
      label: "Company Profile",
    },
    { icon: Envelope, href: "/dashboard/recruiter", label: "Messages" },
    { icon: Person, href: "/dashboard/recruiter", label: "Profile" },
    { icon: Gear, href: "/dashboard/recruiter", label: "Settings" },
  ];

  const seekerNavLinks = [
    { icon: LayoutSideContent, href: "/dashboard", label: "Dashboard" },
    { icon: Magnifier, href: "/jobs", label: "Jobs" },
    { icon: Bookmark, href: "/dashboard/saved-jobs", label: "Saved Jobs" },
    { icon: FileText, href: "/dashboard/applications", label: "Applications" },
    { icon: CreditCard, href: "/plans", label: "Billing" },
    { icon: Gear, href: "/dashboard/settings", label: "Settings" },
  ];

  const navLinksMap = {
    seeker : seekerNavLinks,
    recruiter: recruiterNavLinks
  }

  const navItems = navLinksMap[user?.role || 'seeker'];

  const navContent = (
    <nav className="flex flex-col gap-1">
      {navItems.map((item) => (
        <Link
          href={item.href}
          key={item.label}
          className="flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm text-foreground transition-colors hover:bg-default"
          type="button"
        >
          <item.icon className="size-5 text-muted" />
          {item.label}
        </Link>
      ))}
    </nav>
  );
  return (
    <>
      <aside className="hidden w-64 shrink-0 border-r border-default p-4 lg:block">
        {navContent}
      </aside>
      <Drawer>
        <Button className={"lg:hidden"} variant="secondary">
          <LayoutSideContentLeft />
          Sidebar
        </Button>
        <Drawer.Backdrop>
          <Drawer.Content placement="left">
            <Drawer.Dialog>
              <Drawer.CloseTrigger />
              <Drawer.Header>
                <Drawer.Heading>Navigation</Drawer.Heading>
              </Drawer.Header>
              <Drawer.Body>{navContent}</Drawer.Body>
            </Drawer.Dialog>
          </Drawer.Content>
        </Drawer.Backdrop>
      </Drawer>
    </>
  );
}
