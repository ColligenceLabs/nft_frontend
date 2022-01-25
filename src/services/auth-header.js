export default function authHeader() {
  const accessToken = localStorage.getItem('accessToken');
  console.log(accessToken);
  if (accessToken) {
    return { Authorization: `Bearer ${accessToken}` };
  } else {
    return {};
  }
}
