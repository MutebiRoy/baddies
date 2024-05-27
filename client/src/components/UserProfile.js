exports.getAllPosts = (req, res) => {
    res.send('Fetching all posts');
};

exports.getPostById = (req, res) => {
    res.send('Fetching a single post with ID: ' + req.params.id);
};

exports.createPost = (req, res) => {
    res.send('Creating a new post');
};

exports.updatePost = (req, res) => {
    res.send('Updating post with ID: ' + req.params.id);
};

exports.deletePost = (req, res) => {
    res.status(204).send(); // No content to send back
};
