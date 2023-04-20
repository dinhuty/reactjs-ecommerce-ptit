import React from 'react'
import { BrowserRouter, Routes, Route, Router, Outlet } from 'react-router-dom';
import { Fragment } from 'react';
import { publicRouter } from './routers/router'
import DefaultLayout from './Layouts/DefaultLayout/DefaultLayout'


function App() {
  return (
    <BrowserRouter>
      <div className="app">
        <Routes>
          {
            publicRouter.map((route, index) => {
              let Layout = DefaultLayout
              if (route.layout === null) Layout = Fragment
              else if (route.layout) {
                Layout = route.layout
              }
              const Page = route.component
              return <Route key={index} path={route.path} element={<Layout><Page /></Layout>} />
            })
          }
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
