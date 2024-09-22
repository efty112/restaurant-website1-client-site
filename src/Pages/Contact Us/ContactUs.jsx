import PageBanner from "../Shared/PageBanner";
import image from '../../assets/contact/banner.jpg'
import { Helmet } from "react-helmet-async";

const ContactUs = () => {
    return (
        <div>
            <Helmet>
                <title>Bistro Boss | Contact</title>
                <link rel="canonical" href="" />
            </Helmet>
            <div>
                <PageBanner image={image} heading={'Contact Us'} subheading='Would you like to try a dish?'></PageBanner>
            </div>
        </div>
    );
};

export default ContactUs;