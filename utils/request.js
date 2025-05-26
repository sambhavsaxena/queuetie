const is_browser_call = (req) => {
    const request_agent = req.headers['user-agent'] || '';
    return /Mozilla|Chrome|Safari|Firefox|Edge/.test(request_agent); // restricts API access over Free tier
}

export { is_browser_call };
