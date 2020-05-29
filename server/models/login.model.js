const db = require('./db');

const Login = () => { };

Login.create = (req, result) => {
    const { login, password } = req.body;

    db.query(`SELECT executers.ID, executers.full_name, roles.role FROM executers JOIN roles ON executers.ID_ROLE = roles.ID  WHERE login = ? AND password = MD5(?)`, [login, password], (err, res) => {
        if (err) return result(err, null);

        if (!res.length) return result({ kind: 'not_found' }, null);

        const userData = res[0];

        req.session.auth = {
            status: true,
            ID: userData.ID
        }

        delete userData.ID;

        return result(null, userData);
    });
}


Login.isLogin = (req, next, result) => {
    if (!req.session.length) return result({ session: 'session is closed' }, null);

    const { ID } = req.session.auth;
    
    db.query(`SELECT * FROM executers WHERE ID = ?`, ID, (err, res) => {
        if (err) return result(err, null);

        if (!res.length) return result({ kind: 'not_found_user' }, null);

        next();
    });
}


Login.delete = (req, result) => {
    req.session = null;

    return result(null, { logout: true });
}


module.exports = Login;