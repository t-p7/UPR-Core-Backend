// var express = require('express');
// var router = express.Router();
// const sql = require('../db');
// const queries = require('./middleware/queries');
// const Table = require('./middleware/tables');

// router.post("/edit/furniture/:id", async function (req, res) {
// 	console.log("Request body:", req.body);
// 	// Ensure we are getting UPIC from the correct structure in req.body

// 	// const searchResponse = await fetch(`http://localhost:4000/search/${req.params.id}`, {
// 	// 	method: "get",
// 	// 	headers: {
// 	// 		'Content-Type': 'application/json',
// 	// 	},
// 	// });

// 	// const results = await searchResponse.json();
// 	// console.log("API response results:", results); // Debugging line


// 	// // Check if the response has the correct structure
// 	// if (!results || !results.search || !results.search[0]) {
// 	// 	console.log("No search data found:", results); // Debugging line
// 	// 	return res.status(404).json({ message: "Furniture not found." });
// 	// }

// 	// // If results.search[0] exists, use it
// 	// const searchItem = results.search[0];


// 	try {
// 		try {
// 			const searchResponse = await fetch(`http://localhost:4000/search/${req.params.id}`, {
// 				method: "get",
// 				headers: {
// 					'Content-Type': 'application/json',
// 				},
// 			});

// 			const results = await searchResponse.json();
// 			console.log("API response results:", results); // Debugging line


// 			// Check if the response has the correct structure
// 			if (!results || !results.search || !results.search[0]) {
// 				console.log("No search data found:", results); // Debugging line
// 				return res.status(404).json({ message: "Furniture not found." });
// 			}

// 			// If results.search[0] exists, use it
// 			const searchItem = results.search[0];

// 			// Now continue with the logic using searchItem
// 			const countries = new Table(await queries.GetAllInfo("Countries"));
// 			let country_id = countries.Count;

// 			if (req.body.Country != searchItem.CountryName) {
// 				const country_check = await queries.Search(countries.TableName, [req.body.Country]);

// 				if (country_check === null) {
// 					await queries.Insert(countries.TableName, countries.Columns, [country_id, req.body.Country]);
// 				} else {
// 					country_id = country_check[0].CountryID;
// 				}
// 			} else {
// 				country_id = searchItem.CountryID;
// 			}

// 			//Origin
// 			origin = new Table(await queries.GetAllInfo("Origin"));

// 			origin_id = origin.Count;

// 			if (req.body.search.Origin_of_Imported_Products != search[0].Origin_of_Imported_Products ||
// 				req.body.search.Australian_Made != search[0].Australian_Made || req.body.search.Product_of_Australia != search[0].Product_of_Australia ||
// 				req.body.search.SME != search[0].SME || req.body.search.Aboriginal_TorresStraitIslander_Content != search[0].Aboriginal_TorresStraitIslander_Content ||
// 				req.body.search.Recycled_Content != search[0].Recycled_Content) {

// 				origin_check = await queries.Search(origin.TableName, [req.body.search.Origin_of_Imported_Products,
// 				req.body.search.Australian_Made, req.body.Product_of_Australia,
// 				req.body.search.SME, req.body.search.Aboriginal_TorresStraitIslander_Content,
// 				req.body.search.Recycled_Content]);

// 				if (origin_check === null) {
// 					// console.log("Inserting into Origin table with values:", [
// 					// 	origin_id,
// 					// 	req.body.search.Origin_of_Imported_Products,
// 					// 	req.body.search.Australian_Made, req.body.search.Product_of_Australia,
// 					// 	req.body.search.SME, req.body.search.Aboriginal_TorresStraitIslander_Content,
// 					// 	req.body.search.Recycled_Content
// 					// ]);

// 					await queries.Insert(origin.TableName, origin.Columns, [origin_id, country_id,
// 						req.body.search.Origin_of_Imported_Products,
// 						req.body.search.Australian_Made, req.body.search.Product_of_Australia,
// 						req.body.search.SME, req.body.search.Aboriginal_TorresStraitIslander_Content,
// 						req.body.search.Recycled_Content]);
// 				}

// 				else {
// 					origin_id = origin_check[0].OriginID;
// 				}

// 			}

// 			else {
// 				origin_id = search[0].OriginID;
// 			}

// 			// Continue with the rest of your logic...
// 		} catch (error) {
// 			console.error("Error in /edit/furniture route:", error);
// 			return res.status(500).json({ message: "Internal server error" });
// 		}




// 		//Manufacturer
// 		manufacturer = new Table(await queries.GetAllInfo("Manufacturer"));

// 		manufacturer_id = manufacturer.Count;


// 		if (req.body.search.ManufacturerName != search[0].ManufacturerName) {
// 			manufacturer_check = await queries.Search(manufacturer.TableName, [req.body.Manufacturer]);

// 			if (manufacturer_check === null) {
// 				await queries.Insert(manufacturer.TableName, manufacturer.Columns, [manufacturer_id,
// 					req.body.search.Manufacturer]);
// 			}

// 			else {
// 				manufacturer_id = manufacturer_check[0].ManufacturerID;
// 			}
// 		}


// 		else {
// 			manufacturer_id = search[0].ManufacturerID;
// 		}


// 		//Testing Agency
// 		// Declare testing_check before the if block
// 		let testing_check = null;

// 		//Testing Agency
// 		const testing = new Table(await queries.GetAllInfo("Testing_Agency"));
// 		let testing_id = testing.Count;

// 		if (req.body.Testing_Agency != search[0].Testing_Agency) {
// 			testing_check = await queries.Search(testing.TableName, [req.body.Testing_Agency]);

// 			if (testing_check === null) {
// 				await queries.Insert(testing.TableName, testing.Columns, [testing_id, req.body.Testing_Agency]);
// 			} else {
// 				testing_id = testing_check[0].Testing_AgencyID;
// 			}
// 		} else {
// 			// Ensure to fall back to `search[0].Testing_AgencyID` when no change is needed
// 			testing_id = search[0].Testing_AgencyID;
// 		}


// 		//Certification
// 		certification = new Table(await queries.GetAllInfo("Certification"));

// 		certification_id = certification.Count;

// 		if (req.body.Other_Certificates != search[0].Other_Certificates || req.body.E0_Certified != search[0].E0_Certified ||
// 			req.body.Timber_Certified != search[0].Timber_Certified || req.body.Other_VOCs_Hazardous_Substances != search[0].Other_VOCs_Hazardous_Substances) {

// 			certification_check = await queries.Search(certification.TableName, [req.body.Other_Certificates,
// 			req.body.E0_Certified, req.body.Timber_Certified, req.body.Other_VOCs_Hazardous_Substances]);

// 			if (certification_check === null) {
// 				await queries.Insert(certification.TableName, certification.Columns, [certification_id,
// 					req.body.Other_Certificates, req.body.E0_Certified, req.body.Timber_Certified,
// 					req.body.Other_VOCs_Hazardous_Substances]);
// 			}

// 			else {
// 				certification_id = certification_check[0].CertificationID;
// 			}
// 		}

// 		else {
// 			certification_id = search[0].CertificationID;
// 		}

// 		//UPIC
// 		//UPIC

// 		// Fetch UPIC data for comparison
// 		const upic = new Table(await queries.GetAllInfo("UPIC"));
// 		let upic_id = req.body.search.UPIC;  // Use let to allow reassignment

// 		// console.log("UPIC ID is:", upic_id);  // Log the UPIC ID for debugging

// 		// Check if UPIC fields have changed before updating
// 		if (req.body.Inclusions != search[0].Inclusions ||
// 			req.body.Queensland_Made != search[0].Queensland_Made ||
// 			req.body.Indigenous_Furniture != search[0].Indigenous_Furniture) {

// 			const upic_check = await queries.Search(upic.TableName, [
// 				req.body.Inclusions,
// 				req.body.Queensland_Made,
// 				req.body.Indigenous_Furniture
// 			]);

// 			if (upic_check === null) {
// 				// Insert new values if no existing record is found
// 				await queries.Insert(upic.TableName, upic.Columns, [
// 					upic_id,
// 					req.body.Inclusions,
// 					req.body.Queensland_Made,
// 					req.body.Indigenous_Furniture
// 				]);
// 			} else {
// 				// Use the existing UPIC ID if a match is found
// 				upic_id = upic_check[0].UPIC;  // Since upic_id is now let, it can be reassigned
// 			}
// 		} else {
// 			// No change, keep the existing UPIC ID
// 			upic_id = search[0].UPIC;
// 		}





// 		//Suppliers
// 		supplier = new Table(await queries.GetAllInfo("Supplier"));

// 		supplier_id = supplier.Count;

// 		if (req.body.SupplierName != search[0].SupplierName ||
// 			req.body.ABN != search[0].ABN || req.body.Contact != search[0].Contact ||
// 			req.body.Phone != search[0].Phone || req.body.Mobile != search[0].Mobile ||
// 			req.body.Email != search[0].Phone || req.body.Website != search[0].Website) {

// 			supplier_check = await queries.Search(supplier.TableName, [req.body.SupplierName,
// 			req.body.ABN, req.body.Contact, req.body.Phone, req.body.Mobile,
// 			req.body.Mobile, req.body.Email]);

// 			if (supplier_check === null) {
// 				await queries.Insert(supplier.TableName, supplier.Columns, [supplier_id,
// 					req.body.SupplierName,
// 					req.body.ABN, req.body.Contact, req.body.Phone, req.body.Mobile,
// 					req.body.Email, req.body.Website]);
// 			}

// 			else {
// 				supplier_id = supplier_check[0].SupplierID;
// 			}
// 		}

// 		else {
// 			supplier_id = search[0].SupplierID;
// 		}


// 		//Category
// 		category = new Table(await queries.GetAllInfo("Category"));

// 		category_id = category.Count;

// 		if (req.body.CategoryName != req || req.body.CategoryDescription) {
// 			category_check = await queries.Search(category.TableName, [req.body.CategoryName,
// 			req.body.CategoryDescription]);

// 			if (category_check === null) {
// 				await queries.Insert(category.TableName, category.Columns, [category_id,
// 					req.body.CategoryName, req.body.CategoryDescription]);
// 			}

// 			else {
// 				category_id = category_check[0].CategoryID;
// 			}
// 		}

// 		else {
// 			category_id = search[0].CategoryID;
// 		}


// 		//Category2
// 		category2 = new Table(await queries.GetAllInfo("Category2"));

// 		category2_id = category2.Count;

// 		if (req.body.Category_2Name != search[0].Category_2Name) {
// 			category2_check = await queries.Search(category2.TableName, [req.body.Category_2Name,
// 			req.body.Category_2Description]);

// 			if (category2_check === null) {
// 				await queries.Insert(category2.TableName, category2.Columns, [category2_id,
// 					req.body.Category_2Name, req.body.Category_2Description, category_id]);
// 			}

// 			else {
// 				category2_id = category2_check[0].Category_2ID;
// 			}
// 		}


// 		else {
// 			category2_id = search[0].Category_2ID;
// 		}


// 		//Category3
// 		category3 = new Table(await queries.GetAllInfo("Category3"));

// 		category3_id = category3.Count;

// 		if (req.body.Category_3Name != search[0].Category_3Name) {
// 			if (category3_check === null) {
// 				await queries.Insert(category3.TableName, category3.Columns, [category3_id,
// 					req.body.Category_3Name, req.body.Category_3Description, category2_id]);
// 			}

// 			else {
// 				category3_id = category3_check[0].Category_3ID;
// 			}
// 		}

// 		else {
// 			category3_id = search[0].Category_3ID;
// 		}

// 		//Category4
// 		category4 = new Table(await queries.GetAllInfo("Category4"));

// 		category4_id = category4.Count;

// 		if (req.body.Category_4Name != search[0].Category_4Name) {
// 			category4_check = await queries.Search(category4.TableName, [req.body.Category_4Name,
// 			req.body.Category_4Description, category3_id]);

// 			if (category3_check === null) {
// 				await queries.Insert(category4.TableName, category4.Columns, [category4_id,
// 					req.body.Category_4Name, req.body.Category_4Description, category3_id]);
// 			}

// 			else {
// 				category4_id = category4_check[0].Category_4ID;
// 			}
// 		}

// 		//Colours
// 		colours = new Table(await queries.GetAllInfo("Colours"));

// 		colours_id = colours.Count;

// 		if (req.body.Colours != search[0].Colours) {
// 			colours_check = await queries.Search(colours.TableName, [req.body.Colours]);

// 			if (colours_check === null) {
// 				await queries.Insert(colours.TableName, colours.Columns, [colours_id,
// 					req.body.Colours]);
// 			}

// 			else {
// 				colours_id = colours_check[0].ColourID;
// 			}
// 		}



// 		else {
// 			colours_id = search[0].ColourID;
// 		}


// 		//AU/NZ Code
// 		aunzcode = new Table(await queries.GetAllInfo("AU/NZ_Code"));

// 		aunzcode_id = aunzcode.Count;

// 		if (req.body.AUNZ_Code != search[0].AUNZ_Code) {
// 			aunzcode_check = await queries.Search(aunzcode.TableName, [req.body.AUNZ_Code]);

// 			if (aunzcode_check === null) {
// 				await queries.Insert(aunzcode.TableName, aunzcode.Columns, [aunzcode_id,
// 					req.body.AUNZ_Code]);
// 			}

// 			else {
// 				aunzcode_id = aunzcode_check[0].AUNZ_CodeID;
// 			}
// 		}

// 		else {
// 			aunzcode_id = search[0].AUNZ_CodeID;
// 		}


// 		//Product Accreditation
// 		accredit = new Table(await queries.GetAllInfo("Product_Accreditation"));

// 		accredit_id = accredit.Count;

// 		if (req.body.Accreditation_Scheme != search[0].Accreditation_Scheme) {
// 			accredit_check = await queries.Search(accredit.TableName, [req.body.Accreditation_Scheme]);

// 			if (accredit_check === null) {
// 				await queries.Insert(accredit.TableName, accredit.Columns, [accredit_id,
// 					req.body.Accreditation_Scheme]);
// 			}

// 			else {
// 				accredit_id = accredit_check[0].Product_AccreditationID;
// 			}

// 		}

// 		else {
// 			accredit_id = search[0].Product_AccreditationID;
// 		}

// 		//Tier Pricing
// 		tier = new Table(await queries.GetAllInfo("Tier_Pricing_&_Quantity"));

// 		tier_id = tier.Count;

// 		if (req.body.Tier1_Price != search[0].Tier1_Price || req.body.Tier1_Quantity != search[0].Tier1_Quantity
// 			|| req.body.Tier2_Price != search[0].Tier2_Price || req.body.Tier2_Quantity != search[0].Tier2_Quantity
// 			|| req.body.Tier3_Price != search[0].Tier3_Price || req.body.Tier3_Quantity != search[0].Tier3_Quantity
// 			|| req.body.Tier4_Price != search[0].Tier4_Price || req.body.Tier4_Quantity != search[0].Tier4_Quantity
// 			|| req.body.Tier5_Price != search[0].Tier5_Price || req.body.Tier5_Quantity != search[0].Tier5_Quantity) {

// 			tier_check = await queries.Search(tier.TableName, [await queries.GetNumber(req.body.Tier1_Price),
// 			await queries.GetInt(req.body.Tier1_Quantity), await queries.GetNumber(req.body.Tier2_Price),
// 			await queries.GetInt(req.body.Tier2_Quantity), await queries.GetNumber(req.body.Tier3_Price),
// 			await queries.GetInt(req.body.Tier3_Quantity), await queries.GetNumber(req.body.Tier4_Price),
// 			await queries.GetInt(req.body.Tier4_Quantity), await queries.GetNumber(req.body.Tier5_Price),
// 			await queries.GetInt(req.body.Tier5_Quantity)
// 			]);

// 			if (tier_check === null) {
// 				await queries.Insert(tier.TableName, tier.Columns, [tier_id,
// 					await queries.GetNumber(req.body.Tier1_Price),
// 					await queries.GetInt(req.body.Tier1_Quantity), await queries.GetNumber(req.body.Tier2_Price),
// 					await queries.GetInt(req.body.Tier2_Quantity), await queries.GetNumber(req.body.Tier3_Price),
// 					await queries.GetInt(req.body.Tier3_Quantity), await queries.GetNumber(req.body.Tier4_Price),
// 					await queries.GetInt(req.body.Tier4_Quantity), await queries.GetNumber(req.body.Tier5_Price),
// 					await queries.GetInt(req.body.Tier5_Quantity)]);
// 			}

// 			else {
// 				tier_id = tier_check[0].TierID;
// 			}

// 		}

// 		else {
// 			tier_id = search[0].TierID;
// 		}

// 		//Details
// 		details = new Table(await queries.GetAllInfo("Details"));

// 		details_id = details.Count;

// 		if (req.body.Assembly_Required != search[0].Assembly_Required
// 			|| await queries.GetNumber(req.body.Height) != search[0].Height
// 			|| await queries.GetNumber(req.body.Width) != search[0].Width
// 			|| await queries.GetNumber(req.body.Depth) != search[0].Depth
// 			|| await queries.GetNumber(req.body.Weight) != search[0].Weight
// 			|| req.body.Material != search[0].Material
// 			|| req.body.Stackable != search[0].Stackable
// 			|| req.body.Adjustability != search[0].Adjustability
// 			|| req.body.Ergonomic != search[0].Ergonomic
// 			|| req.body.Mechanism != search[0].Mechanism
// 			|| req.body.Lumbar_Support != search[0].Lumbar_Support
// 			|| req.body.Compatible_With != search[0].Compatible_With
// 			|| req.body.Castors != search[0].Castors
// 			|| await queries.GetNumber(req.body.Lifting_Capacity) != search[0].Lifting_Capacity
// 			|| await queries.GetNumber(req.body.Max_Load_Weight) != search[0].Max_Load_Weight
// 			|| req.body.Default_Warranty != search[0].Default_Warranty) {

// 			details_check = await queries.Search(details.TableName, [colours_id,
// 				req.body.Assembly_Required, await queries.GetNumber(req.body.Height), await queries.GetNumber(req.body.Width),
// 				await queries.GetNumber(req.body.Depth), await queries.GetNumber(req.body.Weight), req.body.Material,
// 				req.body.Stackable, req.body.Adjustability, req.body.Ergonomic,
// 				req.body.Mechanism, req.body.Lumbar_Support, req.body.Compatible_With,
// 				req.body.Castors, await queries.GetNumber(req.body.Lifting_Capacity), await queries.GetNumber(req.body.Max_Load_Weight),
// 				req.body.Default_Warranty, aunzcode_id, accredit_id, req.body.Test_Certificate_Expiry]);

// 			if (details_check === null) {
// 				await queries.Insert(details.TableName, details.Columns, [details_id,
// 					colours_id,
// 					req.body.Assembly_Required, await queries.GetNumber(req.body.Height), await queries.GetNumber(req.body.Width),
// 					await queries.GetNumber(req.body.Depth), await queries.GetNumber(req.body.Weight), req.body.Material,
// 					req.body.Stackable, req.body.Adjustability, req.body.Ergonomic,
// 					req.body.Mechanism, req.body.Lumbar_Support, req.body.Compatible_With,
// 					req.body.Castors, await queries.GetNumber(req.body.Lifting_Capacity),
// 					await queries.GetNumber(req.body.Max_Load_Weight),
// 					req.body.Default_Warranty, aunzcode_id, accredit_id, req.body.Test_Certificate_Expiry]);
// 			}

// 			else {
// 				details_id = details_check[0].DetailsID;
// 			}

// 		}

// 		else {
// 			details_id = search[0].DetailsID;
// 		}

// 		//Furniture	
// 		//Furniture	
// 		try {
// 			const furniture = new Table(await queries.GetAllInfo("Furniture"));
// 			const furniture_id = req.params.id;

// 			// Safely define variables using either the request body or the current search values
// 			const productCode = req.body.search.ProductCode || search[0].ProductCode;
// 			const supplier_id = req.body.search.SupplierID || search[0].SupplierID;
// 			const origin_id = req.body.search.OriginID || search[0].OriginID;
// 			const genericDescription = req.body.search.Generic_Description || search[0].Generic_Description;
// 			const longDescription = req.body.search.Long_Description || search[0].Long_Description;
// 			const unitPrice = req.body.search.Unit_Price ? await queries.GetNumber(req.body.search.Unit_Price) : search[0].Unit_Price;
// 			const msrpPrice = req.body.search.MSRP_Price ? await queries.GetNumber(req.body.search.MSRP_Price) : search[0].MSRP_Price;
// 			const manufacturer_id = req.body.search.ManufacturerID || search[0].ManufacturerID;
// 			const testing_id = req.body.search.Testing_AgencyID || search[0].Testing_AgencyID;
// 			const certification_id = req.body.search.CertificationID || search[0].CertificationID;
// 			const details_id = req.body.search.DetailsID || search[0].DetailsID;
// 			const tier_id = req.body.search.TierID || search[0].TierID;
// 			const upic_id = req.body.search.UPIC || search[0].UPIC;

// 			// Ensure Category_4ID is only updated when necessary and valid
// 			const category4_id = req.body.search.Category_4ID && req.body.search.Category_4ID !== 27 ? req.body.search.Category_4ID : search[0].Category_4ID;



// 			// Check if any of the furniture fields have changed before updating
// 			if (
// 				productCode != search[0].ProductCode ||
// 				category4_id != search[0].Category_4ID ||
// 				supplier_id != search[0].SupplierID ||
// 				origin_id != search[0].OriginID ||
// 				genericDescription != search[0].Generic_Description ||
// 				longDescription != search[0].Long_Description ||
// 				unitPrice != search[0].Unit_Price ||
// 				msrpPrice != search[0].MSRP_Price ||
// 				upic_id != search[0].UPIC ||
// 				manufacturer_id != search[0].ManufacturerID ||
// 				testing_id != search[0].Testing_AgencyID ||
// 				certification_id != search[0].CertificationID ||
// 				details_id != search[0].DetailsID ||
// 				tier_id != search[0].TierID
// 			) {
// 				// Perform the update only if there is a change
// 				await queries.Update(
// 					furniture.TableName,
// 					furniture.Columns,
// 					[
// 						furniture_id,
// 						productCode,
// 						category4_id,
// 						supplier_id,
// 						origin_id,
// 						genericDescription,
// 						longDescription,
// 						unitPrice,
// 						msrpPrice,
// 						upic_id,  // Ensure this is updated if changed
// 						manufacturer_id,
// 						testing_id,
// 						certification_id,
// 						details_id,
// 						tier_id
// 					],
// 					furniture_id,
// 					"FurnitureID"
// 				);
// 			} else {
// 				console.log("No changes in furniture data. Skipping update.");
// 			}

// 		} catch (error) {
// 			console.error("Error updating Furniture table:", error);
// 			return res.status(500).json({ message: "Error updating Furniture data" });
// 		}


// 		//Regions
// 		//Regions
// 		// Regions
// 		const region = new Table(await queries.GetAllInfo("Regions"));
// 		const regions_list = [];
// 		const region_id_list = [];
// 		const furniture_id = req.params.id;

// 		// Log the entire request body for debugging
// 		// console.log("Full Request Body:", JSON.stringify(req.body, null, 2));

// 		// console.log("Furniture ID:", furniture_id);  // For debugging

// 		// Check if region_pricing exists in the request body
// 		if (req.body.region_pricing && req.body.region_pricing.length > 0) {
// 			// console.log("region_pricing found:", req.body.region_pricing);

// 			// If region_pricing exists, loop through and process
// 			for (let i = 0; i < req.body.region_pricing.length; i++) {
// 				regions_list.push(req.body.region_pricing[i].RegionName);
// 			}

// 			for (let i = 0; i < regions_list.length; i++) {
// 				const region_check = await queries.Search(region.TableName, [regions_list[i]]);

// 				if (region_check === null) {
// 					await queries.Insert(region.TableName, region.Columns, [region.Count + i, regions_list[i]]);
// 					region_id_list.push(region.Count + i);
// 				} else {
// 					region_id_list.push(region_check[0].RegionID);
// 				}
// 			}

// 			// Delivery & Service Region Pricing
// 			const serviceregion = new Table(await queries.GetAllInfo("Delivery_&_Service_Region_Pricing"));
// 			// console.log("Furniture ID:", furniture_id);  // For debugging

// 			// Optionally delete or update existing region pricing for the furniture item
// 			// Instead of using sql`DELETE FROM ...`, construct the query dynamically like this:
// 			await sql.unsafe(`DELETE FROM "${serviceregion.TableName}" WHERE "FurnitureID" = ${furniture_id}`);

// 			for (let i = 0; i < req.body.region_pricing.length; i++) {
// 				await queries.Insert(serviceregion.TableName, serviceregion.Columns, [
// 					region_id_list[i],
// 					req.body.region_pricing[i]["FIS/DTT/DIP"],  // FIS/DTT/DIP value
// 					req.body.region_pricing[i].Price,  // Price value
// 					serviceregion.Count,
// 					furniture_id
// 				]);
// 				serviceregion.AddCount();
// 			}
// 		} else {
// 			console.log("No service regions provided in the request.");
// 		}



// 		//Specification
// 		specification = new Table(await queries.GetAllInfo("Specification"));
// 		// console.log("Specification data:", req.body.specification);

// 		for (let i = 0; i < req.body.specification.length; i++) {
// 			const specData = req.body.specification[i];

// 			// Check if the specification already exists by ID
// 			let existingSpec = await queries.Search(specification.TableName, [specData.SpecificationID]);

// 			if (existingSpec && existingSpec.length > 0) {
// 				// If it exists, perform an update
// 				await queries.Update(specification.TableName, specification.Columns, [
// 					specData.SpecificationID,
// 					specData.SpecificationName,  // Corrected to the actual field name
// 					specData.SpecificationDescription,  // Corrected to the actual field name
// 					furniture_id,
// 					specData.Prerequisites,  // Corrected to the actual field name
// 					specData.Antirequisites  // Corrected to the actual field name
// 				], specData.SpecificationID, "SpecificationID");

// 				console.log(`Specification updated: ID ${specData.SpecificationID}`);
// 			} else {
// 				// If it doesn't exist, insert a new record
// 				await queries.Insert(specification.TableName, specification.Columns, [
// 					specification.Count + i,
// 					specData.SpecificationName,
// 					specData.SpecificationDescription,
// 					furniture_id,
// 					specData.Prerequisites,
// 					specData.Antirequisites
// 				]);
// 				specification.AddCount();
// 				console.log(`New Specification inserted: ID ${specification.Count + i}`);
// 			}
// 		}



// 		//External Link
// 		external_links = new Table(await queries.GetAllInfo("External_Links"));
// 		// console.log("External Links data:", req.body.search);  // Logging only the search part

// 		await queries.Update(external_links.TableName, external_links.Columns, [
// 			external_links.Count,
// 			req.body.search.Thumbnail,  // Corrected to access the thumbnail from the correct location
// 			req.body.search.Primary_Image,  // Ensure proper naming here
// 			req.body.search.Additional_Image,
// 			req.body.search.Additional_Image2,
// 			req.body.search.Additional_Image3,
// 			req.body.search.Additional_Image4,
// 			req.body.search.Additional_Image5,
// 			req.body.search.Further_Document1,
// 			req.body.search.Further_Document1Label,
// 			req.body.search.Further_Document2,
// 			req.body.search.Further_Document2Label,
// 			furniture_id
// 		], furniture_id, "FurnitureID");





// 		return res.status(200).json({ message: "Furniture data updated successfully" });
// 	} catch (error) {
// 		// If any error occurs, it will be caught here
// 		console.error("Error in /edit/furniture route:", error);
// 		return res.status(500).json({ message: "Internal server error" });
// 	}


// });


// module.exports = router;




var express = require('express');
var router = express.Router();
const sql = require('../db');
const queries = require('./middleware/queries');
const Table = require('./middleware/tables');

router.post("/edit/furniture/:id", async function (req, res) {
    console.log("Request body:", req.body);

    try {
        const searchResponse = await fetch(`http://localhost:4000/search/${req.params.id}`, {
            method: "get",
            headers: {
                'Content-Type': 'application/json',
            },
        });

        const results = await searchResponse.json();
        // console.log("API response results:", results); // Debugging line

        if (!results || !results.search || !results.search[0]) {
            console.log("No search data found:", results); // Debugging line
            return res.status(404).json({ message: "Furniture not found." });
        }

        const searchItem = results.search[0];

        // Country Handling
        const countries = new Table(await queries.GetAllInfo("Countries"));
        let country_id = countries.Count;

        if (req.body.search.CountryName != searchItem.CountryName) {
            const country_check = await queries.Search(countries.TableName, [req.body.search.CountryName]);

            if (country_check === null) {

                await queries.Insert(countries.TableName, countries.Columns, [country_id, req.body.search.CountryName]);
            } else {
                country_id = country_check[0].CountryID;
            }
        } else {
            country_id = searchItem.CountryID;
        }

        // Origin Handling
        const origin = new Table(await queries.GetAllInfo("Origin"));
        let origin_id = origin.Count;

        if (
            req.body.search.Origin_of_Imported_Products != searchItem.Origin_of_Imported_Products ||
            req.body.search.Australian_Made != searchItem.Australian_Made ||
            req.body.search.Product_of_Australia != searchItem.Product_of_Australia ||
            req.body.search.SME != searchItem.SME ||
            req.body.search.Aboriginal_TorresStraitIslander_Content != searchItem.Aboriginal_TorresStraitIslander_Content ||
            req.body.search.Recycled_Content != searchItem.Recycled_Content
        ) {
            const origin_check = await queries.Search(origin.TableName, [
                req.body.search.Origin_of_Imported_Products,
                req.body.search.Australian_Made,
                req.body.search.Product_of_Australia,
                req.body.search.SME,
                req.body.search.Aboriginal_TorresStraitIslander_Content,
                req.body.search.Recycled_Content,
            ]);

            if (origin_check === null) {
                await queries.Insert(origin.TableName, origin.Columns, [
                    origin_id,
                    country_id,
                    req.body.search.Origin_of_Imported_Products,
                    req.body.search.Australian_Made,
                    req.body.search.Product_of_Australia,
                    req.body.search.SME,
                    req.body.search.Aboriginal_TorresStraitIslander_Content,
                    req.body.search.Recycled_Content,
                ]);
            } else {
                origin_id = origin_check[0].OriginID;
            }
        } else {
            origin_id = searchItem.OriginID;
        }

        // Manufacturer Handling
        const manufacturer = new Table(await queries.GetAllInfo("Manufacturer"));
        let manufacturer_id = manufacturer.Count;

        if (req.body.search.ManufacturerName != searchItem.ManufacturerName) {
            const manufacturer_check = await queries.Search(manufacturer.TableName, [req.body.search.ManufacturerName]);

            if (manufacturer_check === null) {
                await queries.Insert(manufacturer.TableName, manufacturer.Columns, [
                    manufacturer_id,
                    req.body.search.ManufacturerName,
                ]);
            } else {
                manufacturer_id = manufacturer_check[0].ManufacturerID;
            }
        } else {
            manufacturer_id = searchItem.ManufacturerID;
        }

        // Testing Agency Handling
        const testing = new Table(await queries.GetAllInfo("Testing_Agency"));
        let testing_id = testing.Count;

        if (req.body.search.Testing_AgencyName != searchItem.Testing_AgencyName) {
            const testing_check = await queries.Search(testing.TableName, [req.body.search.Testing_AgencyName]);


            if (testing_check === null) {
                await queries.Insert(testing.TableName, testing.Columns, [testing_id, req.body.search.Testing_AgencyName]);
            } else {
                testing_id = testing_check[0].Testing_AgencyID;
            }
        } else {
            testing_id = searchItem.Testing_AgencyID;
        }

        // Certification Handling
        const certification = new Table(await queries.GetAllInfo("Certification"));
        let certification_id = certification.Count;

        if (
            req.body.search.Other_Certificates != searchItem.Other_Certificates ||
            req.body.search.E0_Certified != searchItem.E0_Certified ||
            req.body.search.Timber_Certified != searchItem.Timber_Certified ||
            req.body.search.Other_VOCs_Hazardous_Substances != searchItem.Other_VOCs_Hazardous_Substances
        ) {
            const certification_check = await queries.Search(certification.TableName, [
                req.body.search.Other_Certificates,
                req.body.search.E0_Certified,
                req.body.search.Timber_Certified,
                req.body.search.Other_VOCs_Hazardous_Substances,
            ]);

            if (certification_check === null) {
                await queries.Insert(certification.TableName, certification.Columns, [
                    certification_id,
                    req.body.search.Other_Certificates,
                    req.body.search.E0_Certified,
                    req.body.search.Timber_Certified,
                    req.body.search.Other_VOCs_Hazardous_Substances,
                ]);
            } else {
                certification_id = certification_check[0].CertificationID;
            }
        } else {
            certification_id = searchItem.CertificationID;
        }

        // UPIC Handling
        const upic = new Table(await queries.GetAllInfo("UPIC"));
        let upic_id = req.body.search.UPIC;

        if (
            req.body.search.Inclusions != searchItem.Inclusions ||
            req.body.search.Queensland_Made != searchItem.Queensland_Made ||
            req.body.search.Indigenous_Furniture != searchItem.Indigenous_Furniture
        ) {
            const upic_check = await queries.Search(upic.TableName, [
                req.body.search.Inclusions,
                req.body.search.Queensland_Made,
                req.body.search.Indigenous_Furniture,
            ]);

            if (upic_check === null) {
                await queries.Insert(upic.TableName, upic.Columns, [
                    upic_id,
                    req.body.search.Inclusions,
                    req.body.search.Queensland_Made,
                    req.body.search.Indigenous_Furniture,
                ]);
            } else {
                upic_id = upic_check[0].UPIC;
            }
        } else {
            upic_id = searchItem.UPIC;
        }

        // Supplier Handling
        const supplier = new Table(await queries.GetAllInfo("Supplier"));
        let supplier_id = supplier.Count;

        if (
            req.body.search.SupplierName != searchItem.SupplierName ||
            req.body.search.ABN != searchItem.ABN ||
            req.body.search.Contact != searchItem.Contact ||
            req.body.search.Phone != searchItem.Phone ||
            req.body.search.Mobile != searchItem.Mobile ||
            req.body.search.Email != searchItem.Email ||
            req.body.search.Website != searchItem.Website
        ) {
            const supplier_check = await queries.Search(supplier.TableName, [
                req.body.search.SupplierName,
                req.body.search.ABN,
                req.body.search.Contact,
                req.body.search.Phone,
                req.body.search.Mobile,
                req.body.search.Email,
            ]);

            if (supplier_check === null) {
                await queries.Insert(supplier.TableName, supplier.Columns, [
                    supplier_id,
                    req.body.search.SupplierName,
                    req.body.search.ABN,
                    req.body.search.Contact,
                    req.body.search.Phone,
                    req.body.search.Mobile,
                    req.body.search.Email,
                    req.body.search.Website,
                ]);
            } else {
                supplier_id = supplier_check[0].SupplierID;
            }
        } else {
            supplier_id = searchItem.SupplierID;
        }

        // Category Handling
        const category = new Table(await queries.GetAllInfo("Category"));
        let category_id = category.Count;

        if (req.body.search.CategoryName != searchItem.CategoryName || req.body.search.CategoryDescription != searchItem.CategoryDescription) {
            const category_check = await queries.Search(category.TableName, [
                req.body.search.CategoryName,
                req.body.search.CategoryDescription,
            ]);

            if (category_check === null) {
                await queries.Insert(category.TableName, category.Columns, [
                    category_id,
                    req.body.search.CategoryName,
                    req.body.search.CategoryDescription,
                ]);
            } else {
                category_id = category_check[0].CategoryID;
            }
        } else {
            category_id = searchItem.CategoryID;
        }

        // Category2 Handling
        const category2 = new Table(await queries.GetAllInfo("Category2"));
        let category2_id = category2.Count;

        if (req.body.search.Category_2Name != searchItem.Category_2Name) {
            const category2_check = await queries.Search(category2.TableName, [
                req.body.search.Category_2Name,
                req.body.search.Category_2Description,
            ]);

            if (category2_check === null) {
                await queries.Insert(category2.TableName, category2.Columns, [
                    category2_id,
                    req.body.search.Category_2Name,
                    req.body.search.Category_2Description,
                    category_id,
                ]);
            } else {
                category2_id = category2_check[0].Category_2ID;
            }
        } else {
            category2_id = searchItem.Category_2ID;
        }

        // Category3 Handling
        const category3 = new Table(await queries.GetAllInfo("Category3"));
        let category3_id = category3.Count;

        if (req.body.search.Category_3Name != searchItem.Category_3Name) {
            const category3_check = await queries.Search(category3.TableName, [
                req.body.search.Category_3Name,
                req.body.search.Category_3Description,
                category2_id,
            ]);

            if (category3_check === null) {
                await queries.Insert(category3.TableName, category3.Columns, [
                    category3_id,
                    req.body.search.Category_3Name,
                    req.body.search.Category_3Description,
                    category2_id,
                ]);
            } else {
                category3_id = category3_check[0].Category_3ID;
            }
        } else {
            category3_id = searchItem.Category_3ID;
        }

        // Category4 Handling
        const category4 = new Table(await queries.GetAllInfo("Category4"));
        let category4_id = category4.Count;

        if (req.body.search.Category_4Name != searchItem.Category_4Name) {
            const category4_check = await queries.Search(category4.TableName, [
                req.body.search.Category_4Name,
                req.body.search.Category_4Description,
                category3_id,
            ]);

            if (category4_check === null) {
                await queries.Insert(category4.TableName, category4.Columns, [
                    category4_id,
                    req.body.search.Category_4Name,
                    req.body.search.Category_4Description,
                    category3_id,
                ]);
            } else {
                category4_id = category4_check[0].Category_4ID;
            }
        } else {
            category4_id = searchItem.Category_4ID;
        }

        // Colours Handling
        const colours = new Table(await queries.GetAllInfo("Colours"));
        let colours_id = colours.Count;

        if (req.body.search.ColourID != searchItem.ColourID) {
            const colours_check = await queries.Search(colours.TableName, [req.body.search.ColourID]);

            if (colours_check === null) {
                await queries.Insert(colours.TableName, colours.Columns, [colours_id, req.body.search.ColourID]);
            } else {
                colours_id = colours_check[0].ColourID;
            }
        } else {
            colours_id = searchItem.ColourID;
        }

        // Furniture Handling
        const furniture = new Table(await queries.GetAllInfo("Furniture"));
        const furniture_id = req.params.id;

        const productCode = req.body.search.ProductCode || searchItem.ProductCode;
        const supplierID = req.body.search.SupplierID || searchItem.SupplierID;
        const originID = req.body.search.OriginID || searchItem.OriginID;
        const genericDescription = req.body.search.Generic_Description || searchItem.Generic_Description;
        const longDescription = req.body.search.Long_Description || searchItem.Long_Description;
        const unitPrice = req.body.search.Unit_Price || searchItem.Unit_Price;
        const msrpPrice = req.body.search.MSRP_Price || searchItem.MSRP_Price;
        const manufacturerID = req.body.search.ManufacturerID || searchItem.ManufacturerID;
        const testingAgencyID = req.body.search.Testing_AgencyID || searchItem.Testing_AgencyID;
        const certificationID = req.body.search.CertificationID || searchItem.CertificationID;
        const detailsID = req.body.search.DetailsID || searchItem.DetailsID;
        const tierID = req.body.search.TierID || searchItem.TierID;
        const upicID = req.body.search.UPIC || searchItem.UPIC;
        const category4ID = req.body.search.Category_4ID || searchItem.Category_4ID;

        // Check if any fields changed before updating furniture
        if (
            productCode != searchItem.ProductCode ||
            category4ID != searchItem.Category_4ID ||
            supplierID != searchItem.SupplierID ||
            originID != searchItem.OriginID ||
            genericDescription != searchItem.Generic_Description ||
            longDescription != searchItem.Long_Description ||
            unitPrice != searchItem.Unit_Price ||
            msrpPrice != searchItem.MSRP_Price ||
            upicID != searchItem.UPIC ||
            manufacturerID != searchItem.ManufacturerID ||
            testingAgencyID != searchItem.Testing_AgencyID ||
            certificationID != searchItem.CertificationID ||
            detailsID != searchItem.DetailsID ||
            tierID != searchItem.TierID
        ) {
            await queries.Update(furniture.TableName, furniture.Columns, [
                furniture_id,
                productCode,
                category4ID,
                supplierID,
                originID,
                genericDescription,
                longDescription,
                unitPrice,
                msrpPrice,
                upicID,
                manufacturerID,
                testingAgencyID,
                certificationID,
                detailsID,
                tierID,
            ], furniture_id, "FurnitureID");
        } else {
            console.log("No changes in furniture data. Skipping update.");
        }

        // Add similar logic for the rest of the sections: Regions, Specifications, External Links, etc.
        // Regions Handling
        const region = new Table(await queries.GetAllInfo("Regions"));
        const region_id_list = [];

        // Check if region_pricing exists in the request body
        if (req.body.region_pricing && req.body.region_pricing.length > 0) {
            for (let i = 0; i < req.body.region_pricing.length; i++) {
                const regionName = req.body.region_pricing[i].RegionName;

                const region_check = await queries.Search(region.TableName, [regionName]);

                if (region_check === null) {
                    // Insert new region
                    await queries.Insert(region.TableName, region.Columns, [region.Count + i, regionName]);
                    region_id_list.push(region.Count + i); // Add new ID to list
                } else {
                    region_id_list.push(region_check[0].RegionID); // Use existing ID
                }
            }

            // Delivery & Service Region Pricing
            const serviceregion = new Table(await queries.GetAllInfo("Delivery_&_Service_Region_Pricing"));

            // Optionally delete or update existing region pricing for the furniture item
            await sql.unsafe(`DELETE FROM "${serviceregion.TableName}" WHERE "FurnitureID" = ${furniture_id}`);

            // Insert updated service regions
            for (let i = 0; i < req.body.region_pricing.length; i++) {
                await queries.Insert(serviceregion.TableName, serviceregion.Columns, [
                    region_id_list[i],
                    req.body.region_pricing[i]["FIS/DTT/DIP"],  // FIS/DTT/DIP value
                    req.body.region_pricing[i].Price,           // Price value
                    serviceregion.Count,
                    furniture_id
                ]);
                serviceregion.AddCount();
            }
        } else {
            console.log("No service regions provided in the request.");
        }

        // Specification Handling
        const specification = new Table(await queries.GetAllInfo("Specification"));

        for (let i = 0; i < req.body.specification.length; i++) {
            const specData = req.body.specification[i];

            const existingSpec = await queries.Search(specification.TableName, [specData.SpecificationID]);

            if (existingSpec && existingSpec.length > 0) {
                // Update if specification exists
                await queries.Update(specification.TableName, specification.Columns, [
                    specData.SpecificationID,
                    specData.SpecificationName,
                    specData.SpecificationDescription,
                    furniture_id,
                    specData.Prerequisites,
                    specData.Antirequisites
                ], specData.SpecificationID, "SpecificationID");
            } else {
                // Insert if specification does not exist
                await queries.Insert(specification.TableName, specification.Columns, [
                    specification.Count + i,
                    specData.SpecificationName,
                    specData.SpecificationDescription,
                    furniture_id,
                    specData.Prerequisites,
                    specData.Antirequisites
                ]);
                specification.AddCount();
            }
        }










        // AUNZ_Code Handling
        const aunzcode = new Table(await queries.GetAllInfo("AU/NZ_Code"));
        let aunzcode_id = searchItem.AUNZ_CodeID; // Start with the existing AUNZ_CodeID from searchItem

        if (req.body.search.AUNZ_Code && req.body.search.AUNZ_Code !== searchItem.AUNZ_Code) {
            const aunzcode_check = await queries.Search(aunzcode.TableName, [req.body.search.AUNZ_Code]);

            if (aunzcode_check === null || aunzcode_check.length === 0) {
                // Insert new record since no matching AUNZ_Code was found
                aunzcode_id = aunzcode.Count + 1; // Ensure a unique ID
                console.log("Inserting new AUNZ_Code record with AUNZ_CodeID:", aunzcode_id);
                await queries.Insert(aunzcode.TableName, aunzcode.Columns, [aunzcode_id, req.body.search.AUNZ_Code]);
            } else {
                // Use the existing AUNZ_CodeID
                aunzcode_id = aunzcode_check[0].AUNZ_CodeID;
            }
        }




        // Product Accreditation Handling
        // Product Accreditation Handling
        // Product Accreditation Handling
        const accredit = new Table(await queries.GetAllInfo("Product_Accreditation"));
        let accredit_id = searchItem.Product_AccreditationID; // Start with the existing Product_AccreditationID from searchItem
        console.log("this is :", searchItem.Product_Accreditation_Scheme);

        // Check if Accreditation_Scheme has changed and needs updating
        if (req.body.search.Product_Accreditation_Scheme && req.body.search.Product_Accreditation_Scheme !== searchItem.Product_Accreditation_Scheme) {
            console.log("Accreditation Scheme mismatch detected. Checking for existing record or inserting a new one.");

            // Search for the accreditation scheme
            const accredit_check = await queries.Search(accredit.TableName, [req.body.search.Product_Accreditation_Scheme]);

            if (accredit_check === null || accredit_check.length === 0) {
                // If no match is found, insert a new record
                accredit_id = accredit.Count + 1; // Generate a new unique ID
                console.log("Inserting new Product_Accreditation record with Product_AccreditationID:", accredit_id);
                await queries.Insert(accredit.TableName, accredit.Columns, [accredit_id, req.body.search.Product_Accreditation_Scheme]);
            } else {
                // If a match is found, use the existing ID
                accredit_id = accredit_check[0].Product_AccreditationID;
                console.log("Using existing Product_AccreditationID:", accredit_id);
            }
        }


        // Tier Pricing Handling
        const tier = new Table(await queries.GetAllInfo("Tier_Pricing_&_Quantity"));
        let tier_id = searchItem.TierID; // Start with the existing TierID from searchItem

        // Check if any Tier Pricing values have changed
        if (
            req.body.search.Tier1_Price != searchItem.Tier1_Price || req.body.search.Tier1_Quantity != searchItem.Tier1_Quantity ||
            req.body.search.Tier2_Price != searchItem.Tier2_Price || req.body.search.Tier2_Quantity != searchItem.Tier2_Quantity ||
            req.body.search.Tier3_Price != searchItem.Tier3_Price || req.body.search.Tier3_Quantity != searchItem.Tier3_Quantity ||
            req.body.search.Tier4_Price != searchItem.Tier4_Price || req.body.search.Tier4_Quantity != searchItem.Tier4_Quantity ||
            req.body.search.Tier5_Price != searchItem.Tier5_Price || req.body.search.Tier5_Quantity != searchItem.Tier5_Quantity
        ) {
            console.log("Tier Pricing mismatch detected. Checking for existing record or inserting a new one.");

            // Search for existing tier pricing record
            const tier_check = await queries.Search(tier.TableName, [
                await queries.GetNumber(req.body.search.Tier1_Price),
                await queries.GetInt(req.body.search.Tier1_Quantity),
                await queries.GetNumber(req.body.search.Tier2_Price),
                await queries.GetInt(req.body.search.Tier2_Quantity),
                await queries.GetNumber(req.body.search.Tier3_Price),
                await queries.GetInt(req.body.search.Tier3_Quantity),
                await queries.GetNumber(req.body.search.Tier4_Price),
                await queries.GetInt(req.body.search.Tier4_Quantity),
                await queries.GetNumber(req.body.search.Tier5_Price),
                await queries.GetInt(req.body.search.Tier5_Quantity)
            ]);

            if (tier_check === null || tier_check.length === 0) {
                // Insert new record if no matching tier pricing is found
                tier_id = tier.Count + 1; // Ensure a unique ID for the new record
                console.log("Inserting new Tier Pricing record with TierID:", tier_id);
                await queries.Insert(tier.TableName, tier.Columns, [
                    tier_id,
                    await queries.GetNumber(req.body.search.Tier1_Price),
                    await queries.GetInt(req.body.search.Tier1_Quantity),
                    await queries.GetNumber(req.body.search.Tier2_Price),
                    await queries.GetInt(req.body.search.Tier2_Quantity),
                    await queries.GetNumber(req.body.search.Tier3_Price),
                    await queries.GetInt(req.body.search.Tier3_Quantity),
                    await queries.GetNumber(req.body.search.Tier4_Price),
                    await queries.GetInt(req.body.search.Tier4_Quantity),
                    await queries.GetNumber(req.body.search.Tier5_Price),
                    await queries.GetInt(req.body.search.Tier5_Quantity)
                ]);
            } else {
                // Use the existing TierID
                tier_id = tier_check[0].TierID;
                console.log("Using existing TierID:", tier_id);
            }
        }

        // Update Furniture table if TierID has changed
        if (tier_id !== searchItem.TierID) {
            console.log("Updating Furniture table with new TierID:", tier_id);
            await queries.Update("Furniture", ["TierID"], [tier_id], req.params.id, "FurnitureID");
        } else {
            console.log("No change in TierID. Skipping Furniture update.");
        }







        // Details Handling
        // Details Handling
        const details = new Table(await queries.GetAllInfo("Details"));
        let details_id = searchItem.DetailsID || details.Count + 1;

        // Extract values from req.body.search, falling back to searchItem only if req.body.search values are not defined
        const assemblyRequired = req.body.search.Assembly_Required || searchItem.Assembly_Required || 'N';
        const height = req.body.search.Height ? parseInt(req.body.search.Height) : searchItem.Height || 0;
        const width = req.body.search.Width ? parseInt(req.body.search.Width) : searchItem.Width || 0;
        const depth = req.body.search.Depth ? parseInt(req.body.search.Depth) : searchItem.Depth || 0;
        const weight = req.body.search.Weight ? parseInt(req.body.search.Weight) : searchItem.Weight || 0;
        const material = req.body.search.Material || searchItem.Material || '';
        const stackable = req.body.search.Stackable || searchItem.Stackable || 'N';
        const adjustability = req.body.search.Adjustibility || searchItem.Adjustibility || 'N';
        const ergonomic = req.body.search.Ergonomic || searchItem.Ergonomic || 'N';
        const mechanism = req.body.search.Mechanism || searchItem.Mechanism || '';
        const lumbarSupport = req.body.search.Lumbar_Support || searchItem.Lumbar_Support || 'N';
        const compatibleWith = req.body.search.Compatible_With || searchItem.Compatible_With || '';
        const castors = req.body.search.Castors || searchItem.Castors || 'N';
        const liftingCapacity = req.body.search.Lifting_Capacity ? parseInt(req.body.search.Lifting_Capacity) : searchItem.Lifting_Capacity || 0;
        const maxLoadWeight = req.body.search.Max_Load_Weight ? parseInt(req.body.search.Max_Load_Weight) : searchItem.Max_Load_Weight || 0;
        const defaultWarranty = req.body.search.Default_Warranty || searchItem.Default_Warranty || '0';
        const aunzCodeId = req.body.search.AUNZ_CodeID || searchItem.AUNZ_CodeID || 1;
        const productAccreditationId = req.body.search.Product_AccreditationID || searchItem.Product_AccreditationID || 1;
        const testCertificateExpiry = req.body.search.Test_Certificate_Expiry || searchItem.Test_Certificate_Expiry || '';

        // Log values for debugging


        // Check if any fields have changed in Details
        if (
            assemblyRequired !== searchItem.Assembly_Required ||
            height !== searchItem.Height ||
            width !== searchItem.Width ||
            depth !== searchItem.Depth ||
            weight !== searchItem.Weight ||
            material !== searchItem.Material ||
            stackable !== searchItem.Stackable ||
            adjustability !== searchItem.Adjustibility ||
            ergonomic !== searchItem.Ergonomic ||
            mechanism !== searchItem.Mechanism ||
            lumbarSupport !== searchItem.Lumbar_Support ||
            compatibleWith !== searchItem.Compatible_With ||
            castors !== searchItem.Castors ||
            liftingCapacity !== searchItem.Lifting_Capacity ||
            maxLoadWeight !== searchItem.Max_Load_Weight ||
            defaultWarranty !== searchItem.Default_Warranty ||
            aunzCodeId !== searchItem.AUNZ_CodeID ||
            productAccreditationId !== searchItem.Product_AccreditationID ||
            testCertificateExpiry !== searchItem.Test_Certificate_Expiry
        ) {
            console.log("Changes detected in Details. Proceeding with update.");

            // Check if the DetailsID already exists

            if (details_check && details_check.length > 0) {
                // If the DetailsID exists, update the existing record
                console.log("Updating existing details record with DetailsID:", details_id);
                await queries.Update(details.TableName, details.Columns, [
                    details_id,
                    colours_id,
                    assemblyRequired,
                    height,
                    width,
                    depth,
                    weight,
                    material,
                    stackable,
                    adjustability,
                    ergonomic,
                    mechanism,
                    lumbarSupport,
                    compatibleWith,
                    castors,
                    liftingCapacity,
                    maxLoadWeight,
                    defaultWarranty,
                    aunzCodeId,
                    productAccreditationId,
                    testCertificateExpiry
                ], details_id, "DetailsID");
            } else {
                // If the DetailsID does not exist, insert a new record
                console.log("Inserting new details record with DetailsID:", details_id);
                await queries.Insert(details.TableName, details.Columns, [
                    details_id,
                    colours_id,
                    assemblyRequired,
                    height,
                    width,
                    depth,
                    weight,
                    material,
                    stackable,
                    adjustability,
                    ergonomic,
                    mechanism,
                    lumbarSupport,
                    compatibleWith,
                    castors,
                    liftingCapacity,
                    maxLoadWeight,
                    defaultWarranty,
                    aunzCodeId,
                    productAccreditationId,
                    testCertificateExpiry
                ]);
            }
        } else {
            console.log("No changes detected in details, keeping existing DetailsID:", details_id);
        }








        // External Links Handling
        const external_links = new Table(await queries.GetAllInfo("External_Links"));

        // Extract external links data from req.body or fallback to existing data
        const thumbnail = req.body.search.Thumbnail || searchItem.Thumbnail;
        const primaryImage = req.body.search.Primary_Image || searchItem.Primary_Image;
        const additionalImage = req.body.search.Additional_Image || searchItem.Additional_Image;
        const additionalImage2 = req.body.search.Additional_Image2 || searchItem.Additional_Image2;
        const additionalImage3 = req.body.search.Additional_Image3 || searchItem.Additional_Image3;
        const additionalImage4 = req.body.search.Additional_Image4 || searchItem.Additional_Image4;
        const additionalImage5 = req.body.search.Additional_Image5 || searchItem.Additional_Image5;
        const furtherDocument1 = req.body.search.Further_Document1 || searchItem.Further_Document1;
        const furtherDocument1Label = req.body.search.Further_Document1Label || searchItem.Further_Document1Label;
        const furtherDocument2 = req.body.search.Further_Document2 || searchItem.Further_Document2;
        const furtherDocument2Label = req.body.search.Further_Document2Label || searchItem.Further_Document2Label;

        // Update or insert external links if there are changes
        if (
            thumbnail !== searchItem.Thumbnail ||
            primaryImage !== searchItem.Primary_Image ||
            additionalImage !== searchItem.Additional_Image ||
            additionalImage2 !== searchItem.Additional_Image2 ||
            additionalImage3 !== searchItem.Additional_Image3 ||
            additionalImage4 !== searchItem.Additional_Image4 ||
            additionalImage5 !== searchItem.Additional_Image5 ||
            furtherDocument1 !== searchItem.Further_Document1 ||
            furtherDocument1Label !== searchItem.Further_Document1Label ||
            furtherDocument2 !== searchItem.Further_Document2 ||
            furtherDocument2Label !== searchItem.Further_Document2Label
        ) {
            await queries.Update(
                external_links.TableName,
                external_links.Columns,
                [
                    external_links.Count,
                    thumbnail,
                    primaryImage,
                    additionalImage,
                    additionalImage2,
                    additionalImage3,
                    additionalImage4,
                    additionalImage5,
                    furtherDocument1,
                    furtherDocument1Label,
                    furtherDocument2,
                    furtherDocument2Label,
                    req.params.id  // Link back to the furniture ID
                ],
                req.params.id,
                "FurnitureID"
            );
        } else {
            console.log("No changes in external links data. Skipping update.");
        }

        return res.status(200).json({ message: "Furniture data updated successfully" });

    } catch (error) {
        console.error("Error in /edit/furniture route:", error);
        return res.status(500).json({ message: "Internal server error" });
    }
});

router.post("/delete/furniture/:id", async function (req, res) {
    const search = await fetch(`http://localhost:4000/search/${req.params.id}`, {
        method: "get",
        headers: {
            'Content-Type': 'application/json',
        },
    });

    item = await search.json();
    furniture_details = item.search[0];

    await sql`DELETE FROM "Specification" WHERE "Specification"."FurnitureID" = ${req.params.id}`;

    await sql`DELETE FROM "Delivery_&_Service_Region_Pricing" WHERE "Delivery_&_Service_Region_Pricing"."FurnitureID" = ${req.params.id}`;

    await sql`DELETE FROM "External_Links" WHERE "External_Links"."FurnitureID" = ${req.params.id}`;

    await sql`DELETE FROM "Furniture" WHERE "Furniture"."FurnitureID" = ${sql.unsafe(req.params.id)}`;

    details_check = await sql`SELECT * FROM "Furniture" WHERE "Furniture"."DetailsID" = ${furniture_details.DetailsID}`

    if (details_check === null || details_check === undefined || details_check === "") {
        await sql`DELETE FROM "Details" WHERE "Details"."DetailsID" = ${furniture_details.DetailsID}`;
    }

    await sql`DELETE FROM "UPIC" WHERE "UPIC"."UPIC" = ${furniture_details.UPIC}`;



    res.status(200).json({ message: `Deleted Furniture item: ${req.params.id}` });
});

module.exports = router;
