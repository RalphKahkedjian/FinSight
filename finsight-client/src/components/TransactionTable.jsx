function TransactionTable({ transactions }) {

  return (

    <div className="bg-white rounded-xl shadow p-6">


      <h2 className="text-xl font-bold mb-5">
        Recent Transactions
      </h2>



      {transactions.length === 0 ? (

        <p className="text-gray-500">
          No transactions yet
        </p>

      ) : (


        <div className="space-y-3">


          {transactions.map((transaction)=>(

            <div
              key={transaction.id}
              className="flex justify-between border-b pb-3"
            >


              <div>

                <p className="font-semibold">
                  {transaction.description}
                </p>


                <p className="text-sm text-gray-500">
                  {transaction.category}
                </p>

              </div>



              <p className="font-bold">

                ${transaction.amount}

              </p>


            </div>


          ))}


        </div>


      )}


    </div>

  );

}


export default TransactionTable;