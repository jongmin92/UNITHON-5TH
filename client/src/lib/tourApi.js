import axios from 'axios';
import log from 'loglevel';

export default tourApi = {
  apiServer: 'http://api.visitkorea.or.kr/openapi/service/rest/KorService/areaBasedList',
  apiKey: '5lBVFahPjOQQ3FgxFRffiOuRE7AvvXWzDVzIS5OAbRFOJA7Iye9tQhjPLKpgyJ2hPyvqRXsi3yurqH2oNdXnjA%3D%3D',

  getAreaBasedData(areaCode, sigunguCode, contentTypeId) {
    return axios.get(`http://api.visitkorea.or.kr/openapi/service/rest/KorService/areaBasedList?ServiceKey=5lBVFahPjOQQ3FgxFRffiOuRE7AvvXWzDVzIS5OAbRFOJA7Iye9tQhjPLKpgyJ2hPyvqRXsi3yurqH2oNdXnjA%3D%3D&areaCode=${areaCode}&sigunguCode=${sigunguCode}&contentTypeId=${contentTypeId}&MobileOS=ETC&MobileApp=TravelPlanner&arrange=B&pageNo=1&numOfRows=30&_type=json`);
  }

};
