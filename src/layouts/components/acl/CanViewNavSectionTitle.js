import { useAuth } from 'src/hooks/useAuth'

const CanViewNavSectionTitle = props => {
  // ** Props
  const { children, navTitle } = props

  // ** Hook
  const auth = useAuth()
  if (auth.user && navTitle?.auth) {
    // if user is logged-in show them products, villages, village level gallery dropdown etc
    return <>{children}</>
  } else if (navTitle && !navTitle.auth) {
    // if user is not logged-in show them basic dropdowns
    return <>{children}</>
  } else {
    return null
  }
}

export default CanViewNavSectionTitle
