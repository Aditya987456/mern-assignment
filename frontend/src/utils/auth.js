// after that we dont need to pass the token in every middleware protected routes in backend...

export const getAuthConfig = () => ({
  headers: {
    Authorization: `Bearer ${localStorage.getItem("token")}`,
  },
});