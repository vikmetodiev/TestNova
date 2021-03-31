import { enableStaticRendering } from "mobx-react-lite";
import React, { createContext, ReactNode, useContext } from "react";
import AppStore from "./stores/AppStoreNew";

enableStaticRendering(typeof window === "undefined");

const store = new AppStore();
const StoreContext = createContext(store);

export function useRootStore(isStatic) {
  if (isStatic) {
    return store;
  }
  const context = useContext(StoreContext);
  if (context === undefined) {
    throw new Error("useRootStore must be used within RootStoreProvider");
  }

  return context;
}

export function RootStoreProvider({ children }) {
  //const store = initializeStore();

  return (
    <StoreContext.Provider value={store}>{children}</StoreContext.Provider>
  );
}
function initializeStore(initialData) {
  const _store = store ?? new AppStore();

  if (initialData) {
    _store.hydrate(initialData);
  }
  // For SSG and SSR always create a new store
  if (typeof window === "undefined") return _store;
  // Create the store once in the client
  if (!store) store = _store;

  return _store;
}
