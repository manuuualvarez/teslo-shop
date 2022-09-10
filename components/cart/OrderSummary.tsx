import { Grid, Typography } from "@mui/material"

export const OrderSummary = () => {
  return (
    <Grid container>
        {/* Quantity */}
        <Grid item xs={6}>
            <Typography>No. Products:</Typography>
        </Grid>
        <Grid item xs={6} display="flex" justifyContent={'end'}>
            <Typography>3 items</Typography>
        </Grid>
        {/* Subtotal */}
        <Grid item xs={6}>
            <Typography>Subtotal:</Typography>
        </Grid>
        <Grid item xs={6} display="flex" justifyContent={'end'}>
            <Typography>${ '156.39' }</Typography>
        </Grid>
        {/* Tax */}
        <Grid item xs={6}>
            <Typography>Tax (21%):</Typography>
        </Grid>
        <Grid item xs={6} display="flex" justifyContent={'end'}>
            <Typography>${ '46.28' }</Typography>
        </Grid>
        {/* Total */}
        <Grid item xs={6} sx={{mt: 2}}>
            <Typography variant="subtitle1">Total:</Typography>
        </Grid>
        <Grid item xs={6} display="flex" justifyContent={'end'} sx={{mt: 2}}>
            <Typography variant="subtitle1">${ '216.28' }</Typography>
        </Grid>



    </Grid>
  )
}
