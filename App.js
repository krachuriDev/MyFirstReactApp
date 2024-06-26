import React, { lazy, Suspense, useState } from "react";
import ReactDOM from "react-dom/client";
import Header from "./src/Components/Header";
import Body from "./src/Components/Body";
import { createBrowserRouter, Outlet, RouterProvider } from "react-router-dom";
import AboutClass from "./src/Components/AboutClass";
import Contact from "./src/Components/Contact";
import Error from "./src/Components/Error";
import RestuarantDetail from "./src/Components/RestauarantDetail";
import useOnlineStatus from "./src/Utils/useOnlineStatus";
import UserContext from "./src/Utils/UserContext";
import { Provider } from "react-redux";
import appStore from "./src/Utils/appStore";
import Cart from "./src/Components/Cart";

const AppLayout = () => {
  const onlineStatus = useOnlineStatus();

  if (!onlineStatus)
    return (
      <h2>Looks like you are offline! Please check your internet connection.</h2>
    );

  return (
    <div className="appLayout">
      {/* Need to place header, body & footer Component  */}
      <Provider store={appStore}>
        <UserContext.Provider value={{ loggedinUser: "Sachin Tendulkar" }}>
          <Header></Header>
        </UserContext.Provider>
        {/* Need to place the outlet to load the components in the body whenever the user navigates
       to a different screen */}
        <Outlet></Outlet>
      </Provider>
    </div>
  );
};

const Grocery = lazy(() => import("./src/Components/Grocery"));

const appRouter = createBrowserRouter([
  {
    path: "/",
    element: <AppLayout></AppLayout>,
    children: [
      {
        path: "/",
        element: <Body></Body>,
      },
      {
        path: "/about",
        element: <AboutClass></AboutClass>,
      },
      {
        path: "/contact",
        element: <Contact></Contact>,
      },
      {
        path: "/grocery",
        element: (
          <Suspense fallback={<h2>Please wait while we load...</h2>}>
            <Grocery></Grocery>
          </Suspense>
        ),
      },
      {
        path: "/restaurant/:resId",
        element: <RestuarantDetail></RestuarantDetail>,
      },
      {
        path: "/cart",
        element: <Cart></Cart>,
      },
    ],
    errorElement: <Error></Error>,
  },
]);

const rootElement = ReactDOM.createRoot(document.getElementById("root"));

rootElement.render(<RouterProvider router={appRouter}></RouterProvider>);
