import React from 'react';
import { Link } from 'react-router-dom';
import { FaHome, FaSignInAlt, FaUserAlt } from 'react-icons/fa';
import { useSelector } from 'react-redux';

import { Nav } from './styled';

export default function Header() {
  const botaoClicado = useSelector(
    (state) => state.exampleReducer.botaoClicado
  );

  return (
    <Nav>
      <Link to="/">
        <FaHome size={24} />
      </Link>
      <Link to="/login">
        <FaUserAlt size={24} />
      </Link>
      <Link to="/asd">
        <FaSignInAlt size={24} />
      </Link>
      {botaoClicado ? 'Clicado' : 'Nao Clicado'}
    </Nav>
  );
}
