import '../VerifyPage.css';

function ResultPage() {
  return (
    <div className="result-container">
      <h1>KlearDoc Verification in Progress</h1>
      <p>Your document is being analyzed by KlearDoc agenticAI. This may take a few seconds...</p>
      <div className="loader"></div>
    </div>
  );
}

export default ResultPage;
