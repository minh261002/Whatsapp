import moment from "moment";

export const dateHandler = (date) => {
    let now = moment();
    let momentDate = moment(date);
    let time = momentDate.fromNow(true);
    let dateByHourAndMin = momentDate.format('hh:mm');
    
    const getDay = () => {
        let day = time.split(' ')[0];
        if(Number(day) < 8) {
            return now.subtract(Number(day), 'days').format('dddd');
        }else{
            momentDate.format('DD/MM/YYYY');
        }
    }

    if(time === "a few seconds") return "now";

    if(time.search('minute') !== -1) {
        let mins = time.split(' ')[0];
        
        if(mins === 'a'){
            return '1 min';
        }else{
            return `${mins} min`;
        }
    }

    if(time.search('hour') !== -1) {
        return dateByHourAndMin;
    }

    if(time === 'a day') {
        return 'Yesterday';
    }

    if(time.search('day') !== -1) {
        return getDay();
    }

    return time;
};