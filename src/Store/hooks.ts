import { useDispatch, useSelector } from "react-redux";

import type { RootState, AppDispatch } from "./store";

export const useAppDispach = () => useDispatch<AppDispatch>();
export const useAppSelector = useSelector.withTypes<RootState>();
