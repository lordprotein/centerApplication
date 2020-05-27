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


Executer.readExecutersList = (req, result) => {

    db.query('SELECT * FROM executers', (err, res) => {
        if (err) return result(err, null);

        if (res.length) return result(null, res);

        result({ kind: 'not_found' }, null);
    });
}


Executer.readApplications = (req, result) => {
    const { id, status } = req.params;

    if (status === 'free') {
        db.query(`SELECT applications.ID FROM applications_of_executers INNER JOIN applications WHERE applications.ID = applications_of_executers.ID_APPLICATION AND applications_of_executers.ID_EXECUTER = ? AND applications.status = 'pending'`, id, (err, res) => {
            if (err) return result(err, null);
            let notList = '';

            if (res.length) {
                res.forEach(item => {
                    notList += ` applications.ID = '${item.ID}' AND NOT`;
                });

                const lastWord = notList.lastIndexOf(' AND NOT');
                notList = notList.substring(0, lastWord);
                notList = `AND (NOT ${notList})`;
            }

            db.query(`SELECT DISTINCT applications.* FROM applications LEFT JOIN applications_of_executers ON applications_of_executers.ID_APPLICATION != applications.ID WHERE (applications.status = 'pending' ${notList}) OR applications.status = 'free'`, (err, res) => {
                if (err) return result(err, null);

                return result(null, res);
            });
        })
    }
    else {
        db.query('SELECT applications.* FROM applications_of_executers INNER JOIN applications WHERE applications_of_executers.ID_APPLICATION = applications.ID AND applications_of_executers.ID_EXECUTER = ? AND applications.status = ?', [id, status], (err, res) => {
            if (err) return result(err, null);

            return result(null, res);
        });
    }


}


Executer.create = (req, result) => {
    const { userID } = req.params;
    const { id, id_application } = req.body;
    let status = 'process';

    db.query('INSERT INTO applications_of_executers (ID, ID_EXECUTER, ID_APPLICATION) VALUES (?, ?, ?)', [id, userID, id_application], (err, res) => {
        if (err) return result(err, null);

        db.query('SELECT current_count_executers, count_executer FROM applications WHERE ID=?', id_application, (err, res) => {
            if (err) return result(err, null);

            const currCountExecuters = res[0].current_count_executers + 1;

            if (currCountExecuters < res[0].count_executer) status = 'pending';

            db.query('UPDATE applications SET status = ?, current_count_executers = ? WHERE ID = ?', [status, currCountExecuters, id_application], (err, res) => {
                if (err) return result(err, null);

                result(null, { status: 'successful' });
            })
        })
    });
}


Executer.delete = (req, result) => {
    const { appID, userID } = req.params;
    db.query('DELETE FROM applications_of_executers WHERE ID_APPLICATION = ? AND ID_EXECUTER = ?', [appID, userID], (err, res) => {
        if (err) return result(err, null);

        db.query('SELECT current_count_executers, status FROM applications WHERE ID = ?', [appID], (err, res) => { //To delete
            if (err) return result(err, null);

            const currCountExecuters = res[0].current_count_executers - 1;
            let { status } = res[0];

            status = ((status === 'process' || status === 'pending') && currCountExecuters !== 0) ? 'pending' : 'free';

            db.query('UPDATE applications SET status=?, current_count_executers=? WHERE ID=?', [status, currCountExecuters, appID], (err, res) => {
                if (err) return result(err, null);

                return result(null, { status: 'successful' });
            })
        });
    });
}

module.exports = Executer;