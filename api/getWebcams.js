module.exports = (req, res) => {
  const { name = 'World' } = req.query;
  res.status(200).send(`Hello ${name}! \'` + process.env.NPS_API_TOKEN[0] + "\'");
};