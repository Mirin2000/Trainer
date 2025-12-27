import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import Trainer from './Trainer.jsx'
import { Box } from '@mui/material'

const outerBoxSx = {

  display: 'flex',
  width: '100%',
  height: '100vh',
  overflowY: 'hidden',
  flexDirection: 'column',
  boxSizing: 'border-box'

}

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Box sx={outerBoxSx}>
      <Trainer />
    </Box>
  </StrictMode>
);