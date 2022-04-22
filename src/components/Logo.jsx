import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';


const Logo = () => {
  return (
    <div>
        <Link to={"/"}>
            <Brand>HamsaTreatsss.</Brand>
        </Link>
    </div>
  )
}

const Brand = styled.div`
    font-family: 'Lobster Two', cursive;
    font-weight: 700;
    padding: 1.5rem 0rem;
    font-size: 2rem;
`

export default Logo;