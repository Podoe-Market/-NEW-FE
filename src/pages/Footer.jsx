import { useNavigate } from "react-router-dom";

import logo from "../assets/image/footer/new_logo.svg";
import instagramIcon from "../assets/image/footer/instagramIcon.svg";
import youtubeIcon from "../assets/image/footer/youtubeIcon.svg";
import XIcon from "../assets/image/footer/XIcon.svg";

import "./Footer.css";

function Footer() {
  const navigate = useNavigate();

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
    });
  };

  return (
    <div className="footer">
      <div className="footer-inner">
        <div className="footer-upper">
          <img src={logo} alt="navLogo" />
          <p>Copyright © 2024 포도상점. Powered by 포도상점</p>
        </div>
        <div className="footer-lower">
          <div className="business-info">
            <p>사업자 번호 : 111-11-111111</p>
            <p>연락처 : 010-0000-0000</p>
            <p>대표 : 서준</p>
          </div>

          <div className="sitemap">
            <div className="sitemap-section">
              <hr />

              <ul id="menu">
                <li
                  onClick={() => {
                    navigate("/list");
                    scrollToTop();
                  }}
                >
                  작품 둘러보기
                </li>
                <li
                  onClick={() => {
                    navigate("/post");
                    scrollToTop();
                  }}
                >
                  작품 등록하기
                </li>
              </ul>
            </div>
            <div className="sitemap-section">
              <ul id="question">
                <li>개인정보처리방침</li>
                <li>
                  <button>문의하기</button>
                </li>
              </ul>
              <hr />
              <ul>
                <li>Follow us</li>
                <li id="icons">
                  <a
                    href="https://www.instagram.com/podosangjeom"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <img src={instagramIcon} alt="instagramIcon" />
                    <p>@podosangjeom</p>
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Footer;
