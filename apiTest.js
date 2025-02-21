const express = require("express");
const cors = require("cors");

const app = express();
app.use(express.json());
app.use(cors());

// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({
        is_success: false,
        message: "Internal Server Error",
    });
});

// Function to process input data
const processData = (data) => {
    const numbers = data.filter((item) => /^\d+$/.test(item)); // Extract numbers
    const alphabets = data.filter((item) => /^[a-zA-Z]$/.test(item)); // Extract alphabets

    let highestAlphabet = [];
    if (alphabets.length > 0) {
        const highest = alphabets.reduce(
            (max, char) => (char > max ? char : max),
            alphabets[0]
        ); // Find highest alphabet
        highestAlphabet = [highest]; // Store only the highest character
    }

    return { numbers, alphabets, highestAlphabet };
};

// POST endpoint
app.post("/bfhl", (req, res) => {
    try {
        const { data } = req.body;
        if (!Array.isArray(data)) {
            return res
                .status(400)
                .json({ is_success: false, message: "Invalid input format" });
        }

        const { numbers, alphabets, highestAlphabet } = processData(data);

        res.json({
            is_success: true,
            user_id: "Vanshdeep_Singh_02022003",
            email: "vanshdeepsingh2232@gmail.com",
            roll_number: "2337739",
            numbers,
            alphabets,
            highest_alphabet: highestAlphabet,
        });
    } catch (error) {
        res.status(500).json({ is_success: false, message: "Server error" });
    }
});

// GET endpoint
app.get("/bfhl", (req, res) => {
    try {
        res.status(200).json({ operation_code: 1 });
    } catch (error) {
        res.status(500).json({ is_success: false, message: "Server error" });
    }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

module.exports = app;
