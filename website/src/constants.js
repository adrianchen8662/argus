export const Areas = {
  frame_area: "FRAME_AREA",
  family_area: "FAMILY_AREA",
  timeline_area: "TIMELINE_AREA",
  error_area: "ERROR_AREA",
}

export const Events = {
  delivery: "Delivery",
  unknown: "Unknown",
  family: "Family",
}

export const FamilyAreaViews = {
  all_members: "ALL_MEMBERS",
  one_member: "ONE_MEMBER",
  add_member: "ADD_MEMBER"
}

export const months = {
  0: "Jan",
  1: "Feb",
  2: "Mar",
  3: "Apr",
  4: "May",
  5: "Jun",
  6: "Jul",
  7: "Aug",
  8: "Sep",
  9: "Oct",
  10: "Nov",
  11: "Dec"
}

export const days = {
  0: "Monday",
  1: "Tuesday",
  2: "Wednesday",
  3: "Thursday",
  4: "Friday",
  5: "Saturday",
  6: "Sunday"
}


export const calcDate = (timestamp) => {
  const dateTime = new Date(0);
  dateTime.setUTCSeconds(timestamp);
  const dateString = `${days[dateTime.getDay()]}, ${months[dateTime.getMonth()]} ${dateTime.getDate()}`;
  return dateString;
};

export const calcDateNoDay = (timestamp) => {
  const dateTime = new Date(0);
  dateTime.setUTCSeconds(timestamp);
  const dateString = `${months[dateTime.getMonth()]} ${dateTime.getDate()}`;
  return dateString;
};

export const calcTime = (timestamp) => {
  const dateTime = new Date(0);
  dateTime.setUTCSeconds(timestamp);
  let postfix = "AM";
  let timestampHours = dateTime.getHours();
  if(timestampHours > 12) {
    postfix = "PM";
    timestampHours -= 12;
  } else if(timestampHours === 12) {
    postfix = "PM";
  }
  const timeString = `${timestampHours}:${String(dateTime.getMinutes()).padStart(2,0)} ${postfix}`
  return timeString;
}

export const getDateFromImgSrc = (imgSrc) => {
  const timestamp = imgSrc;
  return calcDateNoDay(timestamp);
}

export const getTimeFromImgSrc = (imgSrc) => {
  const timestamp = imgSrc;
  return calcTime(timestamp);
}

export const getTimestampFromImgSrc = (imgSrc) => {
  const timestamp = imgSrc;
  return timestamp;
}

export const getConnVals = (connString) => {
  const connArr = connString.split(',');
  const connDict = {};
  connArr.forEach((connStr) => {
    const connStrArr = connStr.split(':');
    const re = /{|}| /g;
    connDict[connStrArr[0].replace(re, '')] = connStrArr[1].replace(re, '') === "true"
  });
  return connDict
}

export const TIMELINE_VIEWS = {
  basic_view: "BASIC_VIEW",
  addtofamily_view: "ATOF_VIEW",
  details_view: "DETAILS_VIEW",
  approvefamily_view: "APPROVE_VIEW",
}

export const getFileNameFromTimestamp = (timestamp) => `${timestamp}.jpg`

export const apiHost = "http://192.168.1.125:5050" // "http://localhost:8010/proxy"