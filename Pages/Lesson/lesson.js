// Loader functionality
document.addEventListener('DOMContentLoaded', function() {
  // Hide loader and show content after 1.5 seconds
  setTimeout(function() {
    var loader = document.getElementById('loader');
    if(loader) loader.style.display = 'none';
    document.body.style.visibility = 'visible';
  }, 1500);

  // Slide-down for sub-lessons (support multiple containers)
  var lessonTopics = document.querySelectorAll('.lesson-topic');
  lessonTopics.forEach(function(lessonTopic) {
    var container = lessonTopic.parentElement;
    var subLessons = container.querySelector('.sub-lessons');
    if(subLessons) {
      lessonTopic.addEventListener('click', function() {
        subLessons.classList.toggle('open');
      });
    }
  });
});
