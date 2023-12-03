import React, { Suspense } from "react";
import { Route, Navigate, Routes } from "react-router-dom";

const RouterView = ({ routes }) => {
  return (
    <Suspense fallback={<h1>Loading page</h1>}>
      <Routes>
        {routes.map((route, index) => {
          return (
            <Route
              key={index}
              path={route.path}
              element={
                route.redirect ? (
                  <Navigate to={route.redirect} />
                ) : (
                  <route.component />
                )
              }
            />
          );
        })}
      </Routes>
    </Suspense>
  );
};

export default RouterView;
