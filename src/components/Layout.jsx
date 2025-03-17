import React from 'react'
import Header from './Header'
import { Outlet } from 'react-router'
import Sidebar from './Sidebar'
import { Box, Container, Toolbar } from '@mui/material'
function Layout() {
    return (
        <Box sx={{ display: 'flex' }}>
            <Header />
            <Sidebar />
            <Box
                component="main"
                sx={{
                    flexGrow: 1,
                    p: 3,
                    width: { sm: `calc(100% - 240px)` },
                    // ml: { sm: '240px' }
                }}
            >
                <Toolbar />
                <Container maxWidth="xl" sx={{ pl: '0px !important', pt: 3, pb: 3, m:0  }}>
                    <Outlet />
                </Container>
            </Box>
        </Box>
    )
}

export default Layout