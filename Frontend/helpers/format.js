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

module.exports = {
    formatDuration
}