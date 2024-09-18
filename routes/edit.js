var express = require('express');
var router = express.Router();
const sql = require('../db');
const queries = require('./middleware/queries');
const Table = require('./middleware/tables');

router.post("/edit/furniture/:id", async function (req, res) {
	const search = await fetch(`http://localhost:4000/search/${req.params.id}`, {
		method: "get",
		headers: {
          'Content-Type': 'application/json',
        },
	});

	const results = await search.json();

	//Countries
	countries = new Table(await queries.GetAllInfo("Countries"));

	country_id = countries.Count;
	

	if (req.body.Country != search[0].CountryName) {
		country_check = await queries.Search(countries.TableName, [req.body.Country]);

		if (country_check === null) {
			await queries.Insert(countries.TableName, countries.Columns, [country_id, req.body.Country])
		}
	
		else {
			country_id = country_check[0].CountryID;
		}
	}

	else {
		country_id = search[0].CountryID;
	}


	//Origin
	origin = new Table(await queries.GetAllInfo("Origin"));

	origin_id = origin.Count;

	if (req.body.Origin_of_Imported_Products != search[0].Origin_of_Imported_Products|| 
		req.body.Australian_Made != search[0].Australian_Made|| req.body.Product_of_Australia != search[0].Product_of_Australia||
		req.body.SME != search[0].SME|| req.body.Aboriginal_TorresStraitIslander_Content != search[0].Aboriginal_TorresStraitIslander_Content ||
		req.body.Recycled_Content != search[0].Recycled_Content) {

		origin_check = await queries.Search(countries.TableName, [req.body.Origin_of_Imported_Products,
		req.body.Australian_Made, req.body.Product_of_Australia,
		req.body.SME, req.body.Aboriginal_TorresStraitIslander_Content,
		req.body.Recycled_Content]);

		if (origin_check === null) {

			await queries.Insert(origin.TableName, origin.Columns, [origin_id, country_id,
				req.body.Origin_of_Imported_Products,
				req.body.Australian_Made, req.body.Product_of_Australia,
				req.body.SME, req.body.Aboriginal_TorresStraitIslander_Content,
				req.body.Recycled_Content]);
		}

		else {
			origin_id = origin_check[0].OriginID;
		}
		
	}

	else {
		origin_id = search[0].OriginID;
	}

	
	
	//Manufacturer
	manufacturer = new Table(await queries.GetAllInfo("Manufacturer"));

	manufacturer_id = manufacturer.Count;

	if (req.body.Manufacturer != search[0].Manufacturer) {
		manufacturer_check = await queries.Search(manufacturer.TableName, [req.body.Manufacturer]);

		if (manufacturer_check === null) {
			await queries.Insert(manufacturer.TableName, manufacturer.Columns, [manufacturer_id, 
				req.body.Manufacturer]);
		}
	
		else {
			manufacturer_id = manufacturer_check[0].ManufacturerID;
		}
	}


	else {
		manufacturer_id = search[0].ManufacturerID;
	}


	//Testing Agency
	testing = new Table(await queries.GetAllInfo("Testing_Agency"));

	testing_id = testing.Count;

	if (req.body.Testing_Agency != search[0].Testing_Agency) {
		testing_check = await queries.Search(testing.TableName, [req.body.Testing_Agency]);

		if (testing_check === null) {
			await queries.Insert(testing.TableName, testing.Columns, [testing_id, 
				req.body.Testing_Agency]);
		}
	
		else {
			testing_id = testing_check[0].Testing_AgencyID;
		}
	}

	else {
		testing_id = testing_check[0].Testing_AgencyID;
	}

	//Certification
	certification = new Table(await queries.GetAllInfo("Certification"));

	certification_id = certification.Count;

	if (req.body.Other_Certificates != search[0].Other_Certificates|| req.body.E0_Certified != search[0].E0_Certified ||
		req.body.Timber_Certified != search[0].Timber_Certified || req.body.Other_VOCs_Hazardous_Substances != search[0].Other_VOCs_Hazardous_Substances) { 
		
		certification_check = await queries.Search(certification.TableName, [req.body.Other_Certificates,
		req.body.E0_Certified, req.body.Timber_Certified, req.body.Other_VOCs_Hazardous_Substances]);

		if (certification_check === null) {
			await queries.Insert(certification.TableName, certification.Columns, [certification_id,
				req.body.Other_Certificates, req.body.E0_Certified, req.body.Timber_Certified,
				req.body.Other_VOCs_Hazardous_Substances]);
		}
	
		else {
			certification_id = certification_check[0].CertificationID;
		}
	}

	else {
		certification_id = search[0].CertificationID;
	}

	//UPIC
	upic = new Table(await queries.GetAllInfo("UPIC"));

	upic_id = req.body.UPIC;

	await queries.Update(upic.TableName, upic.Columns, [upic_id,
			req.body.Inclusions, req.body.Queensland_Made, req.body.Indigenous_Furniture],
			req.params.id, "UPIC");

	//Suppliers
	supplier = new Table(await queries.GetAllInfo("Supplier"));

	supplier_id = supplier.Count;

	if (req.body.SupplierName != search[0].SupplierName ||
			req.body.ABN != search[0].ABN || req.body.Contact != search[0].Contact || 
			req.body.Phone != search[0].Phone || req.body.Mobile != search[0].Mobile ||
			req.body.Email != search[0].Phone || req.body.Website != search[0].Website) {

		supplier_check = await queries.Search(supplier.TableName, [req.body.SupplierName,
		req.body.ABN, req.body.Contact, req.body.Phone, req.body.Mobile,
		req.body.Mobile, req.body.Email]);

		if (supplier_check === null) {
			await queries.Insert(supplier.TableName, supplier.Columns, [supplier_id,
				req.body.SupplierName,
				req.body.ABN, req.body.Contact, req.body.Phone, req.body.Mobile,
				req.body.Email, req.body.Website]);
		}
	
		else {
			supplier_id = supplier_check[0].SupplierID;
		}
	}

	else {
		supplier_id = search[0].SupplierID;
	}


	//Category
	category = new Table(await queries.GetAllInfo("Category"));

	category_id = category.Count;

	if (req.body.CategoryName != req || req.body.CategoryDescription) {
		category_check = await queries.Search(category.TableName, [req.body.CategoryName,
		req.body.CategoryDescription]);

		if (category_check === null) {
			await queries.Insert(category.TableName, category.Columns, [category_id,
				req.body.CategoryName, req.body.CategoryDescription]);
		}
	
		else {
			category_id = category_check[0].CategoryID;
		}
	}

	else {
		category_id = search[0].CategoryID;
	}


	//Category2
	category2 = new Table(await queries.GetAllInfo("Category2"));

	category2_id = category2.Count;

	if (req.body.Category_2Name != search[0].Category_2Name) {
		category2_check = await queries.Search(category2.TableName, [req.body.Category_2Name,
		req.body.Category_2Description]);

		if (category2_check === null) {
			await queries.Insert(category2.TableName, category2.Columns, [category2_id,
				req.body.Category_2Name, req.body.Category_2Description, category_id]);
		}
	
		else {
			category2_id = category2_check[0].Category_2ID;
		}
	}


	else {
		category2_id = search[0].Category_2ID;
	}


	//Category3
	category3 = new Table(await queries.GetAllInfo("Category3"));

	category3_id = category3.Count;

	if (req.body.Category_3Name != search[0].Category_3Name) {
		if (category3_check === null) {
			await queries.Insert(category3.TableName, category3.Columns, [category3_id,
				req.body.Category_3Name, req.body.Category_3Description, category2_id]);
		}
	
		else {
			category3_id = category3_check[0].Category_3ID;
		}
	}

	else {
		category3_id = search[0].Category_3ID;
	}

	//Category4
	category4 = new Table(await queries.GetAllInfo("Category4"));

	category4_id = category4.Count;

	if (req.body.Category_4Name != search[0].Category_4Name) {
		category4_check = await queries.Search(category4.TableName, [req.body.Category_4Name,
		req.body.Category_4Description, category3_id]);

		if (category3_check === null) {
			await queries.Insert(category4.TableName, category4.Columns, [category4_id,
				req.body.Category_4Name, req.body.Category_4Description, category3_id]);
		}
	
		else {
			category4_id = category4_check[0].Category_4ID;
		}
	}

	//Colours
	colours = new Table(await queries.GetAllInfo("Colours"));

	colours_id = colours.Count;

	if (req.body.Colours != search[0].Colours) {
		colours_check = await queries.Search(colours.TableName, [req.body.Colours]);

		if (colours_check === null) {
			await queries.Insert(colours.TableName, colours.Columns, [colours_id,
				req.body.Colours]);
		}
	
		else {
			colours_id = colours_check[0].ColourID;
		}
	}



	else {
		colours_id = search[0].ColourID;
	}


	//AU/NZ Code
	aunzcode = new Table(await queries.GetAllInfo("AU/NZ_Code"));

	aunzcode_id = aunzcode.Count;

	if (req.body.AUNZ_Code != search[0].AUNZ_Code) {
		aunzcode_check = await queries.Search(aunzcode.TableName, [req.body.AUNZ_Code]);

		if (aunzcode_check === null) {
			await queries.Insert(aunzcode.TableName, aunzcode.Columns, [aunzcode_id,
				req.body.AUNZ_Code]);
		}
	
		else {
			aunzcode_id = aunzcode_check[0].AUNZ_CodeID;
		}
	}

	else {
		aunzcode_id = search[0].AUNZ_CodeID;
	}


	//Product Accreditation
	accredit = new Table(await queries.GetAllInfo("Product_Accreditation"));

	accredit_id = accredit.Count;

	if (req.body.Accreditation_Scheme != search[0].Accreditation_Scheme) {
		accredit_check = await queries.Search(accredit.TableName, [req.body.Accreditation_Scheme]);

		if (accredit_check === null) {
			await queries.Insert(accredit.TableName, accredit.Columns, [accredit_id,
				req.body.Accreditation_Scheme]);
		}
	
		else {
			accredit_id = accredit_check[0].Product_AccreditationID;
		}

	}

	else {
		accredit_id = search[0].Product_AccreditationID;
	}

	//Tier Pricing
	tier = new Table(await queries.GetAllInfo("Tier_Pricing_&_Quantity"));

	tier_id = tier.Count;

	if (req.body.Tier1_Price != search[0].Tier1_Price || req.body.Tier1_Quantity != search[0].Tier1_Quantity
		|| req.body.Tier2_Price != search[0].Tier2_Price || req.body.Tier2_Quantity != search[0].Tier2_Quantity
		|| req.body.Tier3_Price != search[0].Tier3_Price || req.body.Tier3_Quantity != search[0].Tier3_Quantity
		|| req.body.Tier4_Price != search[0].Tier4_Price || req.body.Tier4_Quantity != search[0].Tier4_Quantity
		|| req.body.Tier5_Price != search[0].Tier5_Price || req.body.Tier5_Quantity != search[0].Tier5_Quantity) {

		tier_check = await queries.Search(tier.TableName, [await queries.GetNumber(req.body.Tier1_Price),
		await queries.GetInt(req.body.Tier1_Quantity), await queries.GetNumber(req.body.Tier2_Price), 
		await queries.GetInt(req.body.Tier2_Quantity), await queries.GetNumber(req.body.Tier3_Price), 
		await queries.GetInt(req.body.Tier3_Quantity), await queries.GetNumber(req.body.Tier4_Price),
		await queries.GetInt(req.body.Tier4_Quantity), await queries.GetNumber(req.body.Tier5_Price), 
		await queries.GetInt(req.body.Tier5_Quantity)
		]);

		if (tier_check === null) {
			await queries.Insert(tier.TableName, tier.Columns, [tier_id,
				await queries.GetNumber(req.body.Tier1_Price),
				await queries.GetInt(req.body.Tier1_Quantity), await queries.GetNumber(req.body.Tier2_Price), 
				await queries.GetInt(req.body.Tier2_Quantity), await queries.GetNumber(req.body.Tier3_Price), 
				await queries.GetInt(req.body.Tier3_Quantity), await queries.GetNumber(req.body.Tier4_Price),
				await queries.GetInt(req.body.Tier4_Quantity), await queries.GetNumber(req.body.Tier5_Price), 
				await queries.GetInt(req.body.Tier5_Quantity)]);
		}

		else {
			tier_id = tier_check[0].TierID;
		}

	}

	else {
		tier_id = search[0].TierID;
	}

	//Details
	details = new Table(await queries.GetAllInfo("Details"));

	details_id = details.Count;

	if (req.body.Assembly_Required != search[0].Assembly_Required 
		|| await queries.GetNumber(req.body.Height) != search[0].Height 
		|| await queries.GetNumber(req.body.Width) != search[0].Width
		|| await queries.GetNumber(req.body.Depth) != search[0].Depth
		|| await queries.GetNumber(req.body.Weight) != search[0].Weight
		|| req.body.Material != search[0].Material
		|| req.body.Stackable != search[0].Stackable
		|| req.body.Adjustability != search[0].Adjustability
		|| req.body.Ergonomic != search[0].Ergonomic
		|| req.body.Mechanism != search[0].Mechanism
		|| req.body.Lumbar_Support != search[0].Lumbar_Support
		|| req.body.Compatible_With != search[0].Compatible_With
		|| req.body.Castors != search[0].Castors
		|| await queries.GetNumber(req.body.Lifting_Capacity) != search[0].Lifting_Capacity
		|| await queries.GetNumber(req.body.Max_Load_Weight) != search[0].Max_Load_Weight
		|| req.body.Default_Warranty != search[0].Default_Warranty) {

		details_check = await queries.Search(details.TableName, [colours_id,
		req.body.Assembly_Required, await queries.GetNumber(req.body.Height), await queries.GetNumber(req.body.Width),
		await queries.GetNumber(req.body.Depth), await queries.GetNumber(req.body.Weight), req.body.Material,
		req.body.Stackable, req.body.Adjustability, req.body.Ergonomic,
		req.body.Mechanism, req.body.Lumbar_Support, req.body.Compatible_With,
		req.body.Castors, await queries.GetNumber(req.body.Lifting_Capacity), await queries.GetNumber(req.body.Max_Load_Weight),
		req.body.Default_Warranty, aunzcode_id, accredit_id, req.body.Test_Certificate_Expiry]);

		if (details_check === null) {
			await queries.Insert(details.TableName, details.Columns, [details_id,
				colours_id,
				req.body.Assembly_Required, await queries.GetNumber(req.body.Height), await queries.GetNumber(req.body.Width),
				await queries.GetNumber(req.body.Depth), await queries.GetNumber(req.body.Weight), req.body.Material,
				req.body.Stackable, req.body.Adjustability, req.body.Ergonomic,
				req.body.Mechanism, req.body.Lumbar_Support, req.body.Compatible_With,
				req.body.Castors, await queries.GetNumber(req.body.Lifting_Capacity),
				await queries.GetNumber(req.body.Max_Load_Weight),
				req.body.Default_Warranty, aunzcode_id, accredit_id, req.body.Test_Certificate_Expiry]);
		}
	
		else {
			details_id = details_check[0].DetailsID;
		}

	}

	else {
		details_id = search[0].DetailsID;
	}

	//Furniture	
	furniture = new Table(await queries.GetAllInfo("Furniture"));

	furniture_id = req.params.id;

	queries.Update(furniture.TableName, Furniture.Columns, [furniture_id,
			req.body.ProductCode,
			category4_id, supplier_id, origin_id, req.body.Generic_Description,
			req.body.Long_Description, await queries.GetNumber(req.body.Unit_Price), await queries.GetNumber(req.body.MSRP_Price),
			upic_id, manufacturer_id, testing_id, certification_id, details_id, tier_id], 
			furniture_id, "FurnitureID");


	//Regions
	region = new Table(await queries.GetAllInfo("Regions"));

	regions_list = [];

	for (i = 0; i < req.body.ServiceRegions.length; i++) {
		regions_list.push(req.body.ServiceRegions[i].box1);
	}

	region_id_list = [];

	for (let i = 0; i < regions_list.length; i++) {
		region_check = await queries.Search(region.TableName, [regions_list[i]]);
		
		if (region_check === null) {
			await queries.Insert(region.TableName, region.Columns, [region.Count + i,
			regions_list[i]]);
			region_id_list.push(region.Count + i);
		}
	
		else {
			region_id_list.push(region_check[0].RegionID);
		}
	} 

	//Delivery & Service Region Pricing
	serviceregion = new Table(await queries.GetAllInfo("Delivery_&_Service_Region_Pricing"));
	
	await sql`DELETE FROM "${serviceregion.TableName}" WHERE "${serviceregion.TableName}"."FurnitureID" = ${furniture_id}`;

	for (let i = 0; i < req.body.ServiceRegions.length; i++) {
		await queries.Insert(serviceregion.TableName, serviceregion.Columns, [region_id_list[i],
			req.body.ServiceRegions[i].box2, req.body.ServiceRegions[i].box3, 
			serviceregion.Count, furniture_id
			]);
		serviceregion.AddCount();
	}

	//Specification
	specification = new Table(await queries.GetAllInfo("Specification"));

	await sql`DELETE FROM "${specification.TableName}" WHERE "${specification.TableName}"."FurnitureID" = ${furniture_id}`;

	for (let i = 0; i < req.body.Specification.length; i++) {
		await queries.Insert(specification.TableName, specification.Columns,
			[specification.Count, req.body.Specification[i].box1,
			req.body.Specification[i].box2, 
			furniture_id, req.body.Specification[i].box3,
			req.body.Specification[i].box4]);

		specification.AddCount();
	}

	//External Link
	external_links = new Table(await queries.GetAllInfo("External_Links"));

	await queries.Update(external_links.TableName, external_links.Columns,
		[external_links.Count, req.body.Thumbnail, req.body.PrimaryImage,
		req.body.Additional_Image, req.body.Additional_Image2, req.body.Additional_Image3, 
		req.body.Additional_Image4, req.body.Additional_Image5, req.body.Further_Document1,
		req.body.Further_Document1Label, req.body.Further_Document2,
		req.body.Further_Document2Label, furniture_id], furniture_id, "FurnitureID");

}); 


module.exports = router;