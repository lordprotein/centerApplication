const db = require('./db');

const Executer = () => { };

Executer.read = (req, result) => {
    const { id } = req.params;

    db.query('SELECT executers.full_name, roles.role FROM executers INNER JOIN roles WHERE executers.ID_ROLE = roles.ID AND executers.ID = ?', id, (err, res) => {
        if (err) return result(err, null);

        if (res.length) return result(null, res);

        result({ kind: 'not_found' }, null);
    });
}


Executer.readApplications = (req, result) => {
    const { id, status } = req.params;

    db.query('SELECT applications.* FROM applications_of_executers INNER JOIN applications WHERE applications_of_executers.ID_APPLICATION = applications.ID AND applications_of_executers.ID_EXECUTER = ? AND applications.status = ?', [id, status], (err, res) => {
        if (err) return result(err, null);

        return result(null, res);
    });
}


Executer.create = (req, result) => {
    const { userID } = req.params;
    const { id, id_application } = req.body;

    db.query('INSERT INTO applications_of_executers (ID, ID_EXECUTER, ID_APPLICATION) VALUES (?, ?, ?)', [id, userID, id_application], (err, res) => {
        if (err) return result(err, null);

        db.query('UPDATE applications SET status = ? WHERE ID = ?', ['process', id_application], (err, res) => {
            if (err) {
                db.query('DELETE * FROM applications_of_executers WHERE ID = ?', id_application);

                return result(err, null);
            }

            result(null, { status: 'successful' });
        })
    });
}


Executer.delete = (req, result) => {
    const { appID, userID } = req.params;
    db.query('DELETE FROM applications_of_executers WHERE ID_APPLICATION = ? AND ID_EXECUTER = ?', [appID, userID], (err, res) => {
        if (err) return result(err, null);

        db.query('SELECT * FROM applications_of_executers WHERE ID_APPLICATION = ?', [appID], (err, res) => {
            if (err) return result(err, null);

            if (res.length) return result(null, { status: 'successful' });

            db.query('UPDATE applications SET status=? WHERE ID=?', ['free', appID], (err, res) => {
                if (err) return result(err, null);

                return result(null, { status: 'successful' });
            })
        });
    });
}

module.exports = Executer;