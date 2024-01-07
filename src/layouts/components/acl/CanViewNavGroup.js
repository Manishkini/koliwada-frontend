import { useAuth } from 'src/hooks/useAuth'

const CanViewNavGroup = props => {
  // ** Props
  const { children, navGroup } = props

  // ** Hook
  const auth = useAuth()

  if (auth.user && navGroup?.auth) {
    // if user is logged-in show them products, villages, village level gallery dropdown etc
    return <>{children}</>
  } else if (navGroup && !navGroup.auth) {
    // if user is not logged-in show them basic dropdowns
    return <>{children}</>
  } else {
    return null
  }
}

export default CanViewNavGroup
