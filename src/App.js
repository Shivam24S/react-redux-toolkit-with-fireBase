import { useSelector, useDispatch } from "react-redux";

import Cart from "./components/Cart/Cart";
import Layout from "./components/Layout/Layout";
import Products from "./components/Shop/Products";
import { useEffect } from "react";
import { uiActions } from "./components/store/ui-slice";
import NotificationComponent from "./components/UI/Notification";

let isInitial = true;

function App() {
  const showCart = useSelector((state) => state.ui.cartIsVisible);

  const cartData = useSelector((state) => state.cart);

  const Notification = useSelector((state) => state.ui.notification);

  const dispatch = useDispatch();

  useEffect(() => {
    async function sendCartData() {
      dispatch(
        uiActions.showNotification({
          status: "pending",
          message: "sending cart Data",
          title: "sending",
        })
      );
      const response = await fetch(
        "https://cart-data-redux-toolkit-default-rtdb.firebaseio.com/cart.json",
        {
          method: "PUT",
          body: JSON.stringify(cartData),
        }
      );

      if (!response.ok) {
        throw new Error("failed to send data");
      }
      dispatch(
        uiActions.showNotification({
          status: "success",
          message: "data sent successfully",
          title: "success",
        })
      );
    }
    if (isInitial) {
      isInitial = false;
      return;
    }
    sendCartData((error) => {
      dispatch(
        uiActions.showNotification({
          status: "error",
          message: "failed to send data",
          title: "Error",
        })
      );
    });
  }, [cartData, dispatch]);

  return (
    <>
      {Notification && (
        <NotificationComponent
          status={Notification.status}
          title={Notification.title}
          message={Notification.message}
        />
      )}
      <Layout>
        {showCart && <Cart />}
        <Products />
      </Layout>
    </>
  );
}

export default App;
