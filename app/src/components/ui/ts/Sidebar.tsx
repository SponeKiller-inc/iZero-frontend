const Sidebar = () => {
    return (
    <div className="menu-item">
    {/* ikona + text */}
    <div className="icon-label">
        <span className="icon">⚙️</span>
        <span className="label">Nastavení</span>

        {/* description tooltip */}
        <div className="description">Nastavení aplikace</div>
    </div>

    {/* šipka s dropdownem */}
    <div className="arrow-wrapper">
        <span className="arrow">▶</span>
        <ul className="submenu">
        <li>Profil</li>
        <li>Účty</li>
        <li>Oznámení</li>
        </ul>
    </div>
    </div>
  );
}
 
export default Sidebar;