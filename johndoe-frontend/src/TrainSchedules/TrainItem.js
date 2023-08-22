import ListItem from '@mui/material/ListItem';
import { Divider, Grid, Typography } from '@mui/material';

const TrainItem = ({ trainItem }) => (
    <ListItem alignItems="flex-start">
        <Grid container style={{
            backgroundColor: "#eee",
            padding: 10,
        }}>
            <Grid item xs={12} lg={3}>
                <Typography variant="h6">Train Information</Typography>
                {trainItem.trainNumber} {trainItem.trainName}
            </Grid>
            <Grid item xs={12} lg={3}>
                <Typography variant="h6">Departure</Typography>
                Departs {`${trainItem.departureTime.Hours}:${trainItem.departureTime.Minutes}:${trainItem.departureTime.Seconds}`}
                (Delayed by {trainItem.delayedBy} mins)
            </Grid>
            <Grid item xs={12} lg={3}>
                <Typography variant="h6">AC Class</Typography>
                AC: ₹{trainItem.price.AC}/seat Available Seats:{trainItem.seatsAvailable.AC}
            </Grid>
            <Grid item xs={12} lg={3}>
                <Typography variant="h6">Sleeper Class</Typography>
                Sleeper: ₹{trainItem.price.sleeper} Seats: ${trainItem.seatsAvailable.sleeper}
            </Grid>
        </Grid>

        <Divider />
    </ListItem>
)

export default TrainItem;
