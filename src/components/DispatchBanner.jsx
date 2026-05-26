const DispatchBanner = ({ message }) => {
  if (!message) return null;
  return <div className="dispatchBanner">✓ {message}</div>;
};

export default DispatchBanner;
