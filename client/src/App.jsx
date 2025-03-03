import { useAuth0 } from "@auth0/auth0-react";
import React from "react";

const App = () => {
  const { user, loginWithRedirect, isAuthenticated, logout } = useAuth0();
  console.log(user);

  return (
    <div>
      {isAuthenticated ? (
        <>
          {user.given_name}
          <button
            onClick={() =>
              logout({ logoutParams: { returnTo: window.location.origin } })
            }
          >
            Log Out
          </button>
        </>
      ) : (
        <button onClick={() => loginWithRedirect()}>Login with redirect</button>
      )}
    </div>
  );
};

export default App;
