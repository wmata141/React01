import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { useHistory } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { FaShoppingCart } from 'react-icons/fa';
import marvelLogo from '../assets/images/marvel_logo.png';

const NavBar = ({ ableSearch, title, route }) => {    
    const cartItems = useSelector((state) => state);

    let history = useHistory();    
    const handleClick = () => {
        history.push(route);
    }
    
    return (
        <header className='navbar'>
            <div className='navbar-title navbar-item'>
                <img src={marvelLogo} alt="MARVEL" width={70} />
                {
                    ableSearch ? (
                        <div className="input-icono">
                            <input
                                placeholder='Buscar'
                                id="input"
                            />
                        </div>
                    ) : <div>{title}</div>
                }
            </div>
            <div className='navbar-item' onClick={handleClick}>                
                <CountContainer>                    
                    <CountText>{cartItems.length}</CountText>
                </CountContainer>
                <FaShoppingCart size={25} style={{marginTop: '5px'}}/>
            </div>
        </header>
    )
}

NavBar.defaultProps = {
    handleChange: PropTypes.func
};

NavBar.propTypes = {
    ableSearch: PropTypes.bool.isRequired,
    handleChange: PropTypes.func.isRequired,
};

export default NavBar

const CountContainer = styled.div`
    position: absolute;
    height: 20px;
    width: 20px;
    border-radius: 15px;
    background-color: #FF7D7D;
    right: 30px;
    align-items: center;
    justify-content: center;
    z-index: 2000;
`
const CountText = styled.h1`
    color: white;
    margin: 0;
    font-size: 15px;
    padding-left: 6px;
    padding-top: 2px;
    font-weight: bold;
`;