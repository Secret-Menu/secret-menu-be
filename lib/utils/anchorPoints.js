module.exports.getAnchor = (quadrant) => {
  let anchorPoint = {};
  if(quadrant === 'N') anchorPoint = anchorN;
  if(quadrant === 'NE') anchorPoint = anchorN;
  if(quadrant === 'SE') anchorPoint = anchorN;
  if(quadrant === 'S') anchorPoint = anchorN;
  if(quadrant === 'SW') anchorPoint = anchorN;
  if(quadrant === 'NW') anchorPoint = anchorN;
  return anchorPoint;
};

const anchorN = {
  center: {
    lat: 45.52, 
    lng: -122.67,
  },
  zoom: 12
};

