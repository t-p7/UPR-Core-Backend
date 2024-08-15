const sql = require('../../db');

const queries = {
	Count : async function(tableName) {
		
		idName = this.GetPrimaryKey(tableName);

		if (idName.Length === 0) {
			return null;
		}

		count = await sql`SELECT MAX("${idName}") FROM "${tableName}";`;
		
		if (count.Length === 0) {
			return 1;
		}

		else {
			return count[0].max + 1;
		}
		
	},

	Search : async function(tableName, fields) {
		query = `SELECT * FROM "${tableName}"
		WHERE `;

		for (i = 0; i < fields.Length - 1; i++) {
			query = query + `"${fields[i]}" in (
			SELECT * FROM INFORMATION_SCHEMA.COLUMNS WHERE TABLE_NAME = '${tableName}'
			) AND `;
		}

		query = query + `"${fields[fields.Length - 1]}" in 
		(SELECT * FROM INFORMATION_SCHEMA.COLUMNS WHERE TABLE_NAME = '${tableName}')`;
		
		query = query + `;`;

		search = sql`${query}`;

		if (search.Length === 0) {
			return null;
		}

		else {
			return search;
		}
	},

	Insert : async function(tableName, columns, fields) {

		query = `INSERT INTO ${tableName} (`;

		for (i = 0; i < columns.Length - 1; i++) {
			query = query + `"${columns[0]}",`;
		}

		query = query + `"${columns[columns.Length - 1]}"`;

		query = query + `) VALUES (`;

		for (i = 0; i < fields.Length - 1; i++) {
			query = query + `${fields[i]}, `;
		}

		query = query + `${fields[fields.Length - 1]}`;
		query = query + `);`;

		insert = sql`${query}`;

		if (insert.Length === 0) {
			return null;
		}

		else {
			return insert;
		}

	},

	GetColumns : async function(tableName) {
		query = sql`SELECT STRING_AGG(COLUMN_NAME, ',')
		AS COLUMNS
		FROM INFORMATION_SCHEMA.COLUMNS
		WHERE TABLE_NAME = '${tableName}'`;

		columns = query[0].columns.split(",");

		return query[0].columns.split(",");
	},

	GetPrimaryKey : async function(tableName) {
		query = sql`select C.COLUMN_NAME AS column FROM
			INFORMATION_SCHEMA.TABLE_CONSTRAINTS T
			JOIN INFORMATION_SCHEMA.CONSTRAINT_COLUMN_USAGE C
			ON C.CONSTRAINT_NAME=T.CONSTRAINT_NAME
			WHERE
			C.TABLE_NAME='${tableName}'
			and T.CONSTRAINT_TYPE='PRIMARY KEY'`;

		if (query.Length === 0) {
			return null;
		}

		else {
			return query[0].column;
		}
		
	},

	GetAllInfo : async function(tableName) {

		return [tableName, this.GetPrimaryKey(tableName), 
		this.GetColumns(tableName), this.Count(tableName)];
	}

}


module.exports = queries;