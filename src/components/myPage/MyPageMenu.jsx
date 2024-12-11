import { useNavigate } from "react-router-dom";

import circleGreyWarning from "./../../assets/image/myPage/circleGreyWarning.svg";
import pencilMenuImg from "./../../assets/image/myPage/pencil.svg";
import scriptMenuImg from "./../../assets/image/myPage/script.svg";

import "./MyPageMenu.css";
import "./../../styles/text.css";
import "./../../styles/utilities.css";

/**
 *
 * @param {object} props
 * @param {string} props.nickname - 사용자 닉네임
 * @param {string} props.currentPage - 현재 페이지. 0: 구매한 작품, 1: 작품 관리, 2: 회원 정보 수정
 * @param {boolean} props.isFooterVisible - 구매한 작품 페이지에서 스크롤 관리를 위한 props
 * @returns
 */
const MyPageMenu = ({ nickname, currentPage, isFooterVisible }) => {
  const navigate = useNavigate();
  return (
    <div className="myPage-menu-side">
      <div
        className="f-dir-column j-content-between myPage-menu-inside"
        style={
          currentPage === "0" || currentPage === "1"
            ? isFooterVisible
              ? { position: "absolute", bottom: "2vh" }
              : { position: "fixed" }
            : null
        }
      >
        <div className="myPage-menu-inside-content">
          <h3 className="nickname h3-bold">{nickname} 님,</h3>
          <h5 className="text h5-regular">오늘도 달콤한 하루 되세요!</h5>
          <div
            className={
              currentPage === "0" ? "select-menu-btn selected purchased" : "select-menu-btn"
            }
            onClick={() => {
              navigate("/mypage/purchased");
            }}
          >
            <p className="p-medium-regular">구매한 작품</p>
            <img src={scriptMenuImg} alt="scriptMenu"></img>
          </div>
          <div
            className={
              currentPage === "1" ? "select-menu-btn selected script-manage" : "select-menu-btn"
            }
            onClick={() => {
              navigate("/mypage/scriptmanage");
            }}
          >
            <p className="p-medium-regular">작품 관리</p>
            <img src={pencilMenuImg} alt="pencilMenu"></img>
          </div>
          <p
            className="p-small-under c-pointer info-change-btn"
            onClick={() => {
              navigate("/mypage/infochange");
            }}
          >
            회원 정보 수정
          </p>
        </div>
        {currentPage === "0" ? (
          <div id="grey-rectangle">
            <img src={circleGreyWarning} alt="warn" className="warning-img" />
            <p className="p-medium-regular c-grey">
              대본과 공연권은 구매시점으로부터<br></br>1년 이내만 사용 가능해요.
            </p>
          </div>
        ) : null}
      </div>
    </div>
  );
};

export default MyPageMenu;
