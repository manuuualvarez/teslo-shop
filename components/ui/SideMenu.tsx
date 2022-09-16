import { Box, Divider, Drawer, IconButton, Input, InputAdornment, List, ListItem, ListItemIcon, ListItemText, ListSubheader } from "@mui/material"
import { AccountCircleOutlined, AdminPanelSettings, CategoryOutlined, ConfirmationNumberOutlined, EscalatorWarningOutlined, FemaleOutlined, LoginOutlined, MaleOutlined, SearchOutlined, VpnKeyOutlined } from "@mui/icons-material"
import { AuthContext, UiContext } from "../../context"
import { useContext, useState } from "react"
import { useRouter } from "next/router"


export const SideMenu = () => {
    const { isMenuOpen, toggleSideMenu  } = useContext(UiContext);
    const { isLoggedIn, user, logOutUser }  = useContext(AuthContext);

    const router = useRouter()
    const [searchTerm, setSearchTerm] = useState('');

    const onSearchTerm = () => {
        if(searchTerm.trim().length === 0) return;
        navigateTo(`/search/${ searchTerm }`)
        setSearchTerm('');
    }

    const navigateTo = (url: string) => {
        toggleSideMenu();
        router.push(url);
    }

    const inputRef = (input: any) => {
        if (input) {
            setTimeout(() => {
                {input.focus()}
            }, 100);
        }
    }


  return (
    <Drawer
        open={ isMenuOpen }
        anchor='right'
        sx={{ backdropFilter: 'blur(4px)', transition: 'all 0.5s ease-out' }}
        onClose={ toggleSideMenu }
    >
        <Box sx={{ width: 250, paddingTop: 5 }}>
            
            <List>
                {/* Search bar */}
                <ListItem>
                    <Input
                        inputRef={ inputRef }
                        autoFocus={ true }
                        value={ searchTerm }
                        onChange= { (e) => setSearchTerm(e.target.value) }
                        onKeyPress={ (e) => e.key === 'Enter' ? onSearchTerm() : null }
                        type='text'
                        placeholder="Search..."
                        endAdornment={
                            <InputAdornment position="end">
                                <IconButton
                                    onClick={ onSearchTerm }
                                    aria-label="toggle password visibility"
                                >
                                 <SearchOutlined />
                                </IconButton>
                            </InputAdornment>
                        }
                    />
                </ListItem>
                {
                    isLoggedIn  && (
                        <>
                            <ListItem button >
                                <ListItemIcon>
                                    <AccountCircleOutlined/>
                                </ListItemIcon>
                                <ListItemText primary={'Profile'} />
                            </ListItem>
                            
                            <ListItem button>
                                <ListItemIcon>
                                    <ConfirmationNumberOutlined/>
                                </ListItemIcon>
                                <ListItemText primary={'My Orders'} />
                            </ListItem>
                        </>
                    )
                }
                {/* Men category */}
                <ListItem 
                    button
                    sx={{ display: { xs: '', sm: 'none' } }} 
                    onClick = { () => navigateTo('/category/men') }
                >
                    <ListItemIcon>
                        <MaleOutlined/>
                    </ListItemIcon>
                    <ListItemText primary={'Men'} />
                </ListItem>
                {/* Women category */}
                <ListItem 
                    button
                    sx={{ display: { xs: '', sm: 'none' } }} 
                    onClick = { () => navigateTo('/category/women') }
                >
                    <ListItemIcon>
                        <FemaleOutlined/>
                    </ListItemIcon>
                    <ListItemText primary={'Women'} />
                </ListItem>
                {/* Kids Category */}
                <ListItem 
                    button
                    sx={{ display: { xs: '', sm: 'none' } }} 
                    onClick = { () => navigateTo('/category/kids') }
                >
                    <ListItemIcon>
                        <EscalatorWarningOutlined/>
                    </ListItemIcon>
                    <ListItemText primary={'Kids'} />
                </ListItem>
                {/* Auth */}
                {
                    !isLoggedIn 
                    ? (
                        <ListItem 
                            button
                            onClick={() => navigateTo(`/auth/login?p=${router.asPath}`)}
                        >
                            <ListItemIcon>
                                <VpnKeyOutlined/>
                            </ListItemIcon>
                            <ListItemText primary={'Login'} />
                        </ListItem>
                    )
                    : (
                        <ListItem button onClick={logOutUser}>
                            <ListItemIcon>
                                <LoginOutlined/>
                            </ListItemIcon>
                            <ListItemText primary={'Logout'} />
                        </ListItem>
                    )
                }
                {/* Admin */}
                {
                    user?.role === 'admin' && (
                        <>
                            <Divider />
                            <ListSubheader>Admin Panel</ListSubheader>

                            <ListItem button>
                                <ListItemIcon>
                                    <CategoryOutlined/>
                                </ListItemIcon>
                                <ListItemText primary={'Products'} />
                            </ListItem>
                            <ListItem button>
                                <ListItemIcon>
                                    <ConfirmationNumberOutlined/>
                                </ListItemIcon>
                                <ListItemText primary={'Orders'} />
                            </ListItem>

                            <ListItem button>
                                <ListItemIcon>
                                    <AdminPanelSettings/>
                                </ListItemIcon>
                                <ListItemText primary={'Users'} />
                            </ListItem>
                        </>
                    )
                }
            </List>
        </Box>
    </Drawer>
  )
}

