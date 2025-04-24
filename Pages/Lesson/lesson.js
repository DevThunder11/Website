// Loader functionality
document.addEventListener('DOMContentLoaded', function() {
  // Hide loader and show content after 1.5 seconds
  setTimeout(function() {
    document.getElementById('loader').style.display = 'none';
    document.body.style.visibility = 'visible';
  }, 1500);
});