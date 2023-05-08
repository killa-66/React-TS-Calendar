import React, { useEffect } from 'react'
import { Routes, Route, Navigate, useNavigate } from 'react-router-dom'
import { RouteNames, privatRoutes, publicRoutes } from '../router';

export default function AppRouter() {
  const auth = true;
  const navigate = useNavigate()
  useEffect(() => {
    if(!auth) {
      navigate(RouteNames.LOGIN);
    } navigate(RouteNames.EVENT)
  })
  return (
    auth === true 
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
