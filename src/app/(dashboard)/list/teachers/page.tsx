import FormModal from "@/components/FormModal";
import Pagination from "@/components/Pagination";
import Table from "@/components/Table";
import TableSearch from "@/components/TableSearch";
import { role, teachersData } from "@/lib/data";
import prisma from "@/lib/prisma";
import { ITEM_PER_PAGE } from "@/lib/setting";
import { Class, Prisma, Subject, Teacher } from "@prisma/client";
import Image from "next/image";
import Link from "next/link";

const columns = [
  {
    header: "Info",
    accessor: "info",
  },
  {
    header: "Teacher ID",
    accessor: "teacherId",
    className: "hidden md:table-cell",
  },
  {
    header: "Subjects",
    accessor: "subjects",
    className: "hidden md:table-cell",
  },
  {
    header: "Classes",
    accessor: "classes",
    className: "hidden md:table-cell",
  },
  {
    header: "Phone",
    accessor: "phone",
    className: "hidden lg:table-cell",
  },
  {
    header: "Address",
    accessor: "address",
    className: "hidden lg:table-cell",
  },
  {
    header: "Actions",
    accessor: "action",
  },
];

type TeacherList = Teacher & { subjects: Subject[] } & { classes: Class[] };
// Genere les lignes de la table
const RenderRow = (item: TeacherList) => (
  <tr
    key={item.id}
    className=" border-b border-gray-200 even:bg-slate-50 text-sm hover:bg-lamaPurpleLight transition-colors"
  >
    <td className=" flex items-center gap-4 p-4">
      <Image
        src={item.img || "/noAvatar.png"}
        width={40}
        height={40}
        alt=""
        className=" md:hidden xl:block w-10 h-10 rounded-full object-cover"
      />
      <div className=" flex flex-col">
        <h3 className=" font-semibold">{item.name}</h3>
        <p className=" text-xs text-gray-500">{item.email}</p>
      </div>
    </td>
    <td className=" hidden md:table-cell">{item.username}</td>
    <td className=" hidden md:table-cell">
      {item.subjects.map((subject) => subject.name).join(",")}
    </td>
    <td className=" hidden md:table-cell">
      {item.classes.map((classe) => classe.name).join(",")}
    </td>
    <td className=" hidden lg:table-cell">{item.phone}</td>
    <td className=" hidden lg:table-cell">{item.address}</td>
    <td>
      <div className=" flex items-center gap-2">
        <Link href={`/list/teachers/${item.id}`}>
          <button className="w-7 h-7 flex items-center justify-center rounded-full bg-lamaSky">
            <Image src="/view.png" alt="" width={16} height={16} />
          </button>
        </Link>
        {role === "admin" && (
          <>
            {/* <FormModal table="teacher" type="update" id={item.id} /> */}
            <FormModal table="teacher" type="delete" id={item.id} />
          </>
        )}
      </div>
    </td>
  </tr>
);

const TeacherListPage = async ({
  searchParams,
}: {
  searchParams: { [key: string]: string | undefined };
}) => {
  const { page, ...queryParams } = searchParams;

  const p = page ? parseInt(page) : 1;

  // URL params condition
  const query: Prisma.TeacherWhereInput = {};

  if (queryParams) {
    for (const [key, value] of Object.entries(queryParams)) {
      if (value !== undefined) {
        switch (key) {
          case "classId":
            query.lessons = {
              some: {
                classId: parseInt(value),
              },
            };
            break;
          case "search":
            query.name = {
              contains: value,
              mode: "insensitive",
            };
            break;
          default:
            break;
        }
      }
    }
  }

  // Requete vers la base de donnéés
  const [data, count] = await prisma.$transaction([
    prisma.teacher.findMany({
      where: query,
      include: {
        subjects: true,
        classes: true,
      },
      take: ITEM_PER_PAGE,
      skip: ITEM_PER_PAGE * (p - 1),
    }),
    prisma.teacher.count({ where: query }),
  ]);

  // console.log(data);☻
  // console.log(count);

  return (
    <div className=" bg-white p-4 rounded-md m-4 mt-0 flex-1">
      {/* TOP */}
      <div className=" flex items-center justify-between">
        <h1 className=" hidden md:block text-lg font-semibold">
          Tous les enseignants
        </h1>
        <div className=" flex flex-col md:flex-row items-center gap-4 w-full md:w-auto">
          <TableSearch />
          <div className=" flex items-center self-end gap-4">
            <button className="w-8 h-8 flex items-center justify-center rounded-full bg-lamaYellow">
              <Image src={"/filter.png"} alt="" width={14} height={14} />
            </button>
            <button className="w-8 h-8 flex items-center justify-center rounded-full bg-lamaYellow">
              <Image src={"/sort.png"} alt="" width={14} height={14} />
            </button>
            {role === "admin" && (
              // Le formulaire de creation de teacher
              <FormModal table="teacher" type="create" />
            )}
          </div>
        </div>
      </div>
      {/* LIST */}
      <div className="">
        {/* Le composant qui créer la table prend en paramètre le tableau qui contient les colonnes et la fonction qui generent les lignes */}
        <Table columns={columns} renderRow={RenderRow} data={data} />
      </div>
      {/* PAGINATION */}
      <div className="">
        {/* c'est le composant qui charge les choffre de la pagination */}
        <Pagination page={p} count={count} />
      </div>
    </div>
  );
};

export default TeacherListPage;
