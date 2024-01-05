import { useEffect } from 'react'
import { useRouter } from 'next/router'
import { useAuth } from 'src/hooks/useAuth'
import Spinner from 'src/@core/components/spinner'

const Home = () => {
  const auth = useAuth()
  const router = useRouter()

  useEffect(() => {
    router.replace('/home')
  }, [auth.user, router])

  return <Spinner sx={{ height: '100%' }} />
}

export default Home
