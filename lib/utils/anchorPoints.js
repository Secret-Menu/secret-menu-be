module.exports.getAnchor = (quadrant) => {
  let anchorPoint = {};
  if(quadrant === 'N') anchorPoint = anchorN;
  if(quadrant === 'NE') anchorPoint = anchorNE;
  if(quadrant === 'SE') anchorPoint = anchorSE;
  if(quadrant === 'S') anchorPoint = anchorS;
  if(quadrant === 'SW') anchorPoint = anchorSW;
  if(quadrant === 'NW') anchorPoint = anchorNW;
  return anchorPoint;
};

const anchorN = {
  center: {
    lat: 45.565, 
    lng: -122.685,
  },
  zoom: 12.5
};

const anchorNE = {
  center: {
    lat: 45.55, 
    lng: -122.627,
  },
  zoom: 12.5
};

const anchorSE = {
  center: {
    lat: 45.51, 
    lng: -122.61,
  },
  zoom: 12.5
};

const anchorS = {
  center: {
    lat: 45.497, 
    lng: -122.671,
  },
  zoom: 12.5
};

const anchorSW = {
  center: {
    lat: 45.5189, 
    lng: -122.683,
  },
  zoom: 12.5
};

const anchorNW = {
  center: {
    lat: 45.53, 
    lng: -122.695,
  },
  zoom: 12.5
};
