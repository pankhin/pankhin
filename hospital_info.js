const express = require('express'); // Import Express.js
const axios = require('axios'); 
const path = require('path'); 

const app = express(); 
const port = 3000; 

// Serve static files from the 'project' directory
app.use(express.static(path.join(__dirname, 'project'))); 

// Route to handle search requests
app.get('/http://apis.data.go.kr/6260000/MedicInstitService/MedicalInstitInfo', async (req, res) => {
  try {
    // Encoding the query parameter if needed
    const query = encodeURIComponent(req.query.query); 
    
    // Example API request URL
    const url = `http://apis.data.go.kr/6260000/MedicInstitService/MedicalInstitInfo?serviceKey=9WVV%2FmMsoKbkDX4s%2FMXMfgotMxLJKEVTI2IIJoJNKsGQ7oXcQWg9ftICMaRL7RWO00DBSLeSwFvDFD73TeSPfw%3D%3D&numOfRows=6&pageNo=1&resultType=json`;

    // Making the API request
    const response = await axios.get(url, {});

    // Logging the response data
    console.log(response.data);
    
    // Sending the API response to the client
    res.send(response.data);
  } catch (error) {
    // Handling errors
    console.error('An error occurred:', error.message);
    res.status(500).send('An error occurred');
  }
});

// Start the server
app.listen(port, () => console.log(`Example app listening at http://localhost:${port}`)); 
