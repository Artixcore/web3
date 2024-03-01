const DisplayTradingData = ({ title, value }) => {
  return (
    <div className="flex items-center justify-center flex-col text-center shadow-md rounded-md border p-5 space-y-1 truncate">
      <p>{title}</p>
      <h5>{value}</h5>
    </div>
  );
};

export default DisplayTradingData;
