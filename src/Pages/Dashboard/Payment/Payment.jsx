import SectionTitle from "../../Shared/SectionTitle";
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import CheckoutForm from "./CheckoutForm";
import Swal from "sweetalert2";
import 'animate.css';

const stripePromise = loadStripe(import.meta.env.VITE_PAYMENT_GATEWAY_KEY)

const Payment = () => {
    const handleCryptoClick = () => {
        Swal.fire({
            icon: "info",
            title: "Crypto Wallet Is Under Construction!",
            text: "Please, pay via card!",
          });
    }

    return (
        <div>
            <div>
                <SectionTitle heading={'Payment'} subheading={'---Check Out---'}></SectionTitle>
            </div>


            <div className="h-96 flex flex-col justify-center items-center space-y-5">
                <button onClick={() => document.getElementById('my_modal_3').showModal()} className="btn bg-orange-400 w-1/4 text-center text-3xl font-bold hover:text-white">Pay Via Card</button>

                <button onClick={handleCryptoClick} className="btn bg-orange-400 w-1/4 text-center text-3xl font-bold hover:text-white">Pay Via Crypto</button>
            </div>

            <dialog id="my_modal_3" className="modal">
                <div className="modal-box py-11 space-y-7">
                    <form method="dialog">
                        {/* if there is a button in form, it will close the modal */}
                        <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
                    </form>

                    <div>
                        <p className="text-center text-2xl font-bold">Pay Via Card</p>
                    </div>
                    
                    <div>
                        <Elements stripe={stripePromise}>
                            <CheckoutForm />
                        </Elements>
                    </div>
                </div>
            </dialog>

        </div>
    );
};

export default Payment;