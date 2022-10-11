import axios from "../../utils/axios"



// get all transactions
export const getTransaction = async () => {
    const response = await axios.get('/transactions');
    return response.data;
}

/// create new transaction
export const postTransaction = async (data) => {
    const response = await axios.post('/transactions', data);
    return response.data
}

///delete transaction
export const deleteTransaction = async (id) => {
    const response = await axios.delete(`/transactions/${id}`);
    return response.data
}

//update transaction
export const patchTransaction = async (id, data) => {
    const response = await axios.patch(`/transactions/${id}`, data);
    return response.data
}