import PriceTextsVertical from "./../price/PriceTextsVertical.jsx";
import "./ScriptContent.css";

const ScriptContent = ({ order, index, currentPage = "0", Button }) => {
  const items = currentPage === "0" ? order.orders || [] : order.products || [];

  const [year, month, day] = order.date.split("-");
  const formattedDate = `${year}. ${month}. ${day}.`;

  return (
    <div key={index} className="script-content">
      <h3 id="date">{formattedDate}</h3>
      <hr></hr>
      {items.map((script) => (
        <div key={script.id}>
          <div className="script">
            <div
              className="script-thumbnail"
              style={{
                backgroundImage: `url(${script.imagePath || "default_image_url_here"})`,
              }}
            ></div>
            <div className="script-detail">
              <div className="script-tag">
                <h3 id="title">{script.title || "제목 없음"}</h3>
                <hr></hr>
                <h4>{script.writer || "작가 정보 없음"}</h4>
                {/* 작품 관리 페이지에서 심사 중인 작품일 경우: */}
                {currentPage === "1" && !script.checked ? (
                  <div className="margin-43_4px"></div>
                ) : (
                  <PriceTextsVertical
                    scriptPrice={script.scriptPrice || 0}
                    performPrice={script.performancePrice || 0}
                  />
                )}
              </div>
              {/* Button: props */}
              {currentPage === "0" ? (
                // 구매한 작품 페이지 PurchasedScriptBtn.jsx
                <Button
                  contractStatus={script.contractStatus}
                  id={script.id}
                  title={script.title}
                />
              ) : (
                // 작품 관리 페이지 ScriptManageBtn.jsx
                // checked - false: 심사 중, true: 심사 완료
                <Button
                  reviewCompleted={script.checked}
                  scriptSale={script.script}
                  performSale={script.performance}
                  id={script.id}
                />
              )}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ScriptContent;
