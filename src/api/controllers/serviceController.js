exports.getAllServices = (req, res) => {
    res.send('Fetching all services');
};

exports.getServiceById = (req, res) => {
    res.send('Fetching service with ID: ' + req.params.id);
};

exports.createService = (req, res) => {
    res.send('Creating a new service');
};

exports.updateService = (req, res) => {
    res.send('Updating service with ID: ' + req.params.id);
};

exports.deleteService = (req, res) => {
    res.status(204).send(); // No content to send back
};
