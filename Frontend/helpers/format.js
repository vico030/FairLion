const formatDuration = (duration) => {
    splitDuration = duration.split(" ")
    console.log(splitDuration)
    let newEinheit = "";
    let zahl = Number(splitDuration[0])
    let einheit = splitDuration[1]
    if(einheit=="week") {
        if(zahl>1) newEinheit = "Wochen"
        else newEinheit = "Woche"
    }
    if(einheit=="month") {
        if(zahl>1) newEinheit = "Monate"
        else newEinheit = "Monat"
    }
    if(einheit=="day") {
        if(zahl>1) newEinheit = "Tage"
        else newEinheit = "Tag"
    }

    return ""+zahl+" "+newEinheit;
}

const formatRemaining = (returnDate) => {
    //console.log(images);
    // console.log(returnDate);
    let date = new Date(returnDate)
    let remainingTime = date.getTime() - new Date().getTime();
    let remainingTimeSeconds = remainingTime / 1000;
    let remainingTimeMinutes = remainingTimeSeconds / 60;
    let remainingTimeHours = remainingTimeMinutes / 60;
    let remainingTimeDays = remainingTimeHours / 24;
    let remainingTimeMonths = remainingTimeDays / 31;
    //console.log(remainingTimeHours);
    //console.log(remainingTimeDays);
    // console.log(new Date().getTime());
    // console.log(new Date(returnDate.getTime));
    let displayRemainingTime = remainingTimeHours;
    let displayRemainingTimeUnit = "Stunden";
    if(remainingTimeHours<2) displayRemainingTimeUnit = "Stunde"
    if (remainingTimeHours > 24) {
    displayRemainingTime = remainingTimeDays;
    displayRemainingTimeUnit = "Tage";
    if(remainingTimeDays<2) displayRemainingTimeUnit = "Tag"
    }
    if (remainingTimeHours < 1) {
    displayRemainingTime = remainingTimeMinutes;
    displayRemainingTimeUnit = "Minuten";
    if(remainingTimeMinutes<2) displayRemainingTimeUnit = "Minute"
    }
    if (remainingTimeDays > 31) {
    displayRemainingTime = remainingTimeMonths;
    displayRemainingTimeUnit = "Monate";
    if(remainingTimeMonths<2) displayRemainingTimeUnit = "Monat"
    }
    
    return [displayRemainingTime, displayRemainingTimeUnit]
}

module.exports = {
    formatDuration,
    formatRemaining
}