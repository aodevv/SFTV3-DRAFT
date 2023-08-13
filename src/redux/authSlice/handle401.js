import { logout } from "./authSlice";

const handle401 =
  ({ dispatch }) =>
  (next) =>
  (action) => {
    if (
      action.type.endsWith("/rejected") &&
      action.payload?.status &&
      action.payload?.status === 401
    ) {
      dispatch(logout());
    }
    return next(action);
  };

export default handle401;
