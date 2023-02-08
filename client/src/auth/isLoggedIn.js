import jwt from 'jsonwebtoken';

const isLoggedIn = () => {
  const token = localStorage.getItem('token');
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    return true;
  } catch (err) {
    return false;
  }
};

export default isLoggedIn;
