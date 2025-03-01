import { FaStar } from "react-icons/fa6";
import IComment from "../../models/Comment";
import { FaUserAstronaut } from "react-icons/fa";
import { FaHeart } from "react-icons/fa";
import { PiArrowBendDownRightLight } from "react-icons/pi";
import { MdOutlineReport } from "react-icons/md";
import { BiSolidLike } from "react-icons/bi";

const Comment = ({ comment }: { comment?: IComment }) => {
  return (
    <div className="comment--wrapper p-3 border-b border-b-gray-300">
      <div className="comment--header flex items-start gap-3">
        <div className="user--img">
          <span className="inline-block p-3 rounded-full text-[#fff] bg-[#111]">
            <FaUserAstronaut />
          </span>
        </div>
        <div className="user--info">
          <div className="user--username">{comment?.user.fullName}</div>
          <div className="user--comment__rating flex items-center text-yellow-400">
            {Array.from([1, 2, 3, 4, 5]).map((i) => {
              return (
                <span key={`${i}--${i}`}>
                  <FaStar />
                </span>
              );
            })}
          </div>
        </div>
      </div>
      <div className="comment--body">{comment?.body}</div>
      <div className="comment--footer py-2 flex items-center gap-3">
        <div className="comment--likes flex items-center gap-1">
          <span className="main-text">
            <FaHeart />
          </span>
          <span>{comment?.likes}</span>
        </div>
        <div className="comment--footer__options flex items-center gap-3">
          <div className="reply flex items-center text-sm">
            <span>
              <PiArrowBendDownRightLight />
            </span>
            <button className="hover:underline cursor-pointer">Reply</button>
          </div>
          <div className="report flex items-center text-sm">
            <span className="text-lg main-text">
              <MdOutlineReport />
            </span>
            <button className="hover:underline cursor-pointer">Report</button>
          </div>
          <div className="like flex items-center text-sm">
            <span>
              <BiSolidLike />
            </span>
            <button className="hover:underline cursor-pointer">Like</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Comment;
