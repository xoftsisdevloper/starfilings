window.onload = function () {
    var loader = document.getElementById("loader");
    // Show the loader by removing the hidden attribute
    loader.removeAttribute("hidden");

    // Hide the loader after 3 seconds (adjust as needed)
    setTimeout(function () {
      // Hide the loader by adding the hidden attribute
      loader.setAttribute("hidden", true);
    }, 1000); // 3000 milliseconds = 3 seconds
  };

  window.addEventListener('scroll', function () {
    var header = document.getElementById('header');
    if (window.scrollY > 50) { // Adjust 50 as needed to determine scroll threshold
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  });
  function scrollToSection(sectionId) {
    var $targetSection = $('#' + sectionId);

    if ($targetSection.length) {
      var offset = $targetSection.offset().top - $('.navbar').height();

      $('html, body').animate({ scrollTop: offset }, 10, 'swing');
    }
  }

// Function to check if an element is in the viewport
function isInViewport(element) {
    const rect = element.getBoundingClientRect();
    return (
        rect.top >= 0 &&
        rect.left >= 0 &&
        rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
        rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
}

// Function to handle scroll event
function handleScroll() {
    const sections = document.querySelectorAll('.flip-box');

    sections.forEach(section => {
        if (isInViewport(section)) {
            section.classList.add('active');
        } else {
            section.classList.remove('active');
        }
    });
}

// Add event listener for scroll event
window.addEventListener('scroll', handleScroll);
window.addEventListener('resize', handleScroll);

// Initial check on page load
handleScroll();
