import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { addNewTransaction, updateTransaction } from '../features/transaction/transactionSlice';
import toast, { Toaster } from 'react-hot-toast';
const Form = () => {
    const dispatch = useDispatch();
    const { isSuccess, isLoading, editTrack } = useSelector(state => state.transaction)
    const notify = (message) => toast(message);
    const [name, setName] = useState('');
    const [amount, setAmount] = useState('');
    const [type, setType] = useState('');

    const [editMode, setEditMode] = useState(false);
    const resetForm = () => {
        setName('');
        setAmount('');
        setType('');
    }

    useEffect(() => {
        if (editTrack.id) {
            const { name, amount, type } = editTrack
            setEditMode(true);
            setName(name);
            setAmount(amount);
            setType(type);
        }
    }, [editTrack])


    // add new transaction
    const handleAddTransaction = (e) => {
        e.preventDefault();
        dispatch(addNewTransaction({
            name,
            amount: Number(amount),
            type
        }));
        resetForm();
        if (isSuccess) {
            notify('Transaction added!');
        } else {
            notify('Transaction failed');
        }
    }

    // update transaction
    const handleUpdateTransaction = (e) => {
        e.preventDefault();
        dispatch(updateTransaction({
            id: editTrack?.id,
            data: {
                name,
                amount,
                type
            }
        }));
        setEditMode(false)
        resetForm();
        if (isSuccess) {
            notify('Transaction Updated!');
        } else {
            notify('Transaction Updated Failed!!');
        }
    }

    // cancel edit handler
    const cancelEditMode = () => {
        setEditMode(false);
        resetForm();
    }


    return (
        <>
            <Toaster />
            <form onSubmit={editMode ? handleUpdateTransaction : handleAddTransaction} className='mt-5'>
                <div className='flex items-center mt-5'>
                    <div className='w-2/6'>
                        <label className='' htmlFor="name">Name</label>
                    </div>
                    <div className='w-4/6'>
                        <input required onChange={e => setName(e.target.value)} id='name' name='name' placeholder='My Salary'
                            type="text" className=' w-full text-base px-4 py-1' value={name} />
                    </div>
                </div>
                <div className='flex items-center mt-5'>
                    <div className='w-2/6'>
                        <label className='' htmlFor="amount">Amount($)</label>
                    </div>
                    <div className='w-4/6'>
                        <input required onChange={e => setAmount(e.target.value)} id='amount' name='amount' placeholder='amount'
                            type="number" className=' w-full text-base px-4 py-1' value={amount} />
                    </div>
                </div>
                <div className='flex items-center mt-5'>
                    <div className='w-2/6'>
                        <label>Type</label>
                    </div>
                    <div className='w-4/6 flex items-center '>
                        <div className='flex items-center'>
                            <input checked={type === 'income'} id='income' name='income' type="radio" value='income' onChange={e => setType(e.target.value)} />
                            <label className='ml-3' htmlFor="income">Income</label>
                        </div>
                        <div className='flex items-center ml-7'>
                            <input checked={type === 'expense'} id='expense' name='expense' type="radio" value='expense' onChange={e => setType(e.target.value)} />
                            <label className='ml-3' htmlFor="expense">Expense</label>
                        </div>
                    </div>
                </div>
                <div className=' mt-8 flex justify-end'>
                    {
                        editMode && <button onClick={() => cancelEditMode()} type='submit' class=" border-0 outline-none bg-red-500 text-white hover:bg-red-700 duration-300 py-2 px-4 rounded mr-5">Cancel Edit</button>
                    }
                    <button disabled={isLoading} type='submit' class=" border-0 outline-none bg-indigo-500 text-white hover:bg-indigo-700 duration-300 py-2 px-4 rounded">
                        {
                            editMode ? 'Update Transaction' : "Add Transaction"
                        }
                    </button>
                </div>
            </form>
        </>

    )
}

export default Form