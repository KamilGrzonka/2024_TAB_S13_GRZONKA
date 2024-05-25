import logo from '../../assets/logo.png';
import { NavLink } from 'react-router-dom';
import { SidebarData } from './SidebarData';
import './Navbar.css';
import { IconContext } from 'react-icons';
import { ModeToggle } from '../ui/mode-toggle';

function Navbar() {
  
  return (
    <>
      <IconContext.Provider value={{ color: '#fff' }}>
        <nav className='nav-menu'>
          <ul className='nav-menu-items relative'>
            <img src={logo} className='logo' alt="logo" />
            {SidebarData.map((item, index) => {
              return (
                <li key={index} className={item.cName}>
                  <NavLink
                    to={item.path}
                    className={({ isActive }) => (isActive ? 'nav-link active' : 'nav-link')}
                    end={item.path === '/'}
                  >
                    {/* {item.icon} */}
                    <span className='nav-title'>{item.title}</span>
                  </NavLink>
                </li>
              );
            })}
            <div className="m-1 absolute bottom-0"><ModeToggle /></div>
          </ul>
        </nav>
      </IconContext.Provider>
    </>
  );
}

export default Navbar;
