import "../../styles/Loading.css";

const Loading = () => {
  return (
    <div className="flex justify-center mt-28 mb-28">
      <div className="h-full bg-gray-100 flex flex-row flex-wrap items-center justify-around ">
        <div className="spinner"></div>
      </div>
    </div>
  );
};

export default Loading;
