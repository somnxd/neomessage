const fs = require("fs");

if (!fs.readFileSync("./messages.json").length)
	fs.writeFileSync("./messages.json", "[]");

/**
 * @returns {object[]}
 */
function all()
{
	return JSON.parse(fs.readFileSync("./messages.json"));
}

/**
 * @param {object} message
 * @returns {void}
 */
function save(message)
{
	const messages = all();
	messages.push(message);

	fs.writeFileSync("./messages.json", JSON.stringify(messages));
}

module.exports = { all, save };
