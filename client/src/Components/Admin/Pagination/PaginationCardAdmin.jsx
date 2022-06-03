import React, { useState } from "react";
import style from "./PaginationCardAdmin.module.css";

export default function PaginationCard({ rowPerPage, allRow, paginado, m , handleSelect}) {
  const pageNumbers = [];
  // const [m, setNum] =useState(5)

  for (let i = 1; i <= Math.ceil(allRow / rowPerPage); i++) {
    pageNumbers.push(i);
  }



  // console.log(typeof(parseInt(m)))
  return (
    <div className={style.container}>
      <ul className={style.pagination}>
        <li
          className={style.pgNum}
          onClick={() => paginado(m != 1 ? m - 1 : 1)}
          key={m}
        >
          <a>Prev</a>
        </li>
    <select onChange={(e) => handleSelect(e)} >
      <option>5</option>
      <option>10</option>
      <option>15</option>
    </select>
        {/* {pageNumbers.map((n) => {
          if (n === m)
          return (
            <li className={style.pgNum} onClick={() => paginado(n)} key={n}>
              <a>{n}</a>
            </li>
          );
          else {
            return (
              <li className={style.pgNum} onClick={() => paginado(n)} key={n}>
                <a>{n}</a>
              </li>
            );
          }
        })} */}
        <li
          className={style.pgNum}
          onClick={() =>
            paginado(m != pageNumbers.length ? m + 1 : pageNumbers.length)
          }
          key={m + 1}
        >
          <a>Next</a>
        </li>
      </ul>
    </div>
  );
}
