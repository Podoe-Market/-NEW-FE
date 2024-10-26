import PreviewPurchase from "../button/PreviewPurchase";

import CloseBtn from "./../../assets/image/button/CloseBtn.svg";
import inequalityLeft from "./../../assets/image/button/inequalityLeft.svg";
import inequalityRight from "./../../assets/image/button/inequalityRight.svg";

import "./PreviewDiv.css";
import "./../../styles/text.css";
import "./../../styles/utilities.css";

/**
 *
 * @param {object} props
 * @param {object} props.Page - PDF page component
 * @param {number} props.numPages - 전체 페이지 수
 * @returns
 */
const PreviewDiv = ({ Page, showThreshold, selectedPage = 1, setSelectedPage, numPages }) => {
  return (
    <div>
      <hr id="selected-page-hr" />

      <div id="selected-page">
        <div className="f-dir-column f-center">
          <img
            className="c-pointer"
            id="close-btn"
            src={CloseBtn}
            alt="close"
            onClick={() => setSelectedPage(null)}
          />
          <div className="d-flex" id="background-page-wrap">
            <div id="background-page" style={selectedPage === 1 ? { opacity: "0" } : null}></div>
            <div
              id="background-page"
              style={selectedPage === showThreshold ? { opacity: "0" } : null}
            ></div>
          </div>
          <div className="f-center no-drag" id="page" onClick={(e) => e.stopPropagation()}>
            <img
              src={inequalityLeft}
              alt="left-btn"
              className="c-pointer"
              onClick={() => {
                if (selectedPage > 1) {
                  setSelectedPage(selectedPage - 1);
                }
              }}
            />
            <div className="p-relative" id="preview-page">
              <Page renderMode="canvas" pageNumber={selectedPage} width={609} />
              <h3 className="p-small-regular" id="select-page">
                {selectedPage}
              </h3>

              {selectedPage === showThreshold ? (
                <div className="f-center" id="preview-last-popup">
                  <div>
                    <p className="p-xs-bold t-align-center">
                      전체 {numPages} 페이지 중 {showThreshold} 페이지까지만
                    </p>
                    <p className="p-xs-bold t-align-center">미리보기로 볼 수 있어요.</p>
                  </div>
                  <PreviewPurchase
                    text="구매하기"
                    onClick={() => {
                      window.scrollTo({ top: 0, behavior: "smooth" });
                    }}
                  />
                </div>
              ) : null}
            </div>
            <img
              src={inequalityRight}
              alt="right-btn"
              className="c-pointer"
              onClick={() => {
                if (selectedPage < showThreshold) {
                  setSelectedPage(selectedPage + 1);
                }
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default PreviewDiv;
