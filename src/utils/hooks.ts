import {useDispatch} from "react-redux";
import {RootActionsType, RootStateType} from "../bll/store";
import {ThunkDispatch} from 'redux-thunk';
import {useLocation} from "react-router-dom";

export type ThunkDispatchType = ThunkDispatch<RootStateType, any, RootActionsType>

export const useAppDispatch = () => useDispatch<ThunkDispatchType>();

export const useQuery = () => new URLSearchParams(useLocation().search);