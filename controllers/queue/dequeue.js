const dequeue_controller = async (req, res) => {
    const { email, body, subject } = req.body;
    return res.status(200).json({ email: email, body: body, subject: subject, status: "success" });
};

export default dequeue_controller;
