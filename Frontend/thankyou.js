   const reportIdInput = document.getElementById('report-id');
        const trackButton = document.getElementById('track-status-btn');

        // Generate a dynamic 10-digit Report ID when the page loads
        window.addEventListener('DOMContentLoaded', () => {
            const reportID = Math.floor(1000000000 + Math.random() * 9000000000);
            reportIdInput.value = reportID;
        });

        // Add functionality to the new "Track Your Status" button
        trackButton.addEventListener('click', () => {
            const reportID = reportIdInput.value;
            alert(`Navigating to status page for Report ID: ${reportID}.`);
            // In a real application, you might redirect to a status page like this:
            // window.location.href = `/status?id=${reportID}`;
        });