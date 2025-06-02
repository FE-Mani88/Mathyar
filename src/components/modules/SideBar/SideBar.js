'use client'
import React from "react";
import {
  Card,
  Typography,
  List,
  ListItem,
  ListItemPrefix,
  ListItemSuffix,
  Chip,
  Accordion,
  AccordionHeader,
  AccordionBody,
} from "@material-tailwind/react";
import {
  PresentationChartBarIcon,
  ShoppingBagIcon,
  UserCircleIcon,
  Cog6ToothIcon,
  InboxIcon,
  PowerIcon,
} from "@heroicons/react/24/solid";
import { ChevronRightIcon, ChevronDownIcon } from "@heroicons/react/24/outline";
import Link from "next/link";

export default function SideBar({ isOpen, user }) {
  const [open, setOpen] = React.useState(0);

  const handleOpen = (value) => {
    setOpen(open === value ? 0 : value);
  };


  return (
    <Card className={`rtl customize-sidebar dark:!bg-[#36454F] rounded-none transition-all duration-500 ease-in-out transform h-[calc(100vh-2rem)] w-full max-w-[20rem] p-4 shadow-xl shadow-blue-gray-900/5 dark:bg-white bg-[#374151] sm:!hidden fixed top-4 left-0 z-50 ${isOpen ? '' : '!left-[-300px]'
      }`}>
      <div className="mb-2 p-4 text-center">
        <Typography variant="h5" color="blue-gray">
          سلام {user?.username} عزیز
        </Typography>
      </div>
      <List className="">
        <Accordion
        className="pb-2"
          open={open === 1}
          icon={
            <ChevronDownIcon
              strokeWidth={2.5}
              className={`mx-auto h-4 w-4 transition-transform ${open === 1 ? "rotate-180" : ""}`}
            />
          }
        >
          <ListItem className="p-0" selected={open === 1}>
            <AccordionHeader onClick={() => handleOpen(1)} className="border-b-0 p-3">
              <ListItemPrefix>
                <PresentationChartBarIcon className="h-5 w-5" />
              </ListItemPrefix>
              <Typography color="blue-gray" className="mr-auto font-normal">
                منوی صفحات
              </Typography>
            </AccordionHeader>
          </ListItem>
          <AccordionBody className="py-4">
            {open === 1 && (
              <List className="p-0">
                <ListItem className="flex gap-4 hover:bg-blue-400 hover:text-white">
                  <ListItemPrefix>
                    <ChevronRightIcon strokeWidth={3} className="h-3 w-5" />
                  </ListItemPrefix>
                  <p className="">درباره ما</p>
                </ListItem>
                <ListItem className="flex gap-4 hover:bg-blue-400 hover:text-white">
                  <ListItemPrefix>
                    <ChevronRightIcon strokeWidth={3} className="h-3 w-5" />
                  </ListItemPrefix>
                  <p className="">آزمون ها</p>
                </ListItem>
              </List>
            )}
          </AccordionBody>
        </Accordion>
        {/* Items */}
        <ListItem className="flex gap-2 cxykh c0ayg c4wey cl6ef cf4pm cqbpd cxmkl c4aul c76qn hover:bg-[#0070f3] hover:text-white">
          <ListItemPrefix>
            <UserCircleIcon className="h-5 w-5" />
          </ListItemPrefix>
          <Link href='/dashboard'>
            داشبورد
          </Link>
        </ListItem>
      </List>
    </Card>
  );
}