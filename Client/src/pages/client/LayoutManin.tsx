import React from 'react'
import Header from '../../components/Header'
import { Outlet } from 'react-router-dom'

export default function LayoutManin() {
  return (
    <div>
      <Header/>
      <Outlet/>
    </div>
  )
}
