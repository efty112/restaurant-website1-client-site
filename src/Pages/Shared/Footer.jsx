import { FaFacebook } from "react-icons/fa";
import { FaInstagram } from "react-icons/fa";
import { FaTwitter } from "react-icons/fa";

const Footer = () => {
    return (
        <div>
            <footer className="footer bg-neutral gap-0 text-neutral-content">

                <div className='w-full bg-[#1f2937] p-16 flex justify-center'>
                    <p className="text-center space-y-5">
                        <h1 className="uppercase text-2xl">Contact Us</h1>
                        <p>
                            123 ABS Street, Uni 21, Bangladesh <br />
                            +88 123456789 <br />
                            Mon - Fri: 08:00 - 22:00 <br />
                            Sat - Sun: 10:00 - 23:00
                        </p>
                    </p>
                </div>

                <div className='w-full h-full bg-[#111827] p-16 flex justify-center'>
                    <p className="text-center space-y-5">
                        <h1 className="uppercase text-2xl">Follow Us</h1>
                        <p>Join us on social media</p>
                        <p className="flex justify-evenly text-3xl">
                            <FaFacebook />
                            <FaInstagram />
                            <FaTwitter />
                        </p>
                    </p>
                </div>

            </footer>

            <div className="footer footer-center bg-black text-white p-4">
                <aside>
                    <p>Copyright © CulinaryCloud. All rights reserved.</p>
                </aside>
            </div>
        </div>
    );
};

export default Footer;