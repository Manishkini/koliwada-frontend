// ** React Imports
import { useState, forwardRef } from 'react'

// ** MUI Components
import IconButton from '@mui/material/IconButton'
import { styled } from '@mui/material/styles'
import Fade from '@mui/material/Fade'
import Dialog from '@mui/material/Dialog'
import DialogContent from '@mui/material/DialogContent'

// ** Icon Imports
import Icon from 'src/@core/components/icon'

import Login from './Login'
import SignUp from './SignUp'
import ForgotPasswordV1 from './ForgotPassword'

const Transition = forwardRef(function Transition(props, ref) {
  return <Fade ref={ref} {...props} />
})

const CustomCloseButton = styled(IconButton)(({ theme }) => ({
  top: 0,
  right: 0,
  color: 'grey.500',
  position: 'absolute',
  boxShadow: theme.shadows[2],
  transform: 'translate(10px, -10px)',
  borderRadius: theme.shape.borderRadius,
  backgroundColor: `${theme.palette.background.paper} !important`,
  transition: 'transform 0.25s ease-in-out, box-shadow 0.25s ease-in-out',
  '&:hover': {
    transform: 'translate(7px, -5px)'
  }
}))

const Tabs = {
  LOGIN: 'login',
  REGISTER: 'register',
  FORGOT_PASSWORD: 'forgot_password'
}

const LoginSignUp = props => {
  const { show, setShow } = props

  // ** State
  const [activeTab, setActiveTab] = useState(Tabs.LOGIN)

  return (
    <Dialog
      open={show}
      maxWidth='md'
      onClose={() => setShow(false)}
      TransitionComponent={Transition}
      onBackdropClick={() => setShow(false)}
      sx={{ '& .MuiDialog-paper': { overflow: 'visible' } }}
    >
      <DialogContent
        sx={{
          pb: theme => `${theme.spacing(8)} !important`,
          px: theme => [`${theme.spacing(5)} !important`, `${theme.spacing(15)} !important`],
          pt: theme => [`${theme.spacing(8)} !important`, `${theme.spacing(12.5)} !important`]
        }}
      >
        <CustomCloseButton onClick={() => setShow(false)}>
          <Icon icon='tabler:x' fontSize='1.25rem' />
        </CustomCloseButton>
        {activeTab === Tabs.LOGIN ? (
          <Login setActiveTab={setActiveTab} Tabs={Tabs} setShow={setShow} />
        ) : activeTab === Tabs.REGISTER ? (
          <SignUp setActiveTab={setActiveTab} Tabs={Tabs} setShow={setShow} />
        ) : (
          <ForgotPasswordV1 setActiveTab={setActiveTab} Tabs={Tabs} setShow={setShow} />
        )}
      </DialogContent>
    </Dialog>
  )
}

export default LoginSignUp
