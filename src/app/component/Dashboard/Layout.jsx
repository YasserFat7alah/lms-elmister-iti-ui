import React from 'react'
import Sidebar from './Sidebar';
import Topbar from './Topbar';

const Layout = ({ children }) => {
  return (
    <div>
        {/* SIDEBAR */}
        <Sidebar />

        {/* MAIN CONTENT */}
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