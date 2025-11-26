import React from 'react'
import Sidebar from './Sidebar';
import Topbar from './Topbar';

const Layout = ({ children }) => {
  return (
    <div>
        <Sidebar />

        <div>
            <Topbar />
            
            <main>
                {children}
            </main>
        </div>
    </div>
  )
}

export default Layout;