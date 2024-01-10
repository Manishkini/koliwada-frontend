// ** React Imports
import { useState, forwardRef, useEffect } from 'react'

// ** MUI Imports
import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import Button from '@mui/material/Button'
import { styled, useTheme } from '@mui/material/styles'
import MenuItem from '@mui/material/MenuItem'
import Typography from '@mui/material/Typography'
import Fade from '@mui/material/Fade'
import IconButton from '@mui/material/IconButton'
import InputAdornment from '@mui/material/InputAdornment'

// ** Custom Component Import
import CustomTextField from 'src/@core/components/mui/text-field'

// ** Icon Imports
import Icon from 'src/@core/components/icon'

// ** Configs
import themeConfig from 'src/configs/themeConfig'

// ** Third Party Imports
import * as yup from 'yup'
import toast from 'react-hot-toast'
import { useForm, Controller } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'

import API from 'src/configs/axios'

const defaultValues = {
  firstName: '',
  middleName: '',
  lastName: '',
  firstNameNative: '',
  middleNameNative: '',
  lastNameNative: '',
  village: '',
  email: '',
  mobileNumber: '',
  password: '',
  confirmPassword: ''
}

const schema = yup.object().shape({
  firstName: yup
    .string()
    .required('First name is required')
    .matches(/^[A-Za-z\s]+$/, 'Please enter first name in english'),
  middleName: yup
    .string()
    .required('Middle name is required')
    .matches(/^[A-Za-z\s]+$/, 'Please enter middle name in english'),
  lastName: yup
    .string()
    .required('Last name is required')
    .matches(/^[A-Za-z\s]+$/, 'Please enter last name in english'),
  firstNameNative: yup
    .string()
    .required('First name is required in marathi')
    .matches(/^[ऀ-ॿ\s]+$/, 'Please enter first name in marathi'),
  middleNameNative: yup
    .string()
    .required('Middle name is required in marathi')
    .matches(/^[ऀ-ॿ\s]+$/, 'Please enter middle name in marathi'),
  lastNameNative: yup
    .string()
    .required('Last name is required in marathi')
    .matches(/^[ऀ-ॿ\s]+$/, 'Please enter last name in marathi'),
  village: yup.string().required(),
  email: yup
    .string()
    .required('Email is required')
    .matches(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/, 'Please enter a valid email address.'),
  mobileNumber: yup
    .string()
    .required('Mobile number is required')
    .matches(/^[6-9]\d{9}$/, 'Please enter valid mobile number'),
  password: yup
    .string()
    .required('Password is required')
    .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/, 'Password is too weak'),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref('password'), null], 'Password must match')
    .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/, 'Password is too weak')
})

const InvitationDialogAdmin = props => {
  const { Tabs, setActiveTab, setShow } = props

  // ** Hook
  const theme = useTheme()

  const [villages, setVillages] = useState([])
  const [isRegisterable, setIsRegisterable] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)

  // ** Hook
  const {
    control,
    handleSubmit,
    watch,
    formState: { errors }
  } = useForm({
    defaultValues,
    mode: 'onChange',
    resolver: yupResolver(schema)
  })
  const watchVillageField = watch('village')

  const watchAllFields = watch()

  const fetchVillages = async () => {
    const village = await API.get(`/village`)
    setVillages(village.data)
  }

  const createUser = async e => {
    try {
      const user = await API.post(`/auth/user/signup`, e)
      if (user.status === 201) {
        toast.success('Account successfully registered!')
        setActiveTab(Tabs.LOGIN)
      }
    } catch (err) {
      console.log(err)
    }
  }

  const onSubmit = e => {
    e.mobileNumber = `+91${e.mobileNumber}`
    // console.log(e)

    createUser(e)
  }

  useEffect(() => {
    fetchVillages()
  }, [])

  useEffect(() => {
    const {
      email,
      mobileNumber,
      firstName,
      firstNameNative,
      middleName,
      middleNameNative,
      lastName,
      lastNameNative,
      village,
      password,
      confirmPassword
    } = watchAllFields
    if (
      email &&
      mobileNumber &&
      firstName &&
      firstNameNative &&
      middleName &&
      middleNameNative &&
      lastName &&
      lastNameNative &&
      village &&
      password &&
      confirmPassword &&
      password === confirmPassword
    ) {
      setIsRegisterable(true)
    } else {
      setIsRegisterable(false)
    }
  }, [watchAllFields])

  return (
    <Box className='content-center' sx={{ mb: 8, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
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
          <form onSubmit={handleSubmit(onSubmit)}>
            <Grid container spacing={6}>
              <Grid item sm={12} xs={12}>
                <Controller
                  name='village'
                  control={control}
                  rules={{ required: true }}
                  render={({ field: { value, onChange } }) => (
                    <CustomTextField
                      select
                      fullWidth
                      disabled={!villages.length}
                      id='status-select'
                      label='Village'
                      SelectProps={{
                        value: value,
                        onChange: e => onChange(e)
                      }}
                      error={Boolean(errors.village)}
                      aria-describedby='validation-basic-select'
                      {...(errors.village && { helperText: 'This field is required' })}
                    >
                      {villages?.length ? (
                        villages.map(village => (
                          <MenuItem value={village.id} key={village.id}>
                            {village.name}
                          </MenuItem>
                        ))
                      ) : (
                        <MenuItem disabled>No data</MenuItem>
                      )}
                    </CustomTextField>
                  )}
                />
              </Grid>
              <Grid item sm={4} xs={12}>
                <Controller
                  name='firstName'
                  control={control}
                  rules={{ required: true }}
                  render={({ field: { value, onChange } }) => (
                    <CustomTextField
                      fullWidth
                      value={value}
                      label='First Name'
                      onChange={onChange}
                      placeholder='Leonard'
                      disabled={!watchVillageField}
                      error={Boolean(errors.firstName)}
                      aria-describedby='validation-schema-first-name'
                      {...(errors.firstName && { helperText: errors.firstName.message })}
                    />
                  )}
                />
              </Grid>
              <Grid item sm={4} xs={12}>
                <Controller
                  name='middleName'
                  control={control}
                  rules={{ required: true }}
                  render={({ field: { value, onChange } }) => (
                    <CustomTextField
                      fullWidth
                      value={value}
                      label='Middle Name'
                      onChange={onChange}
                      placeholder='Leonard'
                      disabled={!watchVillageField}
                      error={Boolean(errors.middleName)}
                      aria-describedby='validation-schema-first-name'
                      {...(errors.middleName && { helperText: errors.middleName.message })}
                    />
                  )}
                />
              </Grid>
              <Grid item sm={4} xs={12}>
                <Controller
                  name='lastName'
                  control={control}
                  rules={{ required: true }}
                  render={({ field: { value, onChange } }) => (
                    <CustomTextField
                      fullWidth
                      value={value}
                      label='Last Name'
                      onChange={onChange}
                      placeholder='Leonard'
                      disabled={!watchVillageField}
                      error={Boolean(errors.lastName)}
                      aria-describedby='validation-schema-first-name'
                      {...(errors.lastName && { helperText: errors.lastName.message })}
                    />
                  )}
                />
              </Grid>
              <Grid item sm={4} xs={12}>
                <Controller
                  name='firstNameNative'
                  control={control}
                  rules={{ required: true }}
                  render={({ field: { value, onChange } }) => (
                    <CustomTextField
                      fullWidth
                      value={value}
                      label='First Name Native'
                      onChange={onChange}
                      placeholder='Leonard'
                      disabled={!watchVillageField}
                      error={Boolean(errors.firstNameNative)}
                      aria-describedby='validation-schema-first-name'
                      {...(errors.firstNameNative && { helperText: errors.firstNameNative.message })}
                    />
                  )}
                />
              </Grid>
              <Grid item sm={4} xs={12}>
                <Controller
                  name='middleNameNative'
                  control={control}
                  rules={{ required: true }}
                  render={({ field: { value, onChange } }) => (
                    <CustomTextField
                      fullWidth
                      value={value}
                      label='Middle Name Native'
                      onChange={onChange}
                      placeholder='Leonard'
                      disabled={!watchVillageField}
                      error={Boolean(errors.middleNameNative)}
                      aria-describedby='validation-schema-first-name'
                      {...(errors.middleNameNative && { helperText: errors.middleNameNative.message })}
                    />
                  )}
                />
              </Grid>
              <Grid item sm={4} xs={12}>
                <Controller
                  name='lastNameNative'
                  control={control}
                  rules={{ required: true }}
                  render={({ field: { value, onChange } }) => (
                    <CustomTextField
                      fullWidth
                      value={value}
                      label='Last Name Native'
                      onChange={onChange}
                      placeholder='Leonard'
                      disabled={!watchVillageField}
                      error={Boolean(errors.lastNameNative)}
                      aria-describedby='validation-schema-first-name'
                      {...(errors.lastNameNative && { helperText: errors.lastNameNative.message })}
                    />
                  )}
                />
              </Grid>
              <Grid item sm={6} xs={12}>
                <Controller
                  name='email'
                  control={control}
                  rules={{ required: true }}
                  render={({ field: { value, onChange } }) => (
                    <CustomTextField
                      fullWidth
                      value={value}
                      label='Email'
                      onChange={onChange}
                      placeholder='johnDoe@email.com'
                      disabled={!watchVillageField}
                      error={Boolean(errors.email)}
                      aria-describedby='validation-schema-first-name'
                      {...(errors.email && { helperText: errors.email.message })}
                    />
                  )}
                />
              </Grid>
              <Grid item sm={6} xs={12}>
                <Controller
                  name='mobileNumber'
                  control={control}
                  rules={{ required: true }}
                  render={({ field: { value, onChange } }) => (
                    <CustomTextField
                      fullWidth
                      value={value}
                      label='Mobile number'
                      placeholder='202 555 0111'
                      disabled={!watchVillageField}
                      onChange={onChange}
                      error={Boolean(errors.mobileNumber)}
                      InputProps={{
                        startAdornment: <InputAdornment position='start'>IN (+91)</InputAdornment>
                      }}
                      {...(errors.mobileNumber && { helperText: errors.mobileNumber.message })}
                    />
                  )}
                />
              </Grid>
              <Grid item sm={6} xs={12}>
                <Controller
                  name='password'
                  control={control}
                  rules={{ required: true }}
                  render={({ field: { value, onChange } }) => (
                    <CustomTextField
                      fullWidth
                      autoFocus
                      label='New Password'
                      placeholder='············'
                      disabled={!watchVillageField}
                      value={value}
                      sx={{ display: 'flex' }}
                      id='auth-reset-password-new-password'
                      onChange={onChange}
                      type={showPassword ? 'text' : 'password'}
                      error={Boolean(errors.password)}
                      InputProps={{
                        endAdornment: (
                          <InputAdornment position='end'>
                            <IconButton
                              edge='end'
                              onClick={() => setShowPassword(true)}
                              onMouseDown={e => e.preventDefault()}
                              aria-label='toggle password visibility'
                            >
                              <Icon fontSize='1.25rem' icon={showPassword ? 'tabler:eye' : 'tabler:eye-off'} />
                            </IconButton>
                          </InputAdornment>
                        )
                      }}
                      {...(errors.password && { helperText: errors.password.message })}
                    />
                  )}
                />
              </Grid>
              <Grid item sm={6} xs={12}>
                <Controller
                  name='confirmPassword'
                  control={control}
                  rules={{ required: true }}
                  render={({ field: { value, onChange } }) => (
                    <CustomTextField
                      fullWidth
                      label='Confirm Password'
                      placeholder='············'
                      disabled={!watchVillageField}
                      sx={{ display: 'flex' }}
                      value={value}
                      id='auth-reset-password-confirm-password'
                      type={showConfirmPassword ? 'text' : 'password'}
                      onChange={onChange}
                      error={Boolean(errors.confirmPassword)}
                      InputProps={{
                        endAdornment: (
                          <InputAdornment position='end'>
                            <IconButton
                              edge='end'
                              onMouseDown={e => e.preventDefault()}
                              aria-label='toggle password visibility'
                              onClick={() => setShowConfirmPassword(true)}
                            >
                              <Icon fontSize='1.25rem' icon={showConfirmPassword ? 'tabler:eye' : 'tabler:eye-off'} />
                            </IconButton>
                          </InputAdornment>
                        )
                      }}
                      {...(errors.confirmPassword && { helperText: errors.confirmPassword.message })}
                    />
                  )}
                />
              </Grid>
            </Grid>

            <Button fullWidth type='submit' variant='contained' sx={{ mb: 4, mt: 4 }} disabled={!isRegisterable}>
              Register
            </Button>
            <Box sx={{ display: 'flex', alignItems: 'center', flexWrap: 'wrap', justifyContent: 'center' }}>
              <Typography sx={{ color: 'text.secondary', mr: 2 }}>Already have an account?</Typography>
              <Typography
                sx={{ color: `${theme.palette.primary.main} !important`, cursor: 'pointer' }}
                onClick={() => setActiveTab(Tabs.LOGIN)}
              >
                Log in here
              </Typography>
            </Box>
          </form>
        </CardContent>
      </Card>
    </Box>
  )
}

export default InvitationDialogAdmin
