// controllers/api.js

exports.api = function(req, res) {
    res.write('[');
    res.write('{"resource":"crystals", ');
    res.write('"verbs":["GET","PUT", "DELETE", "POST"] ');
    res.write('}');
    res.write(']');
    res.send();
};
