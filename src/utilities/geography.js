import { isPointInCircle, getDistance } from 'geolib';

const findNearMe = (data, addressLatLng, radius) => {
  const { latitude, longitude } = addressLatLng;
  let filteredData = checkLatLng(data);

  for (let point in filteredData) {
    const currentLat = filteredData[point].LATITUDE;
    const currentLng = filteredData[point].LONGITUDE;

    filteredData[point].NEARME = isPointInCircle(
      { latitude, longitude },
      {
        latitude: currentLat,
        longitude: currentLng
      },
      radius
    );
    filteredData[point].DISTANCE = getDistance(
      { latitude, longitude },
      {
        latitude: currentLat,
        longitude: currentLng
      }
    );
  }

  return sortByDistance(filteredData.filter(r => r.NEARME === true));
};

const checkLatLng = data => {
  return data.filter(r => {
    return (
      r.PHYSICAL_ADDRESS.match(/\d+/g) !== null &&
      r.LATITUDE !== '0' &&
      r.LONGITUDE !== '0' &&
      r.LATITUDE !== null &&
      r.LONGITUDE !== null
    );
  });
};

const sortByDistance = data => {
  return data.sort(function(a, b) {
    if (a.DISTANCE < b.DISTANCE) return -1;
    if (a.DISTANCE > b.DISTANCE) return 1;
    return 0;
  });
};

export { findNearMe, checkLatLng, sortByDistance };
