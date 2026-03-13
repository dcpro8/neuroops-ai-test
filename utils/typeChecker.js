const processRiskData = (data) => {
    if (Array.isArray(data)) {
        return processList(data);
    }
    return processSingleObject(data);
};