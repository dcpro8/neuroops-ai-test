const handlePrWebhook = async (req, res) => {
    const { repo, prNumber } = req.body;

    try {
        await queueAnalysisJob(repo, prNumber); 
        res.status(200).json({ message: "Analysis queued" });
    } catch (error) {
        res.status(500).json({ error: "Failed to queue job" });
    }
};