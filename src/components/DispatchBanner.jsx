function DispatchBanner({ dispatchMessage }) {
  if (!dispatchMessage) return null;

  return <div className="dispatchBanner">✓ {dispatchMessage}</div>;
}

export default DispatchBanner;
