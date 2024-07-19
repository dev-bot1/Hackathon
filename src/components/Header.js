import React from 'react';
import { Link } from 'react-router-dom';
 
const Header = ({ title }) => {
  return (
<header>
<h1>{title}</h1>
<Link to="/">Logout</Link>
</header>
  );
};
 
export default Header;