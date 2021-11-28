import {EXTRA_MORNING_RATE, NORMAL_RATE} from "./HourRate";

const ENDPOINT = "http://localhost:8080";
const STUB = true;

const api = {
  getAllShifts: (username) => {
    return _call( _endpoint("/v1/" + username + "/shift"), "GET", null);
  }
};

const stubs = {
  getAllShifts: (username) => _stub([
    { date: '2021-10-12', startTime: 0, endTime: 0, rated: {[NORMAL_RATE]: {hours: 8, minutes: 0} } },
    { date: '2021-10-13', startTime: 0, endTime: 0, rated: {[NORMAL_RATE]: {hours: 8, minutes: 0} } },
    { date: '2021-10-14', startTime: 0, endTime: 0, rated: {[NORMAL_RATE]: {hours: 8, minutes: 0} } },
    { date: '2021-10-15', startTime: 0, endTime: 0, rated: {[NORMAL_RATE]: {hours: 8, minutes: 0}, [EXTRA_MORNING_RATE]: {hours: 1, minutes: 15} } },
  ])
};

const _endpoint = (path) => ENDPOINT + path

const _call = (path, method, body) => {
  // TODO Handle body
  const requestObject = {
    method: method,
    cors: "cors",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: localStorage.getItem("user_session") // TODO Clean this user_session retrieval
    }
  };
  if (body) {
    requestObject.body = JSON.stringify(body);
  }
  return fetch(path, requestObject).then(response => {
    return response.json();
  });
};

const _stub = (content) => {
  return new Promise(function(resolve, _reject) {
    setTimeout(() => resolve(content), 500 + Math.random()*1000);
  });
};


export default STUB ? stubs : api;
