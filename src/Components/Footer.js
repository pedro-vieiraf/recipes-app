import React from 'react';
import { useLocation, Link } from 'react-router-dom';
import drinkIcon from '../images/drinkIcon.svg';
import mealIcon from '../images/mealIcon.svg';

function Footer() {
  const location = useLocation();
  const allowedRoutes = ['/meals', '/drinks', '/profile'];
  const shouldDisplayFooter = allowedRoutes.includes(location.pathname);
  if (!shouldDisplayFooter) {
    return null;
  }

  return (
    <footer data-testid="footer" style={ { position: 'fixed', bottom: 0 } }>
      <Link to="/drinks" data-testid="drinks-bottom-btn" src={ drinkIcon }>
        <img src={ drinkIcon } alt="Ícone de Bebidas" />
      </Link>
      <Link to="/meals" data-testid="meals-bottom-btn" src={ mealIcon }>
        <img src={ mealIcon } alt="Ícone de Comidas" />
      </Link>
    </footer>
  );
}

export default Footer;
