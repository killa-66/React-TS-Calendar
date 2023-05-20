import axios from "axios";
import { AppDispatch } from "../..";
import { IUser } from "../../../models/IUser";
import { AuthActionsEnum, SetAuthAction, SetErrorAction, SetIsLoadingAction, SetUserAction } from "./types";

export const AuthActionCreators = {
  setUser: (user: IUser): SetUserAction => ({type: AuthActionsEnum.SET_USER, payload: user}),
  setAuth: (auth: boolean): SetAuthAction => ({type: AuthActionsEnum.SET_AUTH, payload: auth}),
  setError: (payload: string): SetErrorAction => ({type: AuthActionsEnum.SET_ERROR, payload}),
  setIsLoading: (payload: boolean): SetIsLoadingAction => ({type: AuthActionsEnum.SET_IS_LOADING, payload}),
  login: (username: string, password: string) => async (dispatch: AppDispatch) => {
    try {
      dispatch(AuthActionCreators.setIsLoading(true));
      setTimeout(async () => {
        const response = await axios.get<IUser[]>('./users.json')
        const mockUser = response.data.find(user => user.username === username && user.password === password)
        if(mockUser) {
          localStorage.setItem('auth', 'true');
          localStorage.setItem('username', mockUser.username);
          dispatch(AuthActionCreators.setAuth(true));
          dispatch(AuthActionCreators.setUser(mockUser));
        } else {
          dispatch(AuthActionCreators.setError('Ошибка в имени пользователя или в пароле'));
        }
        dispatch(AuthActionCreators.setIsLoading(false));
      }, 1000)
    } catch(e) {
      dispatch(AuthActionCreators.setError('Произошла ошибка при логине'))
    }
  },
  logout: () => async (dispatch: AppDispatch) => {
      localStorage.removeItem('auth')
      localStorage.removeItem('username')
      dispatch(AuthActionCreators.setUser({} as IUser))
      dispatch(AuthActionCreators.setAuth(false))
  }
}