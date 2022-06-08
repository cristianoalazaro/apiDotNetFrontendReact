/*import {TypedUseSelectorHook, useDispatch, useSelector} from 'react-redux';
import {RootState, AppDispatch} from './store';

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;*/

import { TypedUseSelectorHook, useSelector } from "react-redux";
import { RootState } from "./store";

export  const userAppSelector: TypedUseSelectorHook<RootState> = useSelector;