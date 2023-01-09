const BASE_URL = "http://openapi.seoul.go.kr:8088";
const API_KEY = "446b6b7968676d6c35307165706969";

export const getEventList = () =>
  fetch(`${BASE_URL}/${API_KEY}/json/culturalEventInfo/1/10/`)
    .then((res) => res.json())
    .catch((error) => console.log(error));