import type { FC, ReactNode } from "react";
import { Provider } from "react-redux";
import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { emptySplitApi } from "./api/emptyApi";

export type IRootState = ReturnType<typeof rootReducer>;
export type IAppStore = ReturnType<typeof setupStore>;
export type IDispatch = IAppStore["dispatch"];

export const rootReducer = combineReducers({
  [emptySplitApi.reducerPath]: emptySplitApi.reducer,
});

export const setupStore = (preloadedState?: any) =>
  configureStore({
    reducer: rootReducer,
    preloadedState,
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware().concat(emptySplitApi.middleware),
  });

interface IProps {
  children: ReactNode;
  preloadedState?: any;
  store?: IAppStore;
}

export const ReduxProvider: FC<IProps> = ({
  children,
  preloadedState,
  store = setupStore(preloadedState),
}) => <Provider store={store}>{children}</Provider>;
