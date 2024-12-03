"use client";

import { ITEM_PER_PAGE } from "@/lib/setting";
import { useRouter } from "next/navigation";

const Pagination = ({ page, count }: { page: number; count: number }) => {
  const router = useRouter();
  // cette fonction créer un url à pardir de l'actuel en changant l'attribut page de l'url

  const hasPrev = ITEM_PER_PAGE * (page - 1) > 0;
  const hasNext = ITEM_PER_PAGE * (page - 1) + ITEM_PER_PAGE < count;

  const changePage = (newPage: number) => {
    const params = new URLSearchParams(window.location.search);
    params.set("page", newPage.toString());
    router.push(`${window.location.pathname}?${params}`);
  };

  return (
    <div className=" p-4 flex items-center justify-between text-gray-500">
      <button
        // on decremente la page de 1
        disabled={!hasPrev}
        className=" px-4 py-2 rounded-md bg-slate-200 text-xs font-semibold disabled:opacity-50 disabled:cursor-not-allowed"
        onClick={() => changePage(page - 1)}
      >
        Prec
      </button>
      <div className=" flex items-center gap-2 text-sm">
        {/* Genere un tableau avec la fonctoin Array.From à partir de l'objet lenght */}
        {Array.from(
          // l'attribut length est calculer et arondit avec la fonction Math.ceil
          { length: Math.ceil(count / ITEM_PER_PAGE) },
          // La boucle se repete lenght foi length etant la variable calculer en haut
          (_, index) => {
            const pageIndex = index + 1;
            return (
              // pour chaque element on créer un bouton
              <button
                key={pageIndex}
                className={
                  // uniquement la page active à un background
                  page === pageIndex ? "px-2 rounded-md bg-lamaSky" : ""
                }
                onClick={() => changePage(pageIndex)}
              >
                {pageIndex}
              </button>
            );
          }
        )}
      </div>
      <button
       // on incremente la page de 1
        onClick={() => changePage(page + 1)}
        className=" px-4 py-2 rounded-md bg-slate-200 text-xs font-semibold disabled:opacity-50 disabled:cursor-not-allowed"
        disabled={!hasNext}
      >
        Suiv
      </button>
    </div>
  );
};
export default Pagination;
