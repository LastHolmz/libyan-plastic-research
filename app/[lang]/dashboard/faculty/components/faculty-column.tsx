"use client";
import * as React from "react";
import { ColumnDef } from "@tanstack/react-table";
import { MoreHorizontal } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { toast } from "@/hooks/use-toast";
import { FacultyMember } from "@prisma/client";
import { DeleteFacultyMemberForm, UpdateFacultyMemberForm } from "./forms";
import NotFoundTable from "@/components/not-found-table";
import Image from "next/image";
import { CustomLink } from "@/components/custom-link";

export const facultyTable: ColumnDef<FacultyMember>[] = [
  {
    accessorKey: "صورة العضو",
    header: "صورة العضو",
    cell: ({ row }) => {
      const picture = row.original?.picture;
      if (!picture) {
        return <NotFoundTable />;
      }
      return (
        <div className="overflow-hidden rounded-md h-12 w-12 aspect-square">
          <Image
            src={picture}
            alt={`${row.original.fullName}-image`}
            width={100}
            height={100}
            className=" w-full h-full object-cover"
          />
        </div>
      );
    },
  },
  {
    accessorKey: "الاسم",
    header: "الاسم",
    cell: ({ row }) => {
      if (row) {
        const fullName = row.original?.fullName;
        return <div>{fullName ?? "لايوجد"}</div>;
      } else {
        return <div>لايوجد</div>;
      }
    },
  },
  {
    accessorKey: "الاسم الأجنبي",
    header: "الاسم الأجنبي",
    cell: ({ row }) => {
      if (row) {
        const fullName = row.original?.enName;
        return <div>{fullName ?? "لايوجد"}</div>;
      } else {
        return <div>لايوجد</div>;
      }
    },
  },
  {
    accessorKey: "التخصص",
    header: "التخصص",
    cell: ({ row }) => {
      if (row) {
        const specialization = row.original?.specialization;
        return <div>{specialization}</div>;
      } else {
        return <div>لايوجد</div>;
      }
    },
  },
  {
    accessorKey: "التخصص الاجنبي",
    header: "التخصص الاجنبي",
    cell: ({ row }) => {
      if (row) {
        const enSpecialization = row.original?.enSpecialization;
        return <div>{enSpecialization}</div>;
      } else {
        return <div>لايوجد</div>;
      }
    },
  },
  {
    accessorKey: "cv",
    header: "cv",
    cell: ({ row }) => {
      const cv = row.original?.cv;
      if (row && cv) {
        return (
          <CustomLink variant={"link"} target="_blank" href={cv}>
            تحميل
          </CustomLink>
        );
      } else {
        return <div>لايوجد</div>;
      }
    },
  },

  {
    id: "actions",
    header: "الأحداث",
    enableHiding: false,
    cell: ({ row }) => {
      const user = row.original;
      return (
        <DropdownMenu dir="rtl">
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">افتح الأحداث</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>الأحداث</DropdownMenuLabel>
            <DropdownMenuItem
              onClick={() => {
                navigator.clipboard.writeText(String(user.fullName));
                toast({
                  className: "bg-primary text-white",
                  description: "تم نسخ الاسم بنجاح",
                });
              }}
            >
              نسح الاسم
            </DropdownMenuItem>

            <DropdownMenuSeparator />
            <DropdownMenuItem onSelect={(e) => e.preventDefault()}>
              <UpdateFacultyMemberForm user={user} />
            </DropdownMenuItem>
            <DropdownMenuItem onSelect={(e) => e.preventDefault()}>
              <DeleteFacultyMemberForm id={user.id} />
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
