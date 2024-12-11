import Link from 'next/link';

const Header = () => {
  return (
    <nav>
      <ul>
        <li><Link href="/">Home</Link></li>
        <li><Link href="/menu">Menu</Link></li>
        <li><Link href="/reservation">Make a Reservation</Link></li>
        <li><Link href="/contact">Contact Us</Link></li>
      </ul>
    </nav>
  );
};

export default Header;
