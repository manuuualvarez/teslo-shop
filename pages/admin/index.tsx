import { DashboardOutlined } from '@mui/icons-material'
import { AddminLayout } from '../../components/layouts'

const DashboardPage = () => {
  return (
    <AddminLayout 
        title={'Dashbord'} 
        subtitle={'Resume Admin Panel for Teslo Shop'} 
        icon={ <DashboardOutlined/>}   
    >
        <h3>Hello word</h3>
    </AddminLayout>
  )
}

export default DashboardPage
