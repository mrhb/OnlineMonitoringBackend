var moment = require("moment");
const unitModel = require('../../units/models/units.model');


exports.patchMaintenancesById = (req, res) => {
    if (req.body.maintenances) {
        unitModel.patchUnitMaintenances(req.params.id, req.body.maintenances)
        .then((result) => {
            res.status(204).send({});
        });
    }
    else
    res.status(400).send({});

};