import React, { useState, useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import {
  ProSidebar,
  Menu,
  MenuItem,
  SidebarHeader,
  SidebarFooter,
  SidebarContent,
} from 'react-pro-sidebar'
import { FaTachometerAlt, FaGem, FaGithub, FaReact, FaRegListAlt } from 'react-icons/fa'
import { BiListUl } from 'react-icons/bi'
import { SiTodoist } from 'react-icons/si'
import { ImBooks } from 'react-icons/im'
import { RiHotelLine, RiCalendar2Line } from 'react-icons/ri'

import sidebarBg from '../assets/images/bg1.jpg'

const Aside = ({setToggled, toggled, children}) => {  
  const [image, setImage] = useState(true); 

  let history = useHistory();    
  const routeClick = (route) => {
    history.push(route);
  }

  const getWidth = () => window.innerWidth 
  || document.documentElement.clientWidth 
  || document.body.clientWidth;

  const useCurrentWitdh = () => {
    const [width, setWidth] = useState(getWidth());    
    useEffect(() => {
      const resizeListener = () => {
        setWidth(getWidth())
      };
      window.addEventListener('resize', resizeListener);
      return () => {
        window.removeEventListener('resize', resizeListener);
      }
  }, [])
    return width;
  }

  const routes = [
    {id: 1, name: 'Index', href: '/', icon: <FaTachometerAlt />},
    {id: 12, name: 'About1', href: '/about1', icon: <FaGem />},
    {id: 13, name: 'About2', href: '/about2', icon: <FaGem />},
    {id: 14, name: 'About3', href: '/about3', icon: <FaGem />},
    {id: 15, name: 'About4', href: '/about4', icon: <FaGem />},
    {id: 2, name: 'Fecha', href: '/fecha', icon: <RiCalendar2Line />},
    {id: 3, name: 'Country C', href: '/countriesClass', icon: <BiListUl />},
    {id: 4, name: 'Country H', href: '/countriesHook', icon: <FaRegListAlt />},
    {id: 5, name: 'Ed List', href: '/edTodoList', icon: <SiTodoist />},
    {id: 6, name: 'Books Shop', href: '/bookShop', icon: <ImBooks />},
    {id: 7, name: 'Hotel Home', href: '/hotelHome', icon: <RiHotelLine />}
  ]

  return (
    <div className={`app ${toggled ? 'toggled' : ''}`}>
      <ProSidebar
        image={image ? sidebarBg : false}      
        collapsed={useCurrentWitdh() < 1100 ? true : false}
        toggled={toggled}
        breakPoint="md"
        onToggle={() => setToggled()}
      >
        <SidebarHeader>
          <Menu iconShape="circle">
          <MenuItem
              icon={<FaReact />}            
              onClick={() => setImage(!image)}
            >
              {'React'}
            </MenuItem>          
          </Menu>
        </SidebarHeader>

        <SidebarContent>
          <Menu iconShape="circle" >
            {routes.map(route => (
              <MenuItem
                key={route.id}
                icon={route.icon}              
                onClick={() => routeClick(route.href)}
              >
              {route.name}
              </MenuItem> 
            ))}               
          </Menu>
        </SidebarContent>

        <SidebarFooter style={{ textAlign: 'center' }}>
          <div
            className="sidebar-btn-wrapper"
            style={{
              padding: '20px 24px',
            }}
          >
            <a
              href="https://github.com/wmata141"
              target="_blank"
              className="sidebar-btn"
              rel="noopener noreferrer"
            >
              <FaGithub />
              <span> {'viewSource'}</span>
            </a>
          </div>
        </SidebarFooter>
      </ProSidebar>

      {children}
    </div>  
  );
};

export default Aside;
