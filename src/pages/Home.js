import React from 'react'
import Layout from '../components/Layout'
import Transactions from '../components/Transactions'

const Home = () => {

    return (
        <Layout>
            {<Transactions />}
        </Layout>
    )
}

export default Home