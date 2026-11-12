// Play each <video> while it is on screen and pause it when it scrolls away,
// so the page doesn't download every video at once.
// Skipped for visitors who have asked their system to reduce motion.
document.addEventListener("DOMContentLoaded", function () {
  var videos = document.querySelectorAll("video");
  if (!videos.length || !("IntersectionObserver" in window)) return;
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

  var observer = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      var video = entry.target;
      if (entry.isIntersecting) {
        video.muted = true; // browsers only allow autoplay for muted videos
        var playing = video.play();
        if (playing && playing.catch) playing.catch(function () {});
      } else {
        video.pause();
      }
    });
  }, { threshold: 0.5 });

  videos.forEach(function (video) { observer.observe(video); });
});
