import React, { useEffect } from 'react'
import { Routes, Route, Navigate, useNavigate } from 'react-router-dom'
import { RouteNames, privatRoutes, publicRoutes } from '../router';
import { useSelector } from 'react-redux';
import { useTypedSelector } from '../hooks/useTypedSelector';

export default function AppRouter() {
  const {isAuth} = useTypedSelector(state => state.auth)
  const navigate = useNavigate()
  useEffect(() => {
    if(!isAuth) {
      navigate(RouteNames.LOGIN);
    } else {
      navigate(RouteNames.EVENT)
    }
  })
  return (
    isAuth
    ? 
    <Routes>
      {privatRoutes.map(route =>  {
        const Element = route.element;
        return(
          <Route 
            path={route.path} 
            element={<Element />}
            key={route.path}
          />
      )})}
    </Routes>
    : 
    <Routes>
      {publicRoutes.map(route => {
        const Element = route.element;
        return (
          <Route 
            path={route.path} 
            element={<Element />}
            key={route.path}
          />
      )})}
    </Routes>
  )
}
