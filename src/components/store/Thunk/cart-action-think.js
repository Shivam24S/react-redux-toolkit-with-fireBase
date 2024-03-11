import { uiActions } from "../ui-slice";

export const sendCartData = (cart) => {
  return async (dispatch) => {
    const sendRequest = async () => {
      // showing notification status
      dispatch(
        uiActions.showNotification({
          status: "pending",
          title: "sending",
          message: "send Data...",
        })
      );
      // updating and sending data to backend
      const response = await fetch(
        "https://cart-data-redux-toolkit-default-rtdb.firebaseio.com/cart.json",
        {
          method: "PUT",
          body: JSON.stringify(cart),
        }
      );
      // handling error
      if (!response.ok) {
        throw new Error("failed to send cart data");
      }
      dispatch(
        uiActions.showNotification({
          status: "success",
          message: "Data sent successfully",
          title: "success",
        })
      );
    };
    try {
      await sendRequest();
    } catch (error) {
      sendRequest.catch = (error) => {
        dispatch(
          uiActions.showNotification({
            status: "error",
            message: "failed to send Data",
            title: "Error",
          })
        );
      };
    }
  };
};
