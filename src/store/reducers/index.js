import { combineReducers } from "redux";
import categoryReducer from "./categoryReducer";
import tokenReducer from "./tokenReducer";
import loginReducer from "./loginReducer";
import userReducer from "./userReducer";
import headerReducer from "./headerReducer";
import unforkReducer from "./unforkReducer";
import adminReducer from "./adminReducer";
// ======
import allExporterReducer from "./allExporterReducer";
import searchFilterReducer from "./searchFilterReducer";
import navFilterReducer from "./navFilterReducer";
import cateFilterReducer from "./cateFilterReducer";
import sortFilterReducer from "./sortFilterReducer";
import darkThemeReducer from "./darkThemeReducer";
import adminAddReducer from "./adminAddReducer";
import adminAddTypeReducer from "./adminAddTypeReducer";
import exporterTabBeforeEditReducer from "./exporterTabBeforeEditReducer";
import exporterTabEdittingReducer from "./exporterTabEdittingReducer";
export default combineReducers({
  categoryReducer,
  tokenReducer,
  loginReducer,
  userReducer,
  headerReducer,
  unforkReducer,
  adminReducer,
  //===
  allExporterReducer,
  navFilterReducer,
  cateFilterReducer,
  sortFilterReducer,
  searchFilterReducer,
  darkThemeReducer,
  adminAddReducer,
  adminAddTypeReducer,
  exporterTabBeforeEditReducer,
  exporterTabEdittingReducer,
});
