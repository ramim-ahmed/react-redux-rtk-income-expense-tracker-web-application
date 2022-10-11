import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import { deleteTransaction, getTransaction, patchTransaction, postTransaction } from "./transactionAPI"

// initialState
const initialState = {
    transactions: [],
    editTrack: {},
    isLoading: false,
    isSuccess: false,
    isError: true,
    error: ''
}


// create add transaction async thunk
export const addNewTransaction = createAsyncThunk('post/newTransaction', async (data) => {
    const transactions = await postTransaction(data);
    return transactions;
})


// /fetch all transaction transaction async thunk
export const fetchTransaction = createAsyncThunk('get/fetchAllTransaction', async () => {
    const transactions = await getTransaction();
    return transactions;
});

// / /fetch all transaction transaction async thunk
export const removeTransaction = createAsyncThunk('delete/removeTransaction', async (id) => {
    const transactions = await deleteTransaction(id);
    return transactions;
});

//fetch all transaction transaction async thunk
export const updateTransaction = createAsyncThunk('patch/updateTransaction', async ({ id, data }) => {
    const transactions = await patchTransaction(id, data);
    return transactions;
});

const transactionSlice = createSlice({
    name: 'transactions',
    initialState,
    reducers: {
        editTracked: (state, action) => {
            state.editTrack = action.payload
        }
    },
    extraReducers: (builder) => {
        builder
            // add new transaction case
            .addCase(addNewTransaction.pending, (state) => {
                state.isLoading = true;
                state.isError = false;
                state.isSuccess = false;
                state.error = ''
            })
            .addCase(addNewTransaction.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isError = false;
                state.isSuccess = true;
                state.transactions.unshift(action.payload)
            })
            .addCase(addNewTransaction.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.isSuccess = false;
                state.error = action.error?.message
            })
            // fetch all transaction case
            .addCase(fetchTransaction.pending, (state) => {
                state.isLoading = true;
                state.isError = false;
                state.isSuccess = false;
                state.error = ''
            })
            .addCase(fetchTransaction.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isError = false;
                state.isSuccess = true;
                state.transactions = action.payload
            })
            .addCase(fetchTransaction.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.isSuccess = false;
                state.error = action.error?.message
            })
            // delete transaction case
            .addCase(removeTransaction.pending, (state) => {
                state.isLoading = true;
                state.isError = false;
                state.isSuccess = false;
                state.error = ''
            })
            .addCase(removeTransaction.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isError = false;
                state.isSuccess = true;
                state.transactions = state.transactions.filter(t => t.id !== action.meta.arg)
            })
            .addCase(removeTransaction.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.isSuccess = false;
                state.error = action.error?.message
            })
            // update transaction case
            .addCase(updateTransaction.pending, (state) => {
                state.isLoading = true;
                state.isError = false;
                state.isSuccess = false;
                state.error = ''
            })
            .addCase(updateTransaction.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isError = false;
                state.isSuccess = true;
                const index = state.transactions.findIndex(t => t.id === action.payload.id)
                state.transactions[index] = action.payload
            })
            .addCase(updateTransaction.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.isSuccess = false;
                state.error = action.error?.message
            })
    }
});


export default transactionSlice.reducer;
export const { editTracked } = transactionSlice.actions;