import "./App.css";
import { BrowserRouter, Route, Router, Routes } from "react-router-dom";
import SignUp from "./pages/Authentication/SignUp";
import SignIn from "./pages/Authentication/SignIn";
import PrivateRoute from "./utils/PrivateRoute";
import User from "./pages/Admin/User";
import HomeAdmin from "./pages/Admin/HomeAdmin";
import Reserve from "./pages/Admin/Reserve";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <div className={"main-container"}>
          {/* <Routes>
            {routes.map((item) =>
              item.element ? (
                <Route
                  key={item.path}
                  path={item.path}
                  element={item.element}
                />
              ) : (
                <Route
                  key={item.path}
                  path={item.path}
                  element={
                    <Suspense fallback={<div>Can not load Component</div>}>
                      {createElement(lazy(item.lazy), {})}
                    </Suspense>
                  }
                />
              )
            )}
          </Routes> */}

          <Routes>
            <Route
              path="/"
              element={
                <PrivateRoute>
                  <HomeAdmin />
                </PrivateRoute>
              }
            />

            <Route
              path="/user"
              element={
                <PrivateRoute>
                  <User />
                </PrivateRoute>
              }
            />

            <Route
              path="/reserve"
              element={
                <PrivateRoute>
                  <Reserve />
                </PrivateRoute>
              }
            />

            <Route element={<SignIn />} path="/sign-in"></Route>
            <Route element={<SignUp />} path="/sign-up"></Route>
          </Routes>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
