export default function LoadingSpinner() {

  return (
    <div className="flex items-center justify-center h-max">
      <svg className="animate-spin h-12 w-12 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
        <circle className="opacity-25" cx="12" cy="12" r="10" strokeDasharray={10} stroke="currentColor" strokeWidth="4"></circle>
      </svg>
    </div>
  );
}