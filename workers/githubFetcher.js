const fetchPullRequestData = async (repo, prNumber) => {
    const response = await fetch(`https://api.github.com/repos/${repo}/pulls/${prNumber}`);
    const data = await response.json();
    
    return formatPrData(data);
};