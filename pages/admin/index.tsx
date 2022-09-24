import { AttachmentOutlined, AttachMoneyOutlined, CreditCardOffOutlined, CreditCardOutlined, DashboardOutlined, GroupOutlined, CategoryOutlined, CancelPresentationOutlined, ProductionQuantityLimitsOutlined, AccessTimeOutlined } from '@mui/icons-material';
import { Card, CardContent, Grid, Typography } from '@mui/material'
import { SummaryTile } from '../../components/admin'
import { AddminLayout } from '../../components/layouts'
import useSWR from 'swr';
import { DashboardSummaryResponse } from '../../interfaces';
import { useEffect, useState } from 'react';

const DashboardPage = () => {

  const {  data, error} = useSWR<DashboardSummaryResponse>('/api/admin/dashboard', {
    refreshInterval: 30 * 1000
  });

  const [refreshIn, setrefreshIn] = useState(30);

  useEffect(() => {
    const interval = setInterval(() => {
      setrefreshIn( refreshIn => refreshIn > 0 ? refreshIn - 1 : 30)
    }, 1000);

    // Clean the effect when user change the page
    return () => clearInterval(interval);
  }, [])
  

  if(!error && !data) {
    return <></>
  };

  if(error) {
    console.log(error)
    return <Typography>Error to get Dashboard Data</Typography>
  };

  const {
    numberOfOrders,         
    paidOrders,             
    numbersOfClients,       
    numberOfProducts,       
    productsWithOutOffStock,
    productsWithLowStock,   
    notPaidOrders,          

  } = data!

  return (
    <AddminLayout 
        title={'Dashbord'} 
        subtitle={'Resume Admin Panel for Teslo Shop'} 
        icon={ <DashboardOutlined/>}   
    >
        <Grid container spacing={2}>
            <SummaryTile 
              title={numberOfOrders} 
              subTitle={'Total Ordes'} 
              icon={<CreditCardOutlined color="secondary" sx={{fontSize: 40}}/>}
            />
            <SummaryTile 
              title={paidOrders} 
              subTitle={'Paid Orders'} 
              icon={<AttachMoneyOutlined color="success" sx={{fontSize: 40}}/>}
            />
            <SummaryTile 
              title={notPaidOrders} 
              subTitle={'Pending Ordes'} 
              icon={<GroupOutlined color="error" sx={{fontSize: 40}}/>}
            />
            <SummaryTile 
              title={numbersOfClients} 
              subTitle={'Clients'} 
              icon={<CreditCardOutlined color="primary" sx={{fontSize: 40}}/>}
            />
            <SummaryTile 
              title={numberOfProducts} 
              subTitle={'Products'} 
              icon={<CategoryOutlined color="warning" sx={{fontSize: 40}}/>}
            />
            <SummaryTile 
              title={productsWithOutOffStock} 
              subTitle={'Out of Stock'} 
              icon={<CancelPresentationOutlined color="error" sx={{fontSize: 40}}/>}
            />
            <SummaryTile 
              title={productsWithLowStock} 
              subTitle={'Low Stock'} 
              icon={<ProductionQuantityLimitsOutlined color="warning" sx={{fontSize: 40}}/>}
            />
            <SummaryTile 
              title={refreshIn} 
              subTitle={'Refresh data in seconds'} 
              icon={<AccessTimeOutlined color="secondary" sx={{fontSize: 40}}/>}
            />
        </Grid>
    </AddminLayout>
  )
}

export default DashboardPage
