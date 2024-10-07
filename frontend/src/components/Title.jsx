import ReturnButton from "./ReturnButton";

const Title = ({ title, withReturnButton }) => {
  return (
    <>
    <div className="justify-content-between d-flex">
      <h2 className="text-decoration-underline" style={{color: '#14233b'}}>{title}</h2>
      {withReturnButton && <ReturnButton />}
    </div>
      <hr />
    </>
  );
};

export default Title;
