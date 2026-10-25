const express = require('express');
const cors = require('cors');
const fs = require('fs');
const path = require('path');

const app = express();
app.use(cors());
app.use(express.json());

// Load catalog.json safely
let catalog = [];
try {
    const dataPath = path.join(__dirname, 'catalog.json');
    const rawData = fs.readFileSync(dataPath, 'utf8');
    catalog = JSON.parse(rawData);
} catch (error) {
    console.error("Error reading catalog.json:", error.message);
}

// API endpoint for searching, filtering, and pagination
app.get('/api/items', (req, res) => {
    let { search = '', category = '', page = 1, limit = 9 } = req.query;
    
    page = parseInt(page, 10) || 1;
    limit = parseInt(limit, 10) || 9;

    let results = catalog;

    // 1. Search Filter (checks title or description)
    if (search.trim() !== '') {
        const query = search.toLowerCase();
        results = results.filter(item => 
            (item.title && item.title.toLowerCase().includes(query)) || 
            (item.description && item.description.toLowerCase().includes(query))
        );
    }

    // 2. Category Filter
    if (category.trim() !== '' && category !== 'All') {
        results = results.filter(item => 
            item.category && item.category.toLowerCase() === category.toLowerCase()
        );
    }

    // 3. Pagination Logic
    const totalRecords = results.length;
    const totalPages = Math.ceil(totalRecords / limit) || 1;
    const startIndex = (page - 1) * limit;
    const endIndex = page * limit;
    const paginatedResults = results.slice(startIndex, endIndex);

    res.json({
        totalRecords,
        totalPages,
        currentPage: page,
        data: paginatedResults
    });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Backend server is running on port ${PORT}`);
});