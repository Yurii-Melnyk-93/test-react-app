export function Sidebar() {
  return (
    <aside className="sidebar">
      <nav className="sidebar-nav">
        <ul className="sidebar-menu">
          <li className="sidebar-menu-item">
            <a href="#" className="sidebar-menu-link">Dashboard</a>
          </li>
          <li className="sidebar-menu-item">
            <a href="#" className="sidebar-menu-link">Customers</a>
          </li>
          <li className="sidebar-menu-item">
            <a href="#" className="sidebar-menu-link">Reports</a>
          </li>
          <li className="sidebar-menu-item">
            <a href="#" className="sidebar-menu-link">Settings</a>
          </li>
        </ul>
      </nav>
    </aside>
  )
}