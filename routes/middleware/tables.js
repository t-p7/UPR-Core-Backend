const sql = require('../../db');

module.exports = class Table {
	constructor(table_info) {
		this.TableName = table_info[0];
		this.PrimaryKey = table_info[1];
		this.Columns = table_info[2];
		this.Count = table_info[3];
	}

	AddCount() {
		this.Count++;
	}
}
