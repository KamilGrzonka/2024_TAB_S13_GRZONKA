import logo from '../../assets/logo.png';
import { NavLink } from 'react-router-dom';
import { SidebarData } from './SidebarData';
import './Navbar.css';
import { IconContext } from 'react-icons';

function Navbar() {
  
  return (
    <>
      <IconContext.Provider value={{ color: '#fff' }}>
        <nav className='nav-menu'>
          <ul className='nav-menu-items'>
            <img src={logo} className='logo' alt="logo" />
            {SidebarData.map((item, index) => {
              return (
                <li key={index} className={item.cName}>
                  <NavLink to={item.path}>
                    {/* {item.icon} */}
                    <span>{item.title}</span>
                  </NavLink>
                </li>
              );
            })}
          </ul>
        </nav>
      </IconContext.Provider>
    </>
  );
}

export default Navbar;
