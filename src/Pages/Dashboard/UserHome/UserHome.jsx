import useAuth from "../../../CustomHooks/useAuth";

const UserHome = () => {
    const { user } = useAuth();

    return (
        <div>
            <div>
                <h1 className="text-4xl font-cinzel font-bold">
                    <span> Hi, Welcome </span>
                    {
                        user?.displayName ? user.displayName + '!' : 'Back !'
                    }
                </h1>
            </div>
        </div>
    );
};

export default UserHome;