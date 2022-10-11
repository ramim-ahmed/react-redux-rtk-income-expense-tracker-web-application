import React from 'react'
import { useSelector } from 'react-redux'
import Transaction from '../components/Transaction'

const TransactionList = () => {
    const { transactions } = useSelector(state => state.transaction);
    return (
        <div className=' bg-slate-100 h-screen '>
            <div className=' w-3/5 mx-auto bg-white p-5'>
                <div className='flex justify-between'>
                    <div>
                        <p>Filter By:</p>
                        <form >
                            <div className='w-4/6 flex items-center '>
                                <div className='flex items-center'>
                                    <input id='income' name='income' type="radio" value='income' />
                                    <label className='ml-3' htmlFor="income">Income</label>
                                </div>
                                <div className='flex items-center ml-7'>
                                    <input id='expense' name='expense' type="radio" value='expense' />
                                    <label className='ml-3' htmlFor="expense">Expense</label>
                                </div>
                            </div>
                        </form>
                    </div>
                    <div>
                        <form>
                            <input type="text" id="first_name" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" placeholder="Search" required />
                        </form>
                    </div>
                </div>
                <div>
                    {
                        transactions
                            .map(t => <Transaction key={t.id} t={t} />)
                    }
                </div>
            </div>
        </div>
    )
}

export default TransactionList