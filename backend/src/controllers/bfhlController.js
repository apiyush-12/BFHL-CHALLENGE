const hierarchyService = require('../services/hierarchyService');

const processHierarchies = (req, res) => {
    try {
        const { data } = req.body;
        const startTime = Date.now();
        const processed = hierarchyService.processData(data);
        const endTime = Date.now();
        if (endTime - startTime > 3000) {
            console.warn(`Performance warning: Processing took ${endTime - startTime}ms`);
        }
        const response = {
            user_id: "piyush_kumar_12",
            email_id: "pk6990@srmist.edu.in",
            college_roll_number: "RA2311029010030",
            ...processed
        };
        return res.status(200).json(response);
    } catch (error) {
        console.error("Error in processHierarchies:", error);
        return res.status(500).json({
            is_success: false,
            message: "Internal Server Error"
        });
    }
};
module.exports = {
    processHierarchies
};
