// Document Ready
document.addEventListener('DOMContentLoaded', function() {
    // Initialize components
    initSmoothScroll();
    initServiceButtons();
    initFileUpload();
    initAccordionAnimations();
    initScrollAnimations();
    
    // Initialize tooltips if using Bootstrap
    if (typeof bootstrap !== 'undefined') {
        var tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'));
        var tooltipList = tooltipTriggerList.map(function (tooltipTriggerEl) {
            return new bootstrap.Tooltip(tooltipTriggerEl);
        });
    }
});

// Smooth Scrolling
function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                // Update active nav link
                document.querySelectorAll('.nav-link').forEach(link => {
                    link.classList.remove('active');
                });
                this.classList.add('active');
                
                // Scroll to target
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Update active nav on scroll
    window.addEventListener('scroll', function() {
        const sections = document.querySelectorAll('section[id]');
        const scrollPos = window.scrollY + 100;
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            const sectionId = section.getAttribute('id');
            
            if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
                document.querySelectorAll('.nav-link').forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === '#' + sectionId) {
                        link.classList.add('active');
                    }
                });
            }
        });
    });
}

// Service Buttons
function initServiceButtons() {
    const serviceButtons = document.querySelectorAll('.btn-service, [data-service]');
    const modal = new bootstrap.Modal(document.getElementById('documentModal'));
    const selectedServiceInput = document.getElementById('selectedService');
    
    serviceButtons.forEach(button => {
        button.addEventListener('click', function() {
            const serviceName = this.getAttribute('data-service');
            
            if (selectedServiceInput) {
                selectedServiceInput.value = serviceName;
            }
            
            // Show modal
            modal.show();
            
            // Optional: Scroll to form
            setTimeout(() => {
                document.querySelector('#documentRequestForm').scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }, 300);
        });
    });
}

// File Upload
function initFileUpload() {
    const uploadArea = document.getElementById('uploadArea');
    const fileInput = document.getElementById('fileUpload');
    const fileList = document.getElementById('fileList');
    
    if (!uploadArea || !fileInput) return;
    
    // Click on upload area
    uploadArea.addEventListener('click', () => {
        fileInput.click();
    });
    
    // Drag and drop
    ['dragenter', 'dragover', 'dragleave', 'drop'].forEach(eventName => {
        uploadArea.addEventListener(eventName, preventDefaults, false);
    });
    
    function preventDefaults(e) {
        e.preventDefault();
        e.stopPropagation();
    }
    
    ['dragenter', 'dragover'].forEach(eventName => {
        uploadArea.addEventListener(eventName, highlight, false);
    });
    
    ['dragleave', 'drop'].forEach(eventName => {
        uploadArea.addEventListener(eventName, unhighlight, false);
    });
    
    function highlight() {
        uploadArea.style.borderColor = '#3498db';
        uploadArea.style.background = '#e3f2fd';
    }
    
    function unhighlight() {
        uploadArea.style.borderColor = '#ddd';
        uploadArea.style.background = '#f8f9fa';
    }
    
    // Handle file drop
    uploadArea.addEventListener('drop', handleDrop, false);
    
    function handleDrop(e) {
        const dt = e.dataTransfer;
        const files = dt.files;
        handleFiles(files);
    }
    
    // Handle file selection
    fileInput.addEventListener('change', function() {
        handleFiles(this.files);
    });
    
    function handleFiles(files) {
        fileList.innerHTML = '';
        
        [...files].forEach(file => {
            if (file.type === 'application/pdf' || 
                file.type === 'image/jpeg' || 
                file.type === 'image/png' ||
                file.type === 'application/msword' ||
                file.type === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document') {
                
                const fileItem = document.createElement('div');
                fileItem.className = 'file-item alert alert-info d-flex justify-content-between align-items-center';
                fileItem.innerHTML = `
                    <div>
                        <i class="fas fa-file me-2"></i>
                        ${file.name} (${formatFileSize(file.size)})
                    </div>
                    <button type="button" class="btn btn-sm btn-danger remove-file">
                        <i class="fas fa-times"></i>
                    </button>
                `;
                
                fileList.appendChild(fileItem);
                
                // Add remove functionality
                fileItem.querySelector('.remove-file').addEventListener('click', function() {
                    fileItem.remove();
                });
            } else {
                alert(`File ${file.name} is not a supported file type. Please upload PDF, JPG, PNG, or DOC files only.`);
            }
        });
    }
    
    function formatFileSize(bytes) {
        if (bytes === 0) return '0 Bytes';
        const k = 1024;
        const sizes = ['Bytes', 'KB', 'MB', 'GB'];
        const i = Math.floor(Math.log(bytes) / Math.log(k));
        return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
    }
}

// Accordion Animations
function initAccordionAnimations() {
    const accordionButtons = document.querySelectorAll('.accordion-button');
    
    accordionButtons.forEach(button => {
        button.addEventListener('click', function() {
            const accordionItem = this.closest('.accordion-item');
            const accordionBody = accordionItem.querySelector('.accordion-collapse');
            
            // Add animation class
            if (accordionBody.classList.contains('show')) {
                accordionBody.classList.add('collapsing');
                setTimeout(() => {
                    accordionBody.classList.remove('collapsing');
                }, 300);
            } else {
                accordionBody.classList.add('expanding');
                setTimeout(() => {
                    accordionBody.classList.remove('expanding');
                }, 300);
            }
        });
    });
}

// Scroll Animations
function initScrollAnimations() {
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
            }
        });
    }, observerOptions);
    
    // Observe elements for animation
    document.querySelectorAll('.service-card, .stat-item, .accordion-item').forEach(el => {
        observer.observe(el);
    });
}

// Form Submission
document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('documentRequestForm');
    
    if (form) {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Simple validation
            const requiredFields = form.querySelectorAll('[required]');
            let isValid = true;
            
            requiredFields.forEach(field => {
                if (!field.value.trim()) {
                    field.classList.add('is-invalid');
                    isValid = false;
                } else {
                    field.classList.remove('is-invalid');
                }
            });
            
            if (isValid) {
                // Show success message
                const modal = bootstrap.Modal.getInstance(document.getElementById('documentModal'));
                alert('Thank you! Your document review request has been submitted. We will contact you within 24 hours.');
                
                // Reset form
                form.reset();
                document.getElementById('fileList').innerHTML = '';
                
                // Close modal
                if (modal) {
                    modal.hide();
                }
            }
        });
    }
});

// Dynamic Price Calculator (Optional Enhancement)
function calculatePrice(service, complexity) {
    const prices = {
        'Personal Tax Filing': { basic: 199, standard: 299, complex: 399 },
        'Business Tax Services': { basic: 499, standard: 799, complex: 1199 },
        'Tax Planning': { basic: 299, standard: 499, complex: 799 },
        'Audit Defense': { basic: 799, standard: 1299, complex: 1999 }
    };
    
    return prices[service]?.[complexity] || 'Contact for quote';
}

// Add this to your service selection if you want dynamic pricing
document.querySelectorAll('.service-card').forEach(card => {
    card.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-10px) scale(1.02)';
    });
    
    card.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0) scale(1)';
    });
});