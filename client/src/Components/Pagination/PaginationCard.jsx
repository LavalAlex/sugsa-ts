import React from "react";
import style from "./PaginationCard.module.css";

export default function PaginationCard({ rowPerPage, allRow, paginado, m }) {
  const pageNumbers = [];

  for (let i = 1; i <= Math.ceil(allRow / rowPerPage); i++) {
    pageNumbers.push(i);
  }

  return (
    <div className={style.container}>
      <ul className={style.pagination}>
        <li
          className={style.pgNum}
          onClick={() => paginado(m != 1 ? m - 1 : 1)}
          key={m}
        >
          <a>PREV</a>
        </li>
        <li
          className={style.pgNum}
          onClick={() =>
            paginado(m != pageNumbers.length ? m + 1 : pageNumbers.length)
          }
          key={m + 1}
        >
          <a>NEXT</a>
        </li>
      </ul>
    </div>
  );
}
