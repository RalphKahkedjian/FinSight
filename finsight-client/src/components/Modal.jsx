function Modal({ type, message, onClose }) {

  const isSuccess = type === "success";


  return (

    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">


      <div className="bg-white rounded-xl shadow-xl p-8 w-full max-w-sm text-center">


        <div
          className={`text-4xl mb-4 ${
            isSuccess ? "text-green-500" : "text-red-500"
          }`}
        >
          {isSuccess ? "✓" : "✕"}
        </div>



        <h2 className="text-2xl font-bold mb-3">

          {isSuccess ? "Success" : "Error"}

        </h2>



        <p className="text-gray-600 mb-6">

          {message}

        </p>



        <button

          onClick={onClose}

          className={`px-6 py-2 rounded-lg text-white ${
            isSuccess 
              ? "bg-green-500 hover:bg-green-600"
              : "bg-red-500 hover:bg-red-600"
          }`}

        >

          Close

        </button>


      </div>


    </div>

  );

}


export default Modal;