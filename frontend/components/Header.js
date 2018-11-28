import Nav from "./Nav";

const Header = () => (
  <div>
    <div className="bar">
      <h1>
        <a href="">The Feiner Things</a>
      </h1>
      <Nav />
    </div>
    <div className="sub-bar">
      <p>Search</p>
    </div>
    <div>Cart</div>
  </div>
);

export default Header;
