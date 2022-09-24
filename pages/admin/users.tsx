import { PeopleOutline } from '@mui/icons-material'
import React from 'react'
import { AddminLayout } from '../../components/layouts'
import NextLink from 'next/link';
// Material Table
import { Typography, Grid, Chip, Link, Select, MenuItem } from '@mui/material';
import { DataGrid, GridColDef, GridValueGetterParams } from '@mui/x-data-grid';
import useSWR from 'swr';
import { IUser } from '../../interfaces';
import { tesloApi } from '../../api';



const UsersPage = () => {

    const { data, error } = useSWR<IUser[]>('/api/admin/users');

    if (!data && !error) {
        return <></>
    }

    const onRoleUpdate = async (userId: string, newRole: string) => {
        try {
            await tesloApi.put('/admin/users', {userId, role: newRole });
        } catch (error) {
            alert("We can not update the role, try again in 30 minutes");
            console.log(error);
        }
    }

    // Columns (If define into the function componen could be change)
    const columns: GridColDef[] = [
        { field: 'email', headerName: 'Email', width: 250},
        { field: 'name', headerName: 'Full Name', width: 300},
        { 
            field: 'role', 
            headerName: 'Role', 
            width: 300,
            renderCell: ({row}: GridValueGetterParams) => {
                return (
                    <Select
                        value={row.role}
                        label= "Role"
                        onChange={ ({target}) => onRoleUpdate(row.id, target.value)}
                        sx={{width: '300px'}}
                    >
                        <MenuItem value="admin">Admin</MenuItem>
                        <MenuItem value="client"> Client</MenuItem>
                        <MenuItem value="super-user">Super User</MenuItem>
                        <MenuItem value="SEO">SEO</MenuItem>

                    </Select>
                )
            }
        },
    ];
    // Rows (If define into the function componen could be change)
    const rows = data!.map( user => ({
        id: user._id,
        email: user.email,
        name: user.name,
        role: user.role
    }))
    
    
    

  return (
    <AddminLayout 
        title={'Users'} 
        subtitle={'Manage users'}
        icon={<PeopleOutline/>}    
    >
        <Grid container className='fadeIn' sx={{mt: 2}}>
            <Grid item xs={12} sx={{ height:650, width: '100%' }}>
                <DataGrid 
                    rows={ rows }
                    columns={ columns }
                    pageSize={ 10 }
                    rowsPerPageOptions={ [10] }
                />
            </Grid>
        </Grid>

    </AddminLayout>
  )
}

export default UsersPage
