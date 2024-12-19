import { CustomLink } from "@/components/custom-link";
import LangRenderer from "@/components/lang";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import Link from "next/link";

const NotFound = async () => {
  return (
    <main className="phone-only:px-4 h-[75vh] py-2 bg-secondary">
      <Breadcrumb className="my-2" dir="rtl">
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink asChild>
              <Link href={`/`}>الرئيسية</Link>
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbLink asChild>
              <Link href={`/ar/research-and-studies`}>
                {" "}
                <LangRenderer
                  ar={"البحوث و الدراسات"}
                  en={"Research & Studies"}
                />
              </Link>
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>{"404"}</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
      <div className="my-4 md:container content-center h-full text-center">
        <h1 className="text-red-500 font-bold text-6xl">404</h1>
        <p className="mb-2">لم يتم ايجاد المقالة</p>
        <CustomLink href="/articles">كل المقالات</CustomLink>
      </div>
    </main>
  );
};

export default NotFound;
