// main.js - Fixed frontend code
document.addEventListener('DOMContentLoaded',async  () => {
  const coursesContainer = document.getElementById('courses-container');
  
  await fetch('http://localhost:5000/api/courses')
    .then(response => {
      if (!response.ok) {
        throw new Error(`Network response was not ok: ${response.statusText}`);
      }
      return response.json();
    })
    .then(data => {
      console.log('Courses fetched from backend:', data);
      
      if (!data.length) {
        coursesContainer.innerHTML = `
          <div class="p-6 bg-yellow-100 border border-yellow-400 text-yellow-800 rounded">
            <p>No courses available at the moment. Please check back later!</p>
          </div>
        `;
        return;
      }
      
      // Populate courses with proper template literal syntax and sanitization
      coursesContainer.innerHTML = data.map(course => `
        <div class="p-6 bg-white shadow rounded">
          <h4 class="font-bold text-lg text-blue-800">${escapeHtml(course.title)}</h4>
          <p class="mt-2 text-gray-600">${escapeHtml(course.description)}</p>
          <p class="mt-2 text-blue-600">Duration: ${escapeHtml(course.duration)}</p>
          <p class="mt-2 font-bold text-green-600">Price: $${course.price}</p>
          ${course.link ? `
            <div class="mt-4">
              <a href="${escapeHtml(course.link)}" 
                 class="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                 target="_blank">
                View Course
              </a>
            </div>
          ` : ''}
        </div>
      `).join('');
    })
    .catch(error => {
      console.error('Error fetching courses:', error);
      coursesContainer.innerHTML = `
        <div class="p-6 bg-red-100 border border-red-400 text-red-800 rounded">
          <p>Failed to load courses. Please try again later.</p>
          <p class="mt-2 text-sm">${error.message}</p>
        </div>
      `;
    });
});

// Helper function to prevent XSS
function escapeHtml(unsafe) {
  return unsafe
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}



