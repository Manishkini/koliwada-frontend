// ** React Imports
import { useState, forwardRef } from 'react'

// ** Next Import
import Link from 'next/link'

// ** MUI Components
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Divider from '@mui/material/Divider'
import Checkbox from '@mui/material/Checkbox'
import Typography from '@mui/material/Typography'
import IconButton from '@mui/material/IconButton'
import CardContent from '@mui/material/CardContent'
import { styled, useTheme } from '@mui/material/styles'
import MuiCard from '@mui/material/Card'
import InputAdornment from '@mui/material/InputAdornment'
import MuiFormControlLabel from '@mui/material/FormControlLabel'
import Fade from '@mui/material/Fade'
import Dialog from '@mui/material/Dialog'
import DialogContent from '@mui/material/DialogContent'

// ** Custom Component Import
import CustomTextField from 'src/@core/components/mui/text-field'

// ** Icon Imports
import Icon from 'src/@core/components/icon'

// ** Configs
import themeConfig from 'src/configs/themeConfig'

// ** Layout Import
import BlankLayout from 'src/@core/layouts/BlankLayout'

// ** Demo Imports
import AuthIllustrationV1Wrapper from 'src/views/pages/auth/AuthIllustrationV1Wrapper'

const Transition = forwardRef(function Transition(props, ref) {
  return <Fade ref={ref} {...props} />
})

// ** Styled Components
const Card = styled(MuiCard)(({ theme }) => ({
  [theme.breakpoints.up('sm')]: { width: '25rem' }
}))

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

const LinkStyled = styled(Link)(({ theme }) => ({
  textDecoration: 'none',
  color: `${theme.palette.primary.main} !important`
}))

const FormControlLabel = styled(MuiFormControlLabel)(({ theme }) => ({
  '& .MuiFormControlLabel-label': {
    color: theme.palette.text.secondary
  }
}))

const LoginV1 = props => {
  const { show, setShow } = props

  // ** State
  const [values, setValues] = useState({
    password: '',
    showPassword: false
  })

  // ** Hook
  const theme = useTheme()

  const handleChange = prop => event => {
    setValues({ ...values, [prop]: event.target.value })
  }

  const handleClickShowPassword = () => {
    setValues({ ...values, showPassword: !values.showPassword })
  }

  return (
    <Dialog
      open={show}
      maxWidth='md'
      scroll='body'
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
        <Box className='content-center' sx={{ mb: 8, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <AuthIllustrationV1Wrapper>
            <Card>
              <CardContent sx={{ p: theme => `${theme.spacing(10.5, 8, 8)} !important` }}>
                <Box sx={{ mb: 8, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <svg width={34} viewBox='0 0 32 22' fill='none' xmlns='http://www.w3.org/2000/svg'>
                    <path
                      fillRule='evenodd'
                      clipRule='evenodd'
                      fill={theme.palette.primary.main}
                      d='M0.00172773 0V6.85398C0.00172773 6.85398 -0.133178 9.01207 1.98092 10.8388L13.6912 21.9964L19.7809 21.9181L18.8042 9.88248L16.4951 7.17289L9.23799 0H0.00172773Z'
                    />
                    <path
                      fill='#161616'
                      opacity={0.06}
                      fillRule='evenodd'
                      clipRule='evenodd'
                      d='M7.69824 16.4364L12.5199 3.23696L16.5541 7.25596L7.69824 16.4364Z'
                    />
                    <path
                      fill='#161616'
                      opacity={0.06}
                      fillRule='evenodd'
                      clipRule='evenodd'
                      d='M8.07751 15.9175L13.9419 4.63989L16.5849 7.28475L8.07751 15.9175Z'
                    />
                    <path
                      fillRule='evenodd'
                      clipRule='evenodd'
                      fill={theme.palette.primary.main}
                      d='M7.77295 16.3566L23.6563 0H32V6.88383C32 6.88383 31.8262 9.17836 30.6591 10.4057L19.7824 22H13.6938L7.77295 16.3566Z'
                    />
                  </svg>
                  <Typography variant='h3' sx={{ ml: 2.5, fontWeight: 700 }}>
                    {themeConfig.templateName}
                  </Typography>
                </Box>
                <Box sx={{ mb: 6 }}>
                  <Typography variant='h4' sx={{ mb: 1.5 }}>
                    {`Welcome to ${themeConfig.templateName}! 👋🏻`}
                  </Typography>
                  <Typography sx={{ color: 'text.secondary' }}>
                    Please sign-in to your account and start the adventure
                  </Typography>
                </Box>
                <form noValidate autoComplete='off' onSubmit={e => e.preventDefault()}>
                  <CustomTextField
                    autoFocus
                    fullWidth
                    id='email'
                    label='Email'
                    sx={{ mb: 4 }}
                    placeholder='john.doe@gmail.com'
                  />
                  <CustomTextField
                    fullWidth
                    sx={{ mb: 1.5 }}
                    label='Password'
                    value={values.password}
                    id='auth-login-password'
                    placeholder='············'
                    onChange={handleChange('password')}
                    type={values.showPassword ? 'text' : 'password'}
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position='end'>
                          <IconButton
                            edge='end'
                            onClick={handleClickShowPassword}
                            onMouseDown={e => e.preventDefault()}
                            aria-label='toggle password visibility'
                          >
                            <Icon fontSize='1.25rem' icon={values.showPassword ? 'tabler:eye' : 'tabler:eye-off'} />
                          </IconButton>
                        </InputAdornment>
                      )
                    }}
                  />
                  <Box
                    sx={{
                      mb: 1.75,
                      display: 'flex',
                      flexWrap: 'wrap',
                      alignItems: 'center',
                      justifyContent: 'space-between'
                    }}
                  >
                    <FormControlLabel control={<Checkbox />} label='Remember Me' />
                  </Box>
                  <Button fullWidth type='submit' variant='contained' sx={{ mb: 4 }}>
                    Login
                  </Button>
                </form>
              </CardContent>
            </Card>
          </AuthIllustrationV1Wrapper>
        </Box>
      </DialogContent>
    </Dialog>
  )
}

export default LoginV1
