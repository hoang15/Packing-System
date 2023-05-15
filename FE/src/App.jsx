import "./App.css";
import Header from "./layout/Header.jsx";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import routes from "@/router/routes.jsx";
import { createElement, lazy, Suspense } from "react";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <div className={"main-container"}>
          <Routes>
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
          </Routes>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
