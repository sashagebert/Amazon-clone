import React from 'react';
import SearchIcon from '@material-ui/icons/Search';
import ShoppingBasketIcon from '@material-ui/icons/ShoppingBasket';
import { Link, useHistory } from 'react-router-dom';

import './Header.css';
import { auth } from '../../firebase';
import { useStateValue } from '../../contextAPI/StateProvider';
import SubHeader from './subheader/SubHeader';

const Header = () => {
  const [{ basket, user }] = useStateValue();
  const history = useHistory();

  const handleSignOut = () => {
    if (user) {
      auth.signOut();
      history.push('/');
    }
  };

  return (
    <div className='navbar'>
      <div className='header'>
        <Link to='/'>
          <img
            className='header__logo'
            alt='logo'
            src='http://pngimg.com/uploads/amazon/amazon_PNG11.png'
          />
        </Link>
        <div className='header__searchCnt'>
          <input className='header__searchBar' type='text' />
          <SearchIcon className='header__searchIcon' />
        </div>

        <div className='header__nav'>
          <Link to={!user && '/login'}>
            <div
              onKeyDown={user && handleSignOut}
              role='button'
              onClick={user && handleSignOut}
              className='header__option'
              tabIndex={0}
            >
              <span className='header__optionLineOne'>
                {user ? `Welcome ${user.email}` : 'Hello Guest'}
              </span>
              <span className='header__optionLineTwo'>
                {user ? 'Sign Out' : 'Sign In'}
              </span>
            </div>
          </Link>

          <Link to='/orders'>
            <div className='header__option'>
              <span className='header__optionLineOne'>Returns</span>
              <span className='header__optionLineTwo'>&Orders</span>
            </div>
          </Link>

          <div className='header__option'>
            <span className='header__optionLineOne'>Your</span>
            <span className='header__optionLineTwo'> Prime</span>
          </div>

          <Link to='/checkout'>
            <div className='header__optionBasket'>
              <ShoppingBasketIcon />
              <span className='header__optionLineTwo header__basketCount'>
                {basket?.length}
              </span>
            </div>
          </Link>
        </div>
      </div>
      <SubHeader />
    </div>
  );
};

export default Header;
