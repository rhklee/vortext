
function getCartCoord(r, theta, xOffset=0, yOffset=0) {
  const x = r * Math.cos(theta) + xOffset;
  const y = r * Math.sin(theta) + yOffset;
  return [x, y];
}

function archSpiral(theta) {
  const a = 0;
  const b = 0.8;
  return a + b * theta;
}

function onScroll(event) {
  event.preventDefault();

  const tp = document.getElementById('text-path');

  // for number offset
  // const currentOffset = parseInt(tp.getAttribute('startOffset'), 10);
  // const dy = event.deltaY * 2;
  // tp.setAttribute('startOffset', currentOffset + dy);

  // for percentage offset
  const currentOffset = parseFloat(tp.getAttribute('startOffset').replace('%', ''));
  const dyPercentage = Math.sign(event.deltaY) * Math.min(Math.abs(event.deltaY) * 0.1, 1.0); // restrict
  tp.setAttribute('startOffset', `${currentOffset + dyPercentage}%`);
}

(function() {
  const curveApproxScale = Math.PI/20;
  const numIters = 1200;

  const xOffset = 250;
  const yOffset = 125;

  const thetas = [];
  let iters = 1;
  while(iters < numIters) {
    thetas.push(iters * curveApproxScale);
    iters += 1;
  }

  const coords = thetas.map(theta => getCartCoord(archSpiral(theta), theta, xOffset, yOffset));
  const points = coords.map(coord => `L ${coord[0]} ${coord[1]}`).join(' ');
  const path = document.getElementById('path');
  path.setAttribute('d', `M ${xOffset} ${yOffset} ${points}`);
  // console.log(points)

  const vb = document.getElementById('view-box-svg');
  vb.onwheel = _.throttle(onScroll, 25);
}());