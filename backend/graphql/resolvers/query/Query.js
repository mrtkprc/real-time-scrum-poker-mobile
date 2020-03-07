const Query = {
	participant: (parent, args, ctx) => {
		return {id: "1", nickname: "mrtkprc", session_number: 5004}
	},
	session: (parent, args, ctx) => {
		return {id: 1, description: "Session Query Result"}
	},
	manager: (parent, args, ctx) => {
		return {id: 1, nickname: "mymanager"}
	}
};

module.exports = Query;
