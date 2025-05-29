import React from 'react';
import '../VerifyPage.css';

function TokenResult() {
  const fakeToken = "AGENTAI-TOKEN-45XY-123Z"; // Simulated

  return (
    <div className="verify-container">
      <h2>Verification Token</h2>
      <p>Your unique token is:</p>
      <div className="token-box">{fakeToken}</div>
      <p>Use this token for further secure actions in KlearDoc  system.</p>
    </div>
  );
}

export default TokenResult;
