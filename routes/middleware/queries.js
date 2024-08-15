const sql = require('../../db');

const queries = {
	Count : async function(tableName) {
		
		idName = await this.GetPrimaryKey(tableName);

		if (idName.Length === 0) {
			return null;
		}

		count = await sql`SELECT MAX("${sql.unsafe(idName)}") FROM "${sql.unsafe(tableName)}";`;
		
		if (count.Length === 0) {
			return 1;
		}

		else {
			return count[0].max + 1;
		}
		
	},

	Search : async function(tableName, fields) {
		columns = await this.GetColumns(tableName);

		query = `SELECT * FROM "${tableName}"
		WHERE `;

		for (i = 0; i < fields.Length - 1; i++) {
			query = query + `'${fields[i]}' in (`;
			for (j = 0; j < columns_init.Length - 1; j++) {
				
				query = query + `CAST("${tableName}"."${columns[j]}" AS text), `

			}

			query = query + `CAST("${tableName}"."${columns[columns.Length - 1]}" AS text)`

			query = query + `) AND `
		}

		query = query + ` '${fields[fields.Legnth - 1]}' in (`;
			for (j = 0; j < columns.Length - 1; j++) {
				
				query = query + `CAST("${tableName}"."${columns[j]}" AS text), `

			}
		query = query + `CAST("${tableName}"."${columns[columns.Length - 1]}" AS text))`
		
		
		query = query + `;`;

		return query;

		

		search = await sql`${sql.unsafe(query)}`;

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

		insert = await sql`${sql.unsafe(query)}`;

		if (insert.Length === 0) {
			return null;
		}

		else {
			return insert;
		}

	},

	GetColumns : async function(tableName) {
		const query = await sql`SELECT STRING_AGG(COLUMN_NAME, ',') AS COLUMNS
		FROM INFORMATION_SCHEMA.COLUMNS
		WHERE TABLE_NAME = '${sql.unsafe(tableName)}'`;

		return query[0].columns.split(",");
	},

	GetTextColumns : async function(tableName) {
		query = await sql`SELECT STRING_AGG(COLUMN_NAME, ',') 
		AS COLUMNS 
		FROM INFORMATION_SCHEMA.COLUMNS 
		WHERE TABLE_NAME = '${sql.unsafe(tableName)}' 
		AND DATA_TYPE = 'text';`

		return query[0].columns.split(",");
	},

	GetPrimaryKey : async function(tableName) {
		query = await sql`select C.COLUMN_NAME AS column FROM
			INFORMATION_SCHEMA.TABLE_CONSTRAINTS T
			JOIN INFORMATION_SCHEMA.CONSTRAINT_COLUMN_USAGE C
			ON C.CONSTRAINT_NAME=T.CONSTRAINT_NAME
			WHERE
			C.TABLE_NAME='${sql.unsafe(tableName)}'
			and T.CONSTRAINT_TYPE='PRIMARY KEY'`;

		if (query.Length === 0) {
			return null;
		}

		else {
			return query[0].column;
		}
		
	},

	GetAllInfo : async function(tableName) {

		return [tableName, await this.GetPrimaryKey(tableName), 
		await this.GetColumns(tableName), await this.Count(tableName)];
	}

}


module.exports = queries;