export function reformatTimestamp(timestamp) {
    const dateParts = timestamp.split(' ');
    const date = new Date(timestamp);
    const hours = date.getHours();
    const minutes = date.getMinutes();
    let period = "AM";
  
    if (hours >= 12) {
      period = "PM";
      if (hours > 12) {
        date.setHours(hours - 12);
      }
    }
    
    const formattedTime = `${dateParts[0]} ${date.getHours()}:${String(minutes).padStart(2, '0')}${period}`;
  
    return formattedTime;
  }