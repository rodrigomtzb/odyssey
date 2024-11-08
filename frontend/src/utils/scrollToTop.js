const scrollToTop = (duration = 800) => {
  const start = window.scrollY;
  const startTime = performance.now();

  const smoothStep = (start, end, point) => {
    return start + (end - start) * Math.pow(point, 3); 
  };

  const scroll = (currentTime) => {
    const elapsed = currentTime - startTime;
    const progress = Math.min(elapsed / duration, 1);

    const position = smoothStep(start, 0, progress);
    window.scrollTo(0, position);

    if (progress < 1 && window.scrollY > 0) {
      requestAnimationFrame(scroll);
    }
  };

  requestAnimationFrame(scroll);
};

export default scrollToTop;
