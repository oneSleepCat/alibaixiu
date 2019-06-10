module.exports = async (req, res) => {
  // console.log(req.query.url);
	if (req.session && req.session.userInfo && req.session.userInfo.role == 'admin') {
		const s = `var userId=\"${req.session.userInfo._id}\"`
		res.send(s)
	}else {
    let url = req.query.url || '/admin/login.html';
		res.send(`location.href='${url}'`)
	}
};
