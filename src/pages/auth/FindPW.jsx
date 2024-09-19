import axios from "axios";
import { useState, useEffect } from "react";

import ResetPW from "./ResetPW";
import BottomBtn from "../../components/auth/BottomBtn";
import { AuthInputField, AuthSideBtnInputField } from "../../components/inputField";

import { SERVER_URL } from "../../constants/ServerURL";
import { ID_REGEX, EMAIL_REGEX } from "./../../constants/regex.js";

import "./FindBar.css";

const FindPW = () => {
  const [id, setId] = useState("");
  const [email, setEmail] = useState("");
  const [emailCode, setEmailCode] = useState("");
  const [receivedEmailCode, setReceivedEmailCode] = useState("");
  const [receivedAccessToken, setReceivedAccessToken] = useState("");

  const [idValid, setIdValid] = useState(false);
  const [emailValid, setEmailValid] = useState(false);
  const [emailCodeValid, setEmailCodeValid] = useState(false);

  const [emailSendBtnClicked, setEmailSendBtnClicked] = useState(false);
  const [emailCheckErrorMsg, setEmailCheckErrorMsg] = useState("");
  const [emailSended, setEmailSended] = useState(false);
  const [sendEmailBtnEnabled, setSendEmailBtnEnabled] = useState(false);
  const [sendEmailCodeConfirmBtnEnabled, setEmailCodeConfirmBtnEnabled] = useState(false);

  const [isNotRegisteredId, setIsNotRegisteredId] = useState(true);
  const [isNotRegisteredEmail, setIsNotRegisteredEmail] = useState(true);
  const [idEmailNotMatch, setIdEmailNotMatch] = useState(false);

  const [notAllFormWritten, setNotAllFormWritten] = useState(true);
  const [resetPwPermitted, setResetPwPermitted] = useState(false);

  // showErrorMsg
  const [showIdErrorMsg, setShowIdErrorMsg] = useState(false);
  const [showRegisteredIdMsg, setShowRegisteredIdMsg] = useState(false);
  const [showEmailErrorMsg, setShowEmailErrorMsg] = useState(false);
  const [showEmailCodeErrorMsg, setShowEmailCodeErrorMsg] = useState(false);

  // id
  useEffect(() => {
    if (id.length > 0) {
      setShowIdErrorMsg(true);
    } else {
      setShowIdErrorMsg(false);
    }

    if (ID_REGEX.test(id)) {
      setIdValid(true);
    } else {
      setIdValid(false);
    }
  }, [id]);

  const onClickIdConfirmBtn = async () => {
    // initialize
    setShowRegisteredIdMsg(false);
    // 아이디 가입 여부 확인 API 호출, 조건문 사용
    try {
      const response = await axios.post(`${SERVER_URL}auth/checkUserId`, {
        userId: id,
        check: false,
      });
      if (response.data === true) {
        setIsNotRegisteredId(false);
      }
    } catch (error) {
      setIsNotRegisteredId(true);
    }
    setShowRegisteredIdMsg(true);
  };

  // email
  useEffect(() => {
    if (email.length > 0) {
      setShowEmailErrorMsg(true);
    } else {
      setShowEmailErrorMsg(false);
    }

    if (EMAIL_REGEX.test(email)) {
      setEmailValid(true);
    } else {
      setEmailValid(false);
    }
  }, [email]);

  // (이메일) 인증하기 버튼 활성화
  useEffect(() => {
    if (emailValid && email.length > 0) {
      setSendEmailBtnEnabled(true);
    } else {
      setSendEmailBtnEnabled(false);
    }
  }, [email, emailValid]);

  const onClickSendEmailBtn = async () => {
    // initialize
    setEmailSendBtnClicked(false);

    setEmailSendBtnClicked(true);
    setEmailCheckErrorMsg("이메일을 전송중입니다.");
    // 이메일 가입 여부 확인 API 호출
    try {
      const response = await axios.post(`${SERVER_URL}auth/find/mailSend`, {
        email: email,
        flag: true,
        userId: id,
      });
      setReceivedEmailCode(response.data);

      alert("이메일이 전송되었습니다.");
      setEmailSended(true);
      setIsNotRegisteredEmail(false);
    } catch (error) {
      console.log(error.response.data.error);
      if (error.response.data === "이메일 유효성 검사 실패") {
        setEmailValid(false);
      } else if (error.response.data === "사용자 정보 없음") {
        setIsNotRegisteredEmail(true);
      } else if (error.response.data === "아이디와 이메일의 정보가 일치하지 않습니다.") {
        setIdEmailNotMatch(true);
      }
      setEmailCheckErrorMsg("가입되지 않은 이메일입니다.");
    }
    // 인증하기 버튼 눌림 -> 에러 메시지 허용
    setShowEmailErrorMsg(true);
  };

  useEffect(() => {
    if (emailCode.length > 0) {
      setEmailCodeConfirmBtnEnabled(true);
    } else {
      setEmailCodeConfirmBtnEnabled(false);
    }
  }, [emailCode]);

  const onClickEmailCodeConfirmBtn = async () => {
    // 이메일 코드 확인 API 호출, 조건문 사용
    try {
      const response = await axios.post(`${SERVER_URL}auth/findPassword`, {
        email: email,
        authNum: emailCode,
        userId: id,
      });
      setReceivedAccessToken(response.data.accessToken);
      setEmailCodeValid(true);
    } catch (error) {
      setEmailCodeValid(false);
    }
    // 확인 버튼 눌림 -> 에러 메시지 허용
    setShowEmailCodeErrorMsg(true);
  };

  // 모든 폼이 작성되고, 인증이 완료되면 버튼 활성화
  useEffect(() => {
    if (email.length > 0 && emailCode.length > 0 && !isNotRegisteredEmail && emailCodeValid) {
      setNotAllFormWritten(false);
    } else {
      setNotAllFormWritten(true);
    }
  }, [email, emailCode, isNotRegisteredEmail, emailCodeValid]);

  return !resetPwPermitted ? (
    <div className="section-find" id="input">
      <AuthInputField
        title="아이디"
        type="text"
        placeholder="podostore"
        value={id}
        onChange={(e) => {
          setId(e.target.value);
        }}
        errorMessage={
          // 아이디 형식에 맞지 않을 경우
          idValid === false && id.length > 0
            ? "5 ~ 10자의 영문 및 숫자를 포함해야 합니다."
            : // 가입되지 않은 아이디일 경우
            isNotRegisteredId === true && id.length > 0
            ? "가입되지 않은 아이디입니다."
            : " "
        }
        validMessage={showRegisteredIdMsg ? "올바른 아이디입니다." : " "}
        isValid={
          idValid === false || (isNotRegisteredId === true && showRegisteredIdMsg === true)
            ? false
            : true
        }
        showErrorMsg={showIdErrorMsg}
        onBlur={() => {
          onClickIdConfirmBtn();
        }}
      />

      <AuthSideBtnInputField
        title="이메일"
        type="text"
        placeholder="podo@store.com"
        value={email}
        onChange={(event) => {
          setEmail(event.target.value);
          // 이메일 재입력 시, 에러 메시지 초기화
          setEmailSendBtnClicked(false);
        }}
        errorMessageCustomFlag={true}
        sideBtnTitle="인증"
        sideBtnOnClick={onClickSendEmailBtn}
        sideBtnDisabled={!sendEmailBtnEnabled}
      />
      <div className="error-message-wrap">
        {/* showErrorMsg가 true일 때만 렌더링, 없을 경우에도 공간 확보 */}
        {showEmailErrorMsg ? (
          !emailValid && email.length > 0 ? (
            <p>이메일 형식이 올바르지 않습니다.</p>
          ) : isNotRegisteredEmail && email.length > 0 && emailSendBtnClicked ? (
            // "가입되지 않은 이메일입니다.", "이메일을 전송중입니다."
            <p>{emailCheckErrorMsg}</p>
          ) : idEmailNotMatch && email.length > 0 ? (
            <p>아이디와 이메일의 정보가 일치하지 않습니다.</p>
          ) : emailSended ? (
            <p id="validMessage">메일을 보냈습니다.</p>
          ) : (
            <p> </p>
          )
        ) : (
          <p> </p>
        )}
      </div>

      <AuthSideBtnInputField
        title="인증번호 확인"
        type="text"
        placeholder="인증번호 6자리 입력"
        value={emailCode}
        onChange={(event) => {
          setEmailCode(event.target.value);
        }}
        errorMessageCustomFlag={true}
        sideBtnTitle="확인"
        sideBtnOnClick={onClickEmailCodeConfirmBtn}
        sideBtnDisabled={!sendEmailCodeConfirmBtnEnabled}
      />
      <div className="error-message-wrap">
        {/* showErrorMsg가 true일 때만 렌더링, 없을 경우에도 공간 확보 */}
        {showEmailCodeErrorMsg ? (
          !emailCodeValid && emailCode.length > 0 ? (
            <p>인증 번호가 일치하지 않습니다.</p>
          ) : emailCodeValid && emailCode.length > 0 ? (
            <p id="validMessage">인증 번호가 일치합니다.</p>
          ) : null
        ) : (
          <p> </p>
        )}
        <p id="resend" onClick={onClickSendEmailBtn}>
          {emailSended ? "인증 번호 다시 보내기" : " "}
        </p>
      </div>

      <BottomBtn
        onClick={() => {
          // 인증번호 일치 로직 검사: onClickEmailCodeConfirmBtn에서 이미 시행
          setResetPwPermitted(true);
        }}
        disabled={notAllFormWritten}
      >
        비밀번호 재설정하기
      </BottomBtn>
    </div>
  ) : (
    <ResetPW receivedAccessToken={receivedAccessToken} />
  );
};

export default FindPW;
