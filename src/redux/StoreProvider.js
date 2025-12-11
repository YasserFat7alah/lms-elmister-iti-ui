"use client";
/* eslint-disable react-hooks/refs */
import { useRef } from "react";
import { Provider } from "react-redux";
import { makeStore } from "./store";

export default function StoreProvider({ children }) {
  const storeRef = useRef();

  if (!storeRef.current) {
    storeRef.current = makeStore();
  }

  /* eslint-disable react-hooks/refs */
  return <Provider store={storeRef.current}>{children}</Provider>;
  /* eslint-enable react-hooks/refs */
}