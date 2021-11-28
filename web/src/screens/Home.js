import * as React from 'react';

import {HOUR_RATE_INFO} from '../HourRate';

function Shift(props) {
    let {date, data} = props;
    let rated = data.rated;
    let earned = Object.entries(rated).reduce((result, [type, data]) => result + (data.hours + data.minutes / 60) * HOUR_RATE_INFO[type].rate, 0);
    return (
        <div>
            <div><u>{date}</u> - <span>{earned} &euro;</span></div>
            <div>
                {Object.entries(HOUR_RATE_INFO).map(([rateType, rateData]) => {
                        if (rated[rateType] !== undefined) {
                            let shiftPart = rated[rateType];
                            let isNotEmpty = (shiftPart.hours > 0 || shiftPart.minutes > 0);
                            if (isNotEmpty) {
                                return <span
                                    key={rateType}>{rateData.shortName}: {shiftPart.hours}h{shiftPart.minutes}m </span>
                            }
                        }
                    }
                )}
            </div>
        </div>
    );
}

function Home(props) {
    return (
        <div>
            <h1>Jornadas</h1>
            <div>
                {Object.entries(props.records).map(([date, record]) => <Shift key={date} date={date} data={record}/>)}
            </div>
        </div>
    );
}

export default Home;
