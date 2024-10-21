import React from "react";
import AppRoutes from "./AppRoutes";
import { AuthProvider } from "./AuthProvider";


const App = () => {
  return (
    <AuthProvider> 
          <AppRoutes />
    </AuthProvider>
  );
};

export default App;
