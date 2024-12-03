"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import InputField from "../InputField";
import { z } from "zod";
import Image from "next/image";

const schema = z.object({
  userName: z
    .string()
    .min(3, {
      message: "Le nom d'utilisateur doit etre d'au moins 3 charactère",
    })
    .max(20, {
      message: "Le nom d'utilisateur doit etre d'au max 20 charactère",
    }),
  email: z.string().email({ message: "Adresse email invalide" }),
  password: z
    .string()
    .min(6, { message: "Le mot de passe doit etre d'au moins 6 charactères" }),
  firstName: z.string().min(6, { message: "Le surnom est requis!" }),
  lastName: z.string().min(6, { message: "Le nom est requis!" }),
  phone: z.string().min(6, { message: "Le telephone est requis!" }),
  address: z.string().min(6, { message: "L'addresse est requis!" }),
  birthday: z.date({ message: "La date de naissance est requis" }),
  bloodType: z.string().min(1, { message: "Blood Type is required!" }),
  sex: z.enum(["Homme", "Femme"], { message: "Le genre est requis" }),
  img: z.instanceof(File, { message: "Image is required" }),
});

type Inputs = z.infer<typeof schema>;

const TeacherForms = ({
  type,
  data,
}: {
  type: "create" | "update";
  data?: any;
}) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>({
    resolver: zodResolver(schema),
  });

  const onSubmit = handleSubmit((data) => {
    console.log(data);
  });

  return (
    <form className=" flex flex-col gap-8" onSubmit={onSubmit}>
      <h1 className=" text-xl font-semibold">Créer un nouveau Professeur</h1>
      <span className=" text-xs text-gray-400 font-medium">
        Information d&apos;authentification
      </span>
      <div className="flex justify-between flex-wrap gap-4">
        <InputField
          label="UserName"
          name="UserName"
          defaultValue={data?.userName}
          register={register}
          error={errors.userName}
        />
        <InputField
          label="Email"
          name="email"
          type="email"
          defaultValue={data?.email}
          register={register}
          error={errors.email}
        />
        <InputField
          label="Password"
          name="password"
          type="password"
          defaultValue={data?.password}
          register={register}
          error={errors.password}
        />
      </div>
      <span className=" text-xs text-gray-400 font-medium">
        Information personnel
      </span>
      <div className="flex justify-between flex-wrap gap-4">
        <InputField
          label="First Name"
          name="firstName"
          defaultValue={data?.firstName}
          register={register}
          error={errors.firstName}
        />
        <InputField
          label="Last Name"
          name="lastName"
          defaultValue={data?.lastName}
          register={register}
          error={errors.lastName}
        />
        <InputField
          label="Phone"
          name="phone"
          defaultValue={data?.phone}
          register={register}
          error={errors.phone}
        />
        <InputField
          label="Address"
          name="address"
          defaultValue={data?.address}
          register={register}
          error={errors.address}
        />
        <InputField
          label="Blood Type"
          name="bloodType"
          defaultValue={data?.bloodType}
          register={register}
          error={errors.bloodType}
        />
        <InputField
          label="Birthday"
          name="birthday"
          defaultValue={data?.birthday}
          register={register}
          error={errors.birthday}
          type="date"
        />
        <div className=" flex flex-col gap-2 w-full md:w-1/4">
          <label className=" text-xs text-gray-500">Sex</label>
          <select
            className=" ring-[1.5px] ring-gray-300 rounded-md text-sm p-2 w-full"
            {...register("sex")}
            defaultValue={data?.sex}
          >
            <option value="male">Homme</option>
            <option value="female">Femme</option>
          </select>
          {errors.sex?.message && (
            <p className=" text-red-400 text-xs">
              {errors.sex?.message.toString()}
            </p>
          )}
        </div>
        <div className=" flex flex-col gap-2 w-full md:w-1/4 justify-center ">
          <label
            className=" text-xs text-gray-500 flex items-center gap-2 cursor-pointer"
            htmlFor="img"
          >
            <Image src="/upload.png" alt="" width={28} height={28} />
            <span>Téléverser une photo</span>
          </label>
          <input type="file" id="img" {...register("img")} className="hidden" />
          {errors.img?.message && (
            <p className=" text-red-400 text-xs">
              {errors.img?.message.toString()}
            </p>
          )}
        </div>
      </div>

      <button className=" bg-blue-400 text-white p-2 rounded-md" type="submit">
        {type === "create" ? "Create" : "Update"}
      </button>
    </form>
  );
};
export default TeacherForms;
