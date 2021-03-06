const db = require("../../db");

const Users = db.User;

exports.create = (req, res) => {
    const user = new Users({
        address: req.body.address,
        username: req.body.username,
        customURL: req.body.customURL,
        profilePhoto: req.body.profilePhoto,
        userBio: req.body.userBio,
        websiteURL: req.body.websiteURL
    });

    user
        .save(user)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while creating the User."
            })
        });
}

exports.findAll = (req, res) => {
    const address = req.query.address;
    var condition = { address: {$regex: new RegExp(address), $options: "i"}}

    Users.find(condition)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occured while retrieving tutorials."
            })
        });
}

exports.findOne = (req, res) => {
    const id = req.params.id;
    
    Users.findById(id)
        .then(data => {
            if(!data)
                res.status(404).send({message: "Not found User with id " + id});
            else res.send(data)
        })
        .catch(err => {
            res.status(500)
            .send({message: "Error retrieving User with id = " + id});
        })
}

exports.update = (req, res) => {
    if(!req.body) {
        return res.status(400).send({
            message: "Data to update can not be empty!"
        })
    }

    const id = req.params.id;

    Users.findByIdAndUpdate(id, req.body, {useFindAndModify: false})
        .then(data => {
            if(!data) {
                res.status(404).send({
                    message: `Cannot update User with id = ${id}. Maybe User was not found.`
                });
            } else res.send({ message: "User was updated successfully" });
        })
        .catch(err => {
            res.status(500).send({
                message: "Error updating User with id = " + id
            })
        })
}

exports.delete = (req, res) => {
    const id = req.params.id;

    Users.findByIdAndRemove(id)
        .then(data => {
            if(!data) {
                res.status(404).send({
                    message: `Cannot delete User with id = ${id}. Maybe User was not found.`
                });
            } else {
                res.send({
                    message: "User was deleted successfully!"
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Could not delete User with id = " + id
            });
        })
}

exports.deleteAll = (req, res) => {
    Users.deleteMany({})
        .then(data => {
            res.send({
                message: `${data.deletedCount} Users were deleted succesfully!`
            });
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while removing all Users."
            });
        });
}