const PageBanner = ({ image, heading, subheading }) => {
    return (
        <div>
            <div className='relative flex items-center justify-center w-full'>
                <img className='relative w-full h-[600px]' src={image} alt="" />

                <div className='text-center bg-black bg-opacity-60 absolute flex items-center justify-center py-32 w-10/12'>
                    <div className=' mx-auto space-y-5'>
                        <h1 className='font-cinzel font-bold text-7xl text-white'>{heading}</h1>
                        <p className="font-cinzel font-semibold text-2xl text-white">{subheading}</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PageBanner;