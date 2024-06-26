window.onload = function () {
    var loader = document.getElementById("loader");
    
    loader.removeAttribute("hidden");

  
    setTimeout(function () {
    
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

function activeDeactive(params, params1) {
    document.addEventListener('DOMContentLoaded', function() {
        const items = document.querySelectorAll('.' + params);
        const items1 = document.querySelectorAll('.' + params1);
        
        items1.forEach((item, index) => {
            item.addEventListener('click', function() {
                // Remove 'activecontent' class from all items
                items.forEach(item => {
                    item.classList.remove('activecontent');
                });

                // Remove 'active-header' class from all items1 (header items)
                items1.forEach(item => {
                    item.classList.remove('active-header');
                });

                // Add 'active-header' class to the clicked header item
                this.classList.add('active-header');
                
                // Add 'activecontent' class to corresponding content item based on index
                items[index].classList.add('activecontent');
            });
        });
    });
}

activeDeactive('content-1','side-header');

$(document).on('click', '.dropdown-toggle::after', function(event) {
  event.preventDefault();

  if ($(window).width() <= 768 || $(window).width() < 980) {
      var $dropdownMenu = $(this).siblings('.dropdown-menu');
      $('.dropdown-menu').not($dropdownMenu).css('display', 'none !important');
      $dropdownMenu.toggle();
  }
});

