import PropTypes from 'prop-types';

const SectionTitle = ({ heading, subheading }) => {

    return (
        <div className={`text-center w-1/3 mx-auto`}>
            <h3 className='italic text-[#D99904]'>{subheading}</h3>
            <h1 className='uppercase text-4xl my-4 border-y-4 py-4'>{heading}</h1>
        </div>
    );
};

SectionTitle.propTypes = {
    heading: PropTypes.string,
    subheading: PropTypes.string
}

export default SectionTitle;

