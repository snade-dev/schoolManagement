"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

// USE LAZY LOADING

// import TeacherForm from "./forms/TeacherForm";
// import StudentForm from "./forms/StudentForm";
import dynamic from "next/dynamic";

const TeacherForms = dynamic(() => import("./forms/TeacherForms"), {
  loading: () => <h1>Loading...</h1>,
});
const StudentForms = dynamic(() => import("./forms/StudentForms"), {
  loading: () => <h1>Loading...</h1>,
});


const forms: {
  [key: string]: (type: "create" | "update", data?: any) => JSX.Element;
} = {
  teacher : (type, data) => <TeacherForms type={type} data={data} />,
  student : (type, data) => <StudentForms type={type} data={data} />
}

const FormModal = ({
  table,
  type,
  data,
  id,
}: {
  // le nom de la table envoyer en props
  table:
    | "teacher"
    | "student"
    | "parent"
    | "subject"
    | "class"
    | "lesson"
    | "exam"
    | "assignment"
    | "result"
    | "attendance"
    | "event"
    | "announcement";
  type: "create" | "update" | "delete";
  data?: any;
  id?: number | string;
}) => {
  const size = type === "create" ? "w-8 h-8" : "w-7 h-7";
  const bgColor =
    type === "create"
      ? "bg-lamaYellow"
      : type === "update"
      ? "bg-lamaSky"
      : "bg-lamaPurple";

  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    // Cleanup on unmount
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  const Form = () => {
    // si c'est un formulaire de suppression 
    return type === "delete" && id ? (
      <form action="" className="p-4 flex flex-col gap-4">
        <span className="text-center font-medium">
          Toutes les données seront perdu.Ête vous sure de vouloir supprimer l&apos;
          {table}?
        </span>
        <button className="bg-red-700 text-white py-2 px-4 rounded-md border-none w-max self-center">
          Delete
        </button>
      </form>
    ) : type === "create" || type === "update" ? (
      // si c'est un formulaire de creation ou de modification
      forms[table](type, data)
    ): (
      "Form not found"
    );
  };

  return (
    <>
      <button
        className={`${size} flex items-center justify-center rounded-full ${bgColor}`}
        onClick={() => setOpen(true)}
      >
        <Image src={`/${type}.png`} alt="" width={16} height={16} />
      </button>
      {open && (
        <div className="w-full min-h-screen absolute left-0 top-0 bg-black bg-opacity-60 z-50 flex items-center justify-center">
          <div className="bg-white p-4 rounded-md relative w-[90%] md:w-[70%] lg:w-[60%] xl:w-[50%] 2xl:w-[40%]">
            <Form />
            <div
              className="absolute top-4 right-4 cursor-pointer"
              onClick={() => setOpen(false)}
            >
              <Image src="/close.png" alt="" width={14} height={14} />
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default FormModal;
