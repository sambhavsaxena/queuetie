const dequeue_controller = async (req, res) => {
    const { email, body, subject } = req.body;
    return res.send({ email: email, body: body, subject: subject, status: "success" });
};

export default dequeue_controller;
