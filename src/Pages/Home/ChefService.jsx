import img1 from '../../assets/home/chef-service.jpg'

const ChefService = () => {
    return (
        <div className='md:relative md:flex items-center justify-center'>
            <img className='md:relative rounded-lg' src={img1} alt="" />

            <div className='text-center bg-white rounded-lg md:absolute md:flex items-center justify-center md:py-16 mx-24'>
                <div className='w-2/3 mx-auto space-y-5'>
                    <h1 className='font-cinzel text-4xl'>Bistro Boss</h1>
                    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Necessitatibus, libero accusamus laborum deserunt ratione dolor officiis praesentium! Deserunt magni aperiam dolor eius dolore at, nihil iusto ducimus incidunt quibusdam nemo.</p>
                </div>
            </div>
        </div>

    );
};

export default ChefService;