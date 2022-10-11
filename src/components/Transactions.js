import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { fetchTransaction } from '../features/transaction/transactionSlice'
import numberWithCommas from '../utils/numberWithCommas'
import Form from './Form'
import Transaction from './Transaction'

const Transactions = () => {
    const { transactions, isLoading, isError } = useSelector(state => state.transaction);

    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(fetchTransaction())
    }, [dispatch]);
    const lastestTransaction = transactions.slice(0, 5)
    let content;
    if (isLoading) {
        content = <p className=' text-center'>loding.....</p>
    }
    if (!isLoading && isError) {
        content = <p className='text-enter text-red-500'>there was an server error</p>
    }
    if (!isLoading && !isError && transactions.length === 0) {
        content = <p className=' text-center'>No Transaction yet</p>
    }
    if (!isLoading && !isError && transactions.length > 0) {
        content = lastestTransaction.map(t => <Transaction key={t.id} t={t} />)
    }

    const incomeCaluclate = () => {
        let amount = 0;
        transactions.forEach(t => {
            if (t.type === 'income') {
                amount += t.amount
            } else if (t.type === 'expense') {
                amount -= t.amount
            }
        })

        return amount;
    }
    return (
        <main className=' container mx-auto flex justify-between h-screen mt-10 space-x-10 '>
            <div className=' w-2/4 bg-gray-100'>
                <div className=' bg-indigo-500 h-20 text-white w-full p-5'>
                    <p className=' font-light'>Your Current Balance</p>
                    <h1 className=' text-xl'>Tk {transactions.length > 0 ? numberWithCommas(incomeCaluclate()) : 0}</h1>
                </div>
                <div className=' mt-8 p-5'>
                    <h1 className=' text-lg'>Add New Transaction</h1>
                    <Form />
                </div>
            </div>
            <div className=' bg-gray-100 w-2/4 p-5'>
                <p className='text-center mb-8'>Your Transactions:</p>
                {content}
                <Link to='/transactions-list' className='mt-5 flex justify-end'>
                    <button disabled={isLoading} type='submit' class=" border-0 outline-none bg-indigo-500 text-white hover:bg-indigo-700 duration-300 py-2 px-4 rounded">
                        View All
                    </button>
                </Link>
            </div>
        </main>
    )
}

export default Transactions