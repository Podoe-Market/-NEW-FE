import "./SignIn.css";
import axios from "axios";
import { SERVER_URL } from "../Components/constants/ServerURL";
import MainNav from "./MainNav";
import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import RightSide from "../Components/auth/RightSide";
import Page from "../Components/auth/Page";
import InputField from "../Components/auth/InputField";
import BottomBtn from "../Components/auth/BottomBtn";
import Box from "../Components/auth/Box";

const User = {
  id: "test",
  pw: "123",
};

function SignIn() {
  const [id, setId] = useState("");
  const [pw, setPw] = useState("");

  const [isIdPwMatch, setIsIdPwMatch] = useState(true);

  const [idPwNull, setIdPwNull] = useState(true);

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
    setIsIdPwMatch(false);
    try {
      const response = await axios.post(`${SERVER_URL}auth/signin`, {
        userId: id,
        password: pw,
      });

      if (response.data.accessToken) {
        setIsIdPwMatch(true);
        navigate("/");
      } else {
        setIsIdPwMatch(false);
      }
    } catch (error) {
      setIsIdPwMatch(false);
      console.error("로그인 오류:", error);
    }
  };

  return (
    <div className="signIn">
      <MainNav />
      <Box>
        <div className="left-side"></div>
        <RightSide>
          <Page>
            <div>
              <div className="titleWrap">로그인 하려고요?</div>
              <div className="contentWrap">
                <InputField
                  title="아이디"
                  type="text"
                  placeholder="podostore"
                  value={id}
                  onChange={handleId}
                />
                <InputField
                  title="비밀번호"
                  type="password"
                  placeholder="Lovepodo_S2"
                  value={pw}
                  onChange={handlePassword}
                  errorMessage="아이디 / 비밀번호 오류"
                  isValid={isIdPwMatch}
                />
              </div>
              <div>
                <BottomBtn onClick={onClickConfirmButton} disabled={idPwNull}>
                  로그인
                </BottomBtn>
              </div>
              <div className="extraLink">
                <Link to="/signin/find">아이디/비밀번호 찾기</Link> |{" "}
                <Link to="/signup"> 회원가입</Link>
              </div>
            </div>
          </Page>
        </RightSide>
      </Box>
    </div>
  );
}

export default SignIn;
