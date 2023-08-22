import { useEffect, useState } from "react";
import { getTrains } from "../api";
import {
    Alert, List, Typography
} from '@mui/material';
import moment from 'moment';
import TrainItem from "./TrainItem";


const TrainSchedule = ({
    token
}) => {
    const [trains, setTrains] = useState([]);
    const timeAfter30Min = moment().add(30, 'minute');

    useEffect(() => {
        async function getTrainsFromApi() {
            const trainsListResponse = await getTrains(token);

            let trainsList = trainsListResponse.data;

            trainsList = trainsList.map(item => ({
                ...item,
                realDepartureTime: moment().set({
                    'hour': item.departureTime.Hours,
                    'minute': item.departureTime.Minutes,
                    'second': item.departureTime.Seconds
                }).add(item.delayedBy, 'minute'),
                cheap: false,
                expensive: false,
            }));

            trainsList = trainsList.filter(item => {
                if (timeAfter30Min.isBefore(item.realDepartureTime)) {
                    return false;
                }

                return true;
            });

            trainsList = trainsList.sort((a, b) => {
                if (a.price.sleeper > b.price.sleeper) {
                    return 1;
                }

                if (a.price.sleeper < b.price.sleeper) {
                    return -1;
                }

                if (a.seatsAvailable.sleeper + a.seatsAvailable.AC > b.seatsAvailable.sleeper + b.seatsAvailable.AC) {
                    return -1;
                }

                if (a.seatsAvailable.sleeper + a.seatsAvailable.AC < b.seatsAvailable.sleeper + b.seatsAvailable.AC) {
                    return 1;
                }

                if (a.realDepartureTime.isAfter(b.realDepartureTime)) {
                    return -1;
                }

                if (a.realDepartureTime.isBefore(b.realDepartureTime)) {
                    return 1;
                }
            });


            setTrains(trainsList);
        }

        if (token) {
            getTrainsFromApi()
        }
    }, [token])

    return (
        <div style={{ padding: 20 }}>
            <Typography variant="h4">
                Supragya Railway Company Train Schedule
            </Typography>

            <Alert severity="info">
                Prices and availability is subject to change based on market conditions such as demand, supply, departure time
            </Alert>
            <List>
                {
                    trains.map((trainItem, index) => <TrainItem key={trainItem.trainNumber} trainItem={trainItem} />)
                }
            </List>
        </div>
    )
}

export default TrainSchedule;
