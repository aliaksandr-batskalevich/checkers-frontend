export const topUserStyleMaker = (position: number, isAuthUser: boolean) => {
    let style;
    switch (position) {
        case 1:
            style = {color: '#5B05CBFF', width: '250px'};
            break;
        case 2:
            style = {color: '#4907cc', width: '280px'};
            break;
        case 3:
            style = {color: '#3207cc', width: '310px'};
            break;
        case 4:
            style = {color: '#1b07cc', width: '340px'};
            break;
        case 5:
            style = {color: '#0735cc', width: '370px'};
            break;
        case 6:
            style = {color: '#074ccc', width: '400px'};
            break;
        case 7:
            style = {color: '#077acc', width: '430px'};
            break;
        case 8:
            style = {color: '#036055', width: '460px'};
            break;
        case 9:
            style = {color: '#496003', width: '490px'};
            break;
        case 10:
            style = {color: '#605103', width: '520px'};
            break;
        default:
            style = {color: 'black', width: '550px'};
            break;
    }

    if (isAuthUser) {
        style = {...style, border: 'red solid 1px'};
    }

    return style;
};