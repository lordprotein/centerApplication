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

        if (res.length) return result(null, res);

        result({ kind: 'not_found' }, null);
    });
}


Executer.create = (req, result) => {
    const { id } = req.params;

    db.query('INSERT INTO applications_of_executers (ID, ID_EXECUTER, ID_APPLICATION) VALUES (?, ?, ?)', [id, ID_EXECUTER, ID_APPLICATION], (err, res) => {
        if (err) return result(err, null);

        db.query('UPDATE applications SET status = ? WHERE ID = ?', ['process', ID_APPLICATION], (err, res) => {
            if (err) {
                db.query('DELETE * FROM applications_of_executers WHERE ID = ?', ID_APPLICATION);

                return result(err, null);
            }

            result(res);
        })
    });
}