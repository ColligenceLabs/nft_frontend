export default function authHeader() {
  const { accessToken } = JSON.parse(localStorage.getItem('user'));
  console.log(accessToken);
  if (accessToken) {
    return { Authorization: `Bearer ${accessToken}` };
  } else {
    return {};
  }
}
