import { useAuth } from 'src/hooks/useAuth'

const CanViewNavLink = props => {
  // ** Props
  const { children, navLink } = props
  console.log(navLink)

  // ** Hook
  const auth = useAuth()

  if (auth.user && navLink?.auth) {
    // if user is logged-in show them products, villages, village level gallery dropdown etc
    return <>{children}</>
  } else if (navLink && !navLink.auth) {
    // if user is not logged-in show them basic dropdowns
    return <>{children}</>
  } else {
    return null
  }
}

export default CanViewNavLink
