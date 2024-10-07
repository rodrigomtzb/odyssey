import ReturnButton from "../ReturnButton";

const TitleSection = ({ text, isFirst, withReturnButton }) => {
  return (
    <>
      {!isFirst && <hr style={{ borderColor: "#14233b" }} />}
      <div className="d-flex justify-content-between mb-4">
        <div
          className="bg-gd d-flex align-items-center p-2 rounded"
          style={{ width: "fit-content" }}
        >
          <h5 className="m-0">{text}</h5>
        </div>
        {withReturnButton && <ReturnButton />}
      </div>
    </>
  );
};

export default TitleSection;
