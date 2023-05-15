const nowDate = new Date()
const logDate = `${nowDate.toLocaleDateString("English",{weekday:'short'})} ${nowDate.getFullYear()}-${nowDate.getMonth()+1}-${nowDate.getDate()} ${nowDate.toLocaleTimeString('en-US',{hour12:false})}`

const userCount = (connEvent,userCount)=>{

    switch (connEvent) {
        case "connected":
            userCount++
            break;
    
        case "disconnected":
            userCount--
            break;
    }
    return userCount
}

export {logDate, userCount}