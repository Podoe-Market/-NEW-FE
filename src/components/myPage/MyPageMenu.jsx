import "./MyPageMenu.css";
import scriptMenuImg from "./../../assets/image/myPage/script.svg";
import pencilMenuImg from "./../../assets/image/myPage/pencil.svg";
import { useNavigate } from "react-router-dom";

const MyPageMenu = ({ nickname, currentPage }) => {
  const navigate = useNavigate();
  return (
    <div className="myPage-menu-side">
      <h1>알맹이 {nickname} 님,</h1>
      <h3>오늘도 달콤한 하루 되세요!</h3>
      <div
        className={currentPage === "0" ? "select-menu-btn selected" : "select-menu-btn"}
        onClick={() => {
          navigate("/mypage/purchased");
        }}
      >
        <h6>구매한 작품</h6>
        <img src={scriptMenuImg}></img>
      </div>
      <div className={currentPage === "1" ? "select-menu-btn selected" : "select-menu-btn"}>
        <h6>작품 관리</h6>
        <img src={pencilMenuImg}></img>
      </div>
      <p
        onClick={() => {
          navigate("/mypage/infochange");
        }}
      >
        회원 정보 수정
      </p>
    </div>
  );
};

export default MyPageMenu;