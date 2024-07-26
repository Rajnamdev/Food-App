import React, { useState } from "react";
import { IoMdClose } from "react-icons/io";
import { FaShoppingCart } from "react-icons/fa";
import ItemCard from "./ItemCard";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useFirebase } from "./context/Firebase";
import { toast } from "react-hot-toast";

const Cart = () => {
  const [activeCart, setActiveCart] = useState(false);
  const { saveDataToFirestore, isUserSignedIn, database } = useFirebase();

  const cartItems = useSelector((state) => state.cart.cart);
  const totalQty = cartItems.reduce((totalQty, item) => totalQty + item.qty, 0);
  const totalPrice = cartItems.reduce(
    (total, item) => total + item.qty * item.price,
    0
  );

  const navigate = useNavigate();

  const cartHandle = async () => {
    if (cartItems.length > 0) {
      if (isUserSignedIn()) {
        // Initialize Razorpay and open payment window
        const options = {
          key: "rzp_test_oRJqUKDmAoidKG",
          key_secret: "FTBtoxH6WAXN4jhjFUhxX0a3",
          amount: totalPrice * 100, // Amount in smallest currency unit (e.g., paisa for INR)
          currency: "INR",
          order_receipt: 'order_rcptid_' + new Date().getTime(), // Unique order ID
          name: "Dev Prashant",
          description: "Order Payment",
          handler: async function (response) {
            try {
              // Save payment data to Firebase Realtime Database
              const paymentData = {
                paymentId: response.razorpay_payment_id,
                orderId: response.razorpay_order_id,
                signature: response.razorpay_signature,
              };
              await saveDataToFirestore("payments", paymentData);
              console.log(objectToString(paymentData));
              // Redirect to address page or any other page as needed
              navigate('/address');
            } catch (error) {
              console.error("Error saving payment data:", error.message);
              navigate('/address');
              // Handle error appropriately
            }
          },
          theme: {
            color: "#3399cc"
          }
        };

        const razorpay = new window.Razorpay(options);
        razorpay.open();
      } else {
        toast.error("Please sign in to proceed to checkout");
      }
    } else {
      toast.error("Cart is Empty");
    }
  };

  return (
    <>
      <div
        className={`fixed right-0 top-0 w-full lg:w-[20vw] h-full p-5 bg-white mb-3 ${
          activeCart ? "translate-x-0" : "translate-x-full"
        } transition-all duration-500 z-50`}
      >
        <div className="flex justify-between items-center my-3">
          <span className="text-xl font-bold text-gray-800">My Order</span>
          <IoMdClose
            onClick={() => setActiveCart(!activeCart)}
            className="border-2 border-gray-600 text-gray-600 font-bold  p-1 text-xl  rounded-md hover:text-red-300 hover:border-red-300 cursor-pointer"
          />
        </div>

        {cartItems.length > 0 ? (
          cartItems.map((food) => {
            return (
              <ItemCard
                key={food.id}
                id={food.id}
                name={food.name}
                price={food.price}
                img={food.img}
                qty={food.qty}
              />
            );
          })
        ) : (
          <h2 className="text-center text-xl font-bold text-gray-800">
            Your cart is empty
          </h2>
        )}

        <div className="absolute bottom-0 ">
          <h3 className="font-semibold text-gray-800">Items : {totalQty}</h3>
          <h3 className="font-semibold text-gray-800">
            Total Amount : {totalPrice}
          </h3>
          <hr className="w-[90vw] lg:w-[18vw] my-2" />
          <button
            onClick={cartHandle}
            className="bg-green-500 font-bold px-3 text-white py-2 rounded-lg w-[90vw] lg:w-[18vw] mb-5"
          >
            Checkout
          </button>
        </div>
      </div>
      <FaShoppingCart
        onClick={() => setActiveCart(!activeCart)}
        className={`rounded-full bg-white shadow-md text-5xl p-3 fixed bottom-4 right-4 ${
          totalQty > 0 && "animate-bounce delay-500 transition-all"
        } `}
      />
    </>
  );
};

export default Cart;
