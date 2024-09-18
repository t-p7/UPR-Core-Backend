const sql = require('../../db');

const queries = {
	Count: async function (tableName) {

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

	Search: async function (tableName, fields) {
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

	Insert: async function (tableName, columns, fields) {

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

	// Update: async function (tableName, columns, fields, id, id_column) {
	// 	// Retrieve column types from the database
	// 	const column_types_result = await sql`
	// 		SELECT STRING_AGG(DATA_TYPE, ',' ORDER BY ORDINAL_POSITION ASC) 
	// 		AS COLUMN_TYPES
	// 		FROM INFORMATION_SCHEMA.COLUMNS
	// 		WHERE TABLE_NAME = ${sql.unsafe(tableName)}
	// 	`;
	
	// 	// Ensure that the result is not null and is an array
	// 	if (column_types_result && column_types_result[0] && column_types_result[0].column_types) {
	// 		const columns_types = column_types_result[0].column_types.toString().split(",");
	
	// 		let query = `UPDATE "${sql.unsafe(tableName)}" SET `;
	
	// 		for (let i = 0; i < fields.length - 1; i++) {
	// 			query += `${sql.unsafe(columns[i])} = `;
	
	// 			if (columns_types[i] === "text") {
	// 				query += `'${sql.unsafe(fields[i])}'`;
	// 			} else {
	// 				query += `${sql.unsafe(fields[i])}`;
	// 			}
	
	// 			query += `, `;
	// 		}
	
	// 		// Handle the last field
	// 		if (columns_types[fields.length - 1] === "text") {
	// 			query += `${sql.unsafe(columns[fields.length - 1])} = '${sql.unsafe(fields[fields.length - 1])}'`;
	// 		} else {
	// 			query += `${sql.unsafe(columns[fields.length - 1])} = ${sql.unsafe(fields[fields.length - 1])}`;
	// 		}
	
	// 		// Add the WHERE clause
	// 		query += ` WHERE ${sql.unsafe(id_column)} = ${sql.unsafe(id)};`;
	
	// 		// Execute the query
	// 		const result = await sql`${sql.unsafe(query)}`;
	// 		if (result.length === 0) {
	// 			return null;
	// 		} else {
	// 			return result;
	// 		}
	// 	} else {
	// 		throw new Error("Could not retrieve column types for the table.");
	// 	}
	// },
	Update: async function (tableName, columns, fields, id, id_column) {
		// Retrieve column types from the database
		const column_types_result = await sql`
			SELECT STRING_AGG(DATA_TYPE, ',' ORDER BY ORDINAL_POSITION ASC) 
			AS COLUMN_TYPES
			FROM INFORMATION_SCHEMA.COLUMNS
			WHERE TABLE_NAME = ${tableName}  -- No unsafe usage here, let postgres handle the table name
		`;
	
		// Ensure that the result is not null and is an array
		if (column_types_result && column_types_result[0] && column_types_result[0].column_types) {
			const columns_types = column_types_result[0].column_types.toString().split(",");
	
			let query = `UPDATE "${tableName}" SET `;  // Use quotes for the table name to handle case sensitivity
	
			for (let i = 0; i < fields.length - 1; i++) {
				query += `"${columns[i]}" = `;  // Quote the column names to preserve case sensitivity
	
				if (columns_types[i] === "text") {
					query += `'${fields[i]}'`;  // Properly handle text data type
				} else {
					query += `${fields[i]}`;  // Handle other data types
				}
	
				query += `, `;
			}
	
			// Handle the last field
			if (columns_types[fields.length - 1] === "text") {
				query += `"${columns[fields.length - 1]}" = '${fields[fields.length - 1]}'`;
			} else {
				query += `"${columns[fields.length - 1]}" = ${fields[fields.length - 1]}`;
			}
	
			// Add the WHERE clause
			query += ` WHERE "${id_column}" = '${id}';`;  // Quote id_column and handle id properly
	
			// Execute the query
			const result = await sql.unsafe(query);  // Use unsafe only for the entire query string
			if (result.length === 0) {
				return null;
			} else {
				return result;
			}
		} else {
			throw new Error("Could not retrieve column types for the table.");
		}
	},
	

	// GetColumns: async function (tableName) {
	// 	const query = await sql`SELECT STRING_AGG(COLUMN_NAME, ',' ORDER BY ORDINAL_POSITION ASC) AS COLUMNS
	// 							FROM INFORMATION_SCHEMA.COLUMNS
	// 							WHERE LOWER(TABLE_NAME) = LOWER(${tableName})`;
	  
	// 	if (!query[0] || !query[0].columns) {
	// 	  throw new Error(`No columns found for table ${tableName}`);
	// 	}
	  
	// 	return query[0].columns.split(",");
	//   },
	GetColumns: async function (tableName) {
		console.log(`Fetching columns for table: ${tableName}`);  // Debugging log to check table name
	
		// Ensure we handle case-sensitivity correctly with double quotes
		const query = await sql`SELECT STRING_AGG(COLUMN_NAME, ',' ORDER BY ORDINAL_POSITION ASC) AS COLUMNS
			FROM INFORMATION_SCHEMA.COLUMNS
			WHERE TABLE_NAME = ${tableName}`;
	
		if (query && query.length > 0 && query[0].columns) {
			console.log(`Columns found for table ${tableName}: ${query[0].columns}`);  // Debugging log to check found columns
			return query[0].columns.split(",");
		} else {
			throw new Error(`No columns found for table ${tableName}`);
		}
	},
	
	  

	GetTextColumns: async function (tableName) {
		query = await sql`SELECT STRING_AGG(COLUMN_NAME, ','  ORDER BY ORDINAL_POSITION ASC) 
		AS COLUMNS 
		FROM INFORMATION_SCHEMA.COLUMNS 
		WHERE TABLE_NAME = '${sql.unsafe(tableName)}' 
		AND DATA_TYPE = 'text';`

		return query[0].columns.split(",");
	},

	GetPrimaryKey: async function (tableName) {
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

	GetAllInfo: async function (tableName) {

		return [tableName, await this.GetPrimaryKey(tableName),
			await this.GetColumns(tableName), await this.Count(tableName)];
	},

	GetNumber: async function (string) {
		// return String(string).match(/^(?!-0?(\.0+)?$)-?(0|[1-9]\d*)?(\.\d+)?(?<=\d)/);
		if (string === null || string === undefined || string.trim() === '') {
			return null;
		}
		const match = String(string).match(/[\d.]+/);
		return match ? parseFloat(match[0]) : null;
	},

	GetInt: async function (string) {
		return String(string).match(/\b[0-9]+\b/);
	}

}


module.exports = queries;