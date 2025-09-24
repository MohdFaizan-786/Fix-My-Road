// This script remains to provide the "Use Current Location" and image preview functionality
    const getLocationBtn = document.getElementById('get-location-btn');
    const locationInput = document.getElementById('location-input');

    getLocationBtn.addEventListener('click', () => {
        if (!navigator.geolocation) {
            alert("Geolocation is not supported by your browser.");
            return;
        }

        locationInput.value = "Fetching location...";

        navigator.geolocation.getCurrentPosition(
            (position) => {
                const { latitude, longitude } = position.coords;
                const apiUrl = `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}`;
                fetch(apiUrl)
                    .then(response => response.json())
                    .then(data => {
                        locationInput.value = data.display_name || `Lat: ${latitude.toFixed(4)}, Lon: ${longitude.toFixed(4)}`;
                    })
                    .catch(() => {
                        locationInput.value = `Lat: ${latitude.toFixed(4)}, Lon: ${longitude.toFixed(4)}`;
                    });
            },
            () => {
                locationInput.value = "";
                alert("Unable to retrieve your location. Please enter it manually.");
            }
        );
    });
    
    const fileUpload = document.getElementById('file-upload');
    const previewContainer = document.getElementById('image-preview-container');

    fileUpload.addEventListener('change', function() {
        if (previewContainer.children.length + this.files.length > 3) {
            alert('You can only upload a maximum of 3 images.');
            this.value = ''; 
            return;
        }
        for (const file of this.files) {
            const reader = new FileReader();
            reader.onload = (e) => {
                const previewWrapper = document.createElement('div');
                previewWrapper.className = 'relative group';
                previewWrapper.innerHTML = `<img src="${e.target.result}" class="w-full h-24 object-cover rounded-md"><button type="button" class="remove-btn absolute top-1 right-1 bg-red-600 text-white rounded-full h-6 w-6 flex items-center justify-center text-lg font-bold opacity-0 group-hover:opacity-100">&times;</button>`;
                previewContainer.appendChild(previewWrapper);
            }
            reader.readAsDataURL(file);
        }
        this.value = '';
    });

    previewContainer.addEventListener('click', (e) => {
        if (e.target.classList.contains('remove-btn')) {
            e.target.parentElement.remove();
        }
    });