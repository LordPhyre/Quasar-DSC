function fps() {
    let fps = 0;
    let frameCount = 0;
    let startTime = 0;

    function updateFps() {
      frameCount++;
      const elapsedTime = (performance.now() - startTime) / 1000;

      if (elapsedTime > 1) {
          fps = frameCount / elapsedTime;
          startTime = performance.now();
          frameCount = 0;
      }

      document.getElementById('fpscounter').innerHTML = 'FPS: ' + fps.toFixed(2) + "<br>";
      requestAnimationFrame(updateFps);
  }
  updateFps();
}

module.exports = {
    fps: fps
};