import axios from "axios";
import { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";

import MainNav from "../MainNav";
import Footer from "../Footer";

import AuthContext from "../../contexts/AuthContext";

import { BottomBtn, Box, RectangleForm } from "../../components/auth";
import { AuthInputField, AuthPwInputField } from "../../components/inputField";

import { SERVER_URL } from "../../constants/ServerURL.js";

import "./SignIn.css";
import Loading from "../Loading";

import errorImage from "../../assets/image/myPage/AiOutlineExclamationCircle.svg";

function SignIn() {
  const { login } = useContext(AuthContext);
  const [id, setId] = useState("");
  const [pw, setPw] = useState("");

  const [showErrorMsg, setShowErrorMsg] = useState(false);
  const [isIdPwMatch, setIsIdPwMatch] = useState(true);

  const [idPwNull, setIdPwNull] = useState(true);

  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();

  const handleId = (e) => {
    setId(e.target.value);
  };

  useEffect(() => {
    if (id === "" || pw === "") {
      setIdPwNull(true);
    } else {
      setIdPwNull(false);
    }
  }, [id, pw]);

  const handlePassword = (e) => {
    setPw(e.target.value);
  };

  const onClickConfirmButton = async () => {
    // initialize
    setIsLoading(true);
    setIsIdPwMatch(false);

    try {
      const response = await axios.post(`${SERVER_URL}auth/signin`, {
        userId: id,
        password: pw,
      });

      if (response.data.accessToken && response.data.refreshToken) {
        // accessToken을 쿠키에 저장 -> context 호출
        login(
          response.data.accessToken,
          response.data.refreshToken,
          response.data.nickname
        );

        setIsIdPwMatch(true);
        navigate("/");
      } else {
        setIsIdPwMatch(false);
      }
    } catch (error) {
      if (error.response.data.error === "signin error") {
        alert("로그인 오류, 다시 시도해 주세요.");
      }
      setIsIdPwMatch(false);
    }
    setShowErrorMsg(true);
    setIsLoading(false);
  };

  if (isLoading) {
    return <Loading />;
  }

  return (
    <div className="signIn">
      <MainNav />
      <div className="signIn-wrap">
        <Box>
          <RectangleForm onSubmit={onClickConfirmButton}>
            {/* Form 요소에 onSubmit을 사용 */}
            <div className="titleWrap">로그인</div>
            <div className="contentWrap">
              <AuthInputField
                type="text"
                placeholder="아이디를 입력해주세요."
                value={id}
                onChange={handleId}
              />
              <AuthPwInputField
                placeholder="비밀번호를 입력해주세요."
                value={pw}
                onChange={handlePassword}
                errorMessage="아이디 혹은 비밀번호가 일치하지 않습니다."
                isValid={isIdPwMatch}
                showErrorMsg={showErrorMsg}
              />
            </div>
            <div style={{ display: "flex", alignItems: "center" }}>
              <img src={errorImage} alt="error" className="error" />
              <span className="error-message">
                {"아이디 혹은 비밀번호가 일치하지 않습니다."}
              </span>
            </div>
            <div>
              <BottomBtn type="submit" disabled={idPwNull}>
                로그인
              </BottomBtn>
            </div>
            <div className="extraLink">
              <p
                onClick={() => {
                  navigate("/signin/find");
                }}
              >
                아이디/비밀번호 찾기
              </p>
              <p id="bar">|</p>
              <p
                onClick={() => {
                  navigate("/signup");
                }}
              >
                회원가입
              </p>
            </div>
          </RectangleForm>
        </Box>
      </div>
      <Footer />
    </div>
  );
}

export default SignIn;
