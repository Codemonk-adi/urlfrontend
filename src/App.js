import React, { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useAuth } from "./CustomHook/auth-hook";
import { AuthContext } from "./Context/auth-context";

import Header from "./components/Header/Header";
import SignIn from "./Pages/SignIn/SignIn";
import LoadingSpinner from "./components/LoadingSpinner/LoadingSpinner";
import Home from "./Pages/Home/Home";
import Content from "./Pages/Content/Content";
import SignUp from "./Pages/SignUp/SignUp";
import UserHistory from "./Pages/UserHistory/UserHistory";
import Details from "./Pages/Details/Details";

const App = () => {
  const { token, login, logout, updateProfile, user } = useAuth();
  const [loading, setLoading] = useState(true);
  const [accessContent, setAccessContent] = useState([]);

  useEffect(() => {
    setLoading(false);
  }, []);

  return (
    <AuthContext.Provider
      value={{
        isLoggedIn: !!token,
        token: token,
        user: user,
        login: login,
        logout: logout,
        updateProfile: updateProfile,
      }}
    >
      <BrowserRouter>
        <Header />
        {loading && <LoadingSpinner />}
        {!loading && (
          <Routes>
            <Route
              path="/"
              element={token ? <Home /> : <Navigate to="/signin" />}
            />
            <Route
              path="/signin"
              element={token ? <Navigate to="/" /> : <SignIn />}
            />
            <Route
              path="/signup"
              element={token ? <Navigate to="/" /> : <SignUp />}
            />
            <Route
              path="/display/:queryId/:isEncrypted"
              element={token ? <Content /> : <Navigate to="/signin" />}
            />
            <Route
              path="/details"
              element={
                token ? (
                  <Details accessContent={accessContent} />
                ) : (
                  <Navigate to="/signin" />
                )
              }
            />
            <Route
              path="/history"
              element={
                token ? (
                  <UserHistory setAccessContent={setAccessContent} />
                ) : (
                  <Navigate to="/signin" />
                )
              }
            />
          </Routes>
        )}
      </BrowserRouter>
    </AuthContext.Provider>
  );
};

export default App;
