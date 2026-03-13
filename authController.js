const loginUser = async (req, res) => {
    try {
        const username = String(req.body.username);
        const password = String(req.body.password);

        const user = await db.collection('users').findOne({
            username: username,
            password: password
        });

        if (user) {
            res.status(200).json({ token: generateToken(user) });
        } else {
            res.status(401).json({ error: "Invalid credentials" });
        }
    } catch (err) {
        res.status(500).json({ error: "Server error" });
    }
};