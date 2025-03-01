import ReactPaginate from "react-paginate";
import { MdArrowRightAlt } from "react-icons/md";
import { FC } from "react";

interface IPagination {
  pageCount: number;
  onPageChange: (selected: number) => void;
  currentPage: number;
}

const Pagination: FC<IPagination> = ({
  pageCount,
  onPageChange,
  currentPage,
}) => {
  return (
    <ReactPaginate
      previousLabel={
        <MdArrowRightAlt className="rotate-180 text-xl cursor-pointer" />
      }
      nextLabel={<MdArrowRightAlt className="text-xl cursor-pointer" />}
      breakLabel={"..."}
      breakClassName={"break-me"}
      pageCount={pageCount}
      forcePage={currentPage - 1}
      marginPagesDisplayed={2}
      pageRangeDisplayed={3}
      onPageChange={({ selected }) => onPageChange(selected)}
      containerClassName={"pagination flex items-center gap-3"}
      activeLinkClassName={"active bg-[#111] text-white"}
      pageLinkClassName="block cursor-pointer w-8 h-8 flex items-center justify-center border border-[#111] text-[#111] rounded"
    />
  );
};

export default Pagination;
