import Link from 'next/link';
import Image from 'next/image';

export default function Footer() {
    return (
        <footer className="footer-dark">
            <div className="container">
                <div className="footer-grid">
                    <div className="footer-column">
                        <h4>COMPANY</h4>
                        <Link href="#">About Bit Elektronik</Link>
                        <Link href="#">News</Link>
                        <Link href="#">How we work</Link>
                        <Link href="#">Quality Management</Link>
                        <Link href="#">Security</Link>
                    </div>
                    <div className="footer-column">
                        <h4>SUPPORT</h4>
                        <Link href="#">Help Center</Link>
                        <Link href="#">Shipping Info</Link>
                        <Link href="#">How To Order</Link>
                        <Link href="#">How To Track</Link>
                        <Link href="#">Contact Us</Link>
                    </div>
                    <div className="footer-column">
                        <h4>NETWORK SITES</h4>
                        <Link href="#">EasyEDA - PCB Design Tool</Link>
                        <Link href="#">3D Printing/CNC Machining</Link>
                        <Link href="#">Mechatronic Parts</Link>
                        <Link href="#">Open Source Hardware</Link>
                    </div>
                    <div className="footer-column">
                        <Image src="/logo_without_background.png" alt="bit Elektronik Logo" width={100} height={50} style={{filter: 'brightness(0) invert(1)', opacity: 0.8}} />
                        <h5>CONNECT WITH US</h5>
                        {/* Add social media icons here later if needed */}
                    </div>
                </div>
                <div className="footer-bottom">
                    <p>&copy; {new Date().getFullYear()} Bit Elektronik. All Rights Reserved. Demo purposes only.</p>
                </div>
            </div>
        </footer>
    );
}