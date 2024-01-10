export default {
  meEndpoint: '/auth/user/me',
  loginEndpoint: '/auth/user/signin',
  registerEndpoint: '/jwt/register',
  storageTokenKeyName: 'accessToken',
  onTokenExpiration: 'refreshToken' // logout | refreshToken
}
