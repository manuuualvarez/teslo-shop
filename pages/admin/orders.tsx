import { ConfirmationNumberOutlined } from '@mui/icons-material'
import React from 'react'
import { AddminLayout } from '../../components/layouts'

const OrdersPage = () => {
  return (
    <AddminLayout 
        title={'Orders'} 
        subtitle={'Orders information'}
        icon={  <ConfirmationNumberOutlined/>}
    >

    </AddminLayout>
  )
}

export default OrdersPage
