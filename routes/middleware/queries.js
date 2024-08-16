const sql = require('../../db');

const queries = {
	Count : async function(tableName) {
		
		idName = await this.GetPrimaryKey(tableName);

		if (idName.length === 0) {
			return null;
		}

		count = await sql`SELECT MAX("${sql.unsafe(idName)}") FROM "${sql.unsafe(tableName)}";`;
		
		if (count.length === 0) {
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

		for (i = 0; i < fields.length - 1; i++) {
			query = query + `'${fields[i]}' in (`;
			for (j = 0; j < columns.length - 1; j++) {
				
				query = query + `CAST("${tableName}"."${columns[j]}" AS text), `

			}

			query = query + `CAST("${tableName}"."${columns[columns.length - 1]}" AS text)`

			query = query + `) AND `
		}

		query = query + ` '${fields[fields.length - 1]}' in (`;
			for (j = 0; j < columns.length - 1; j++) {
				
				query = query + `CAST("${tableName}"."${columns[j]}" AS text), `

			}
		query = query + `CAST("${tableName}"."${columns[columns.length - 1]}" AS text))`
		
		
		query = query + `;`;

		init_query = query.toString();


		search = await sql`${sql.unsafe(init_query)}`;

		if (search.length === 0) {
			return null;
		}

		else {
			return search;
		}
	},

	Insert : async function(tableName, columns, fields) {

		column_types = await sql`SELECT STRING_AGG(DATA_TYPE, ',' ORDER BY ORDINAL_POSITION ASC) 
		AS COLUMN_TYPES
		FROM INFORMATION_SCHEMA.COLUMNS
		WHERE TABLE_NAME = '${sql.unsafe(tableName)}'`;


		column_types = column_types[0].column_types.toString().split(",");
		
		query = `INSERT INTO "${tableName}" (`;

		for (i = 0; i < columns.length - 1; i++) {
			query = query + `"${columns[i]}",`;
		}

		query = query + `"${columns[columns.length - 1]}"`;

		query = query + `) VALUES (`;

		for (i = 0; i < fields.length - 1; i++) {
			if (column_types[i] === "text") {
				query = query + `'${fields[i]}', `;
			}

			else {
				query = query + `${fields[i]}, `;
			}
			
		}

		if (column_types[fields.length - 1] === "text") {
				query = query + `'${fields[fields.length - 1]}'`;
			}

		else {
			query = query + `${fields[fields.length - 1]}`;
		}

		query = query + `);`;

		init_query = query.toString();

		insert = await sql`${sql.unsafe(init_query)}`;

		if (insert.length === 0) {
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

		if (query.length === 0) {
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