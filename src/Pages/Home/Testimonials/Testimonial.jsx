import { Rating } from '@smastrom/react-rating'
import '@smastrom/react-rating/style.css'
import { FaQuoteLeft } from "react-icons/fa";

const Testimonial = ({ review }) => {
    const { details, name, rating } = review;
    return (
        <div className='w-2/3 mx-auto space-y-16'>

            <div>
                <Rating
                    style={{ maxWidth: 180, marginLeft: 'auto', marginRight: 'auto' }}
                    value={rating}
                    readOnly
                />
            </div>

            <div>
                <FaQuoteLeft className='text-7xl w-full'/>
            </div>

            <div className='text-center space-y-7'>
                <p>{details}</p>
                <h1 className='text-4xl text-[#CD9003] uppercase'>{name}</h1>
            </div>
        </div>
    );
};

export default Testimonial;