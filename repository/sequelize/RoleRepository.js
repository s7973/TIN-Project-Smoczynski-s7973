const Role = require("../../model/sequelize/Role");

exports.getRoles = () => {
    return Role.findAll();
};

exports.getRoleById = (RoleId) => {
    return Role.findByPk(RoleId,
        {
            include: [{
                model: Student,
                as: 'student'
            }]
        });
};
