// ** React Imports
import { useState, Fragment } from 'react'

// ** Next Import
import { useRouter } from 'next/router'

// ** MUI Imports
import Box from '@mui/material/Box'
import Menu from '@mui/material/Menu'
import Badge from '@mui/material/Badge'
import Avatar from '@mui/material/Avatar'
import Divider from '@mui/material/Divider'
import { styled } from '@mui/material/styles'
import Typography from '@mui/material/Typography'
import MenuItem from '@mui/material/MenuItem'

// ** Icon Imports
import Icon from 'src/@core/components/icon'

// ** Context
import { useAuth } from 'src/hooks/useAuth'
import LoginV1 from 'src/layouts/components/Login/index'

// ** Styled Components
const BadgeContentSpan = styled(Icon)(({ theme }) => ({
  width: 15,
  height: 15,
  borderRadius: '50%',
  backgroundColor: theme.palette.primary.main,
  boxShadow: `0 0 0 2px ${theme.palette.background.paper}`
}))

const MenuItemStyled = styled(MenuItem)(({ theme }) => ({
  '&:hover .MuiBox-root, &:hover .MuiBox-root svg': {
    color: theme.palette.primary.main
  }
}))

const UserDropdown = props => {
  // ** Props
  const { settings } = props

  // ** States
  const [anchorEl, setAnchorEl] = useState(null)
  const [show, setShow] = useState(false)

  // ** Hooks
  const router = useRouter()
  const { logout, user } = useAuth()

  // ** Vars
  const { direction } = settings

  const handleDropdownOpen = event => {
    setAnchorEl(event.currentTarget)
  }

  const handleDropdownClose = url => {
    if (url) {
      router.push(url)
    }
    setAnchorEl(null)
  }

  const styles = {
    px: 4,
    py: 1.75,
    width: '100%',
    display: 'flex',
    alignItems: 'center',
    color: 'text.primary',
    textDecoration: 'none',
    '& svg': {
      mr: 2.5,
      fontSize: '1.5rem',
      color: 'text.secondary'
    }
  }

  const handleLogout = () => {
    logout()
    handleDropdownClose()
  }

  if (user) {
    return (
      <Fragment>
        <Badge
          overlap='circular'
          onClick={handleDropdownOpen}
          sx={{ ml: 2, cursor: 'pointer' }}
          badgeContent={user?.isApproved && <BadgeContentSpan icon={'typcn:tick'} />}
          anchorOrigin={{
            vertical: 'top',
            horizontal: 'right'
          }}
        >
          <Avatar
            alt='John Doe'
            src={user ? '/images/avatars/1.png' : '/images/avatars/default_user.png'}
            onClick={handleDropdownOpen}
            sx={{ width: 38, height: 38 }}
          />
        </Badge>
        <Menu
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={() => handleDropdownClose()}
          sx={{ '& .MuiMenu-paper': { width: 230, mt: 4.75 } }}
          anchorOrigin={{ vertical: 'bottom', horizontal: direction === 'ltr' ? 'right' : 'left' }}
          transformOrigin={{ vertical: 'top', horizontal: direction === 'ltr' ? 'right' : 'left' }}
        >
          <Box sx={{ py: 1.75, px: 6 }}>
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <Badge
                overlap='circular'
                badgeContent={<BadgeContentSpan />}
                anchorOrigin={{
                  vertical: 'bottom',
                  horizontal: 'right'
                }}
              >
                <Avatar
                  alt='John Doe'
                  src={user ? '/images/avatars/1.png' : '/images/avatars/default_user.png'}
                  sx={{ width: '2.5rem', height: '2.5rem' }}
                />
              </Badge>
              <Box sx={{ display: 'flex', ml: 2.5, alignItems: 'flex-start', flexDirection: 'column' }}>
                <Typography sx={{ fontWeight: 500 }}>Manish Kini</Typography>
                <Typography variant='body2'>Charkop</Typography>
              </Box>
            </Box>
          </Box>
          <Divider sx={{ my: theme => `${theme.spacing(2)} !important` }} />
          <MenuItemStyled sx={{ p: 0 }} onClick={() => handleDropdownClose()}>
            <Box sx={styles}>
              <Icon icon='tabler:user-check' />
              My Profile
            </Box>
          </MenuItemStyled>
          <MenuItemStyled sx={{ p: 0 }} onClick={() => handleDropdownClose()}>
            <Box sx={styles}>
              <Icon icon='tabler:settings' />
              Settings
            </Box>
          </MenuItemStyled>
          <MenuItemStyled sx={{ p: 0 }} onClick={() => handleDropdownClose()}>
            <Box sx={styles}>
              <Icon icon='tabler:credit-card' />
              Billing
            </Box>
          </MenuItemStyled>
          <Divider sx={{ my: theme => `${theme.spacing(2)} !important` }} />
          <MenuItemStyled sx={{ p: 0 }} onClick={() => handleDropdownClose()}>
            <Box sx={styles}>
              <Icon icon='tabler:lifebuoy' />
              Help
            </Box>
          </MenuItemStyled>
          <MenuItemStyled sx={{ p: 0 }} onClick={() => handleDropdownClose()}>
            <Box sx={styles}>
              <Icon icon='tabler:info-circle' />
              FAQ
            </Box>
          </MenuItemStyled>
          <MenuItemStyled sx={{ p: 0 }} onClick={() => handleDropdownClose()}>
            <Box sx={styles}>
              <Icon icon='tabler:currency-dollar' />
              Pricing
            </Box>
          </MenuItemStyled>
          <Divider sx={{ my: theme => `${theme.spacing(2)} !important` }} />
          <MenuItemStyled sx={{ p: 0 }} onClick={handleLogout}>
            <Box sx={styles}>
              <Icon icon='tabler:logout' />
              Sign Out
            </Box>
          </MenuItemStyled>
        </Menu>
      </Fragment>
    )
  }

  return (
    <Fragment>
      <Avatar
        alt='John Doe'
        src='/images/avatars/default_user.png'
        onClick={handleDropdownOpen}
        sx={{ width: 38, height: 38, cursor: 'pointer' }}
      />
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={() => handleDropdownClose()}
        sx={{ '& .MuiMenu-paper': { width: 230, mt: 4.75 } }}
        anchorOrigin={{ vertical: 'bottom', horizontal: direction === 'ltr' ? 'right' : 'left' }}
        transformOrigin={{ vertical: 'top', horizontal: direction === 'ltr' ? 'right' : 'left' }}
      >
        <MenuItemStyled
          sx={{ p: 0 }}
          onClick={() => {
            setShow(true)
            handleDropdownClose()
          }}
        >
          <Box sx={styles}>
            <Icon icon='fluent-mdl2:signin' />
            Log In / Register
          </Box>
        </MenuItemStyled>
      </Menu>
      <LoginV1 show={show} setShow={setShow} />
    </Fragment>
  )
}

export default UserDropdown
