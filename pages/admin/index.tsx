import { AttachmentOutlined, AttachMoneyOutlined, CreditCardOffOutlined, CreditCardOutlined, DashboardOutlined, GroupOutlined, CategoryOutlined, CancelPresentationOutlined, ProductionQuantityLimitsOutlined, AccessTimeOutlined } from '@mui/icons-material';
import { Card, CardContent, Grid, Typography } from '@mui/material'
import { SummaryTile } from '../../components/admin'
import { AddminLayout } from '../../components/layouts'

const DashboardPage = () => {
  return (
    <AddminLayout 
        title={'Dashbord'} 
        subtitle={'Resume Admin Panel for Teslo Shop'} 
        icon={ <DashboardOutlined/>}   
    >
        <Grid container spacing={2}>
            <SummaryTile 
              title={1} 
              subTitle={'Total Ordes'} 
              icon={<CreditCardOutlined color="secondary" sx={{fontSize: 40}}/>}
            />
            <SummaryTile 
              title={2} 
              subTitle={'Payment Orders'} 
              icon={<AttachMoneyOutlined color="success" sx={{fontSize: 40}}/>}
            />
            <SummaryTile 
              title={3} 
              subTitle={'Pending Ordes'} 
              icon={<GroupOutlined color="error" sx={{fontSize: 40}}/>}
            />
            <SummaryTile 
              title={4} 
              subTitle={'Clients'} 
              icon={<CreditCardOutlined color="primary" sx={{fontSize: 40}}/>}
            />
            <SummaryTile 
              title={5} 
              subTitle={'Products'} 
              icon={<CategoryOutlined color="warning" sx={{fontSize: 40}}/>}
            />
            <SummaryTile 
              title={6} 
              subTitle={'Out of Stock'} 
              icon={<CancelPresentationOutlined color="error" sx={{fontSize: 40}}/>}
            />
            <SummaryTile 
              title={7} 
              subTitle={'Low Stock'} 
              icon={<ProductionQuantityLimitsOutlined color="warning" sx={{fontSize: 40}}/>}
            />
            <SummaryTile 
              title={6} 
              subTitle={'Refresh data in'} 
              icon={<AccessTimeOutlined color="secondary" sx={{fontSize: 40}}/>}
            />
        </Grid>
    </AddminLayout>
  )
}

export default DashboardPage
