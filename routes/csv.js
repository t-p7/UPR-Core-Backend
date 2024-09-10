var express = require('express');
var router = express.Router();
const sql = require('../db');
const queries = require('./middleware/queries');
const Table = require('./middleware/tables');


router.post("/insert/spreadsheet", async function (req, res) {

	const information = req.body;

	for (let i = 0; i < information.length; i++) {
		//Countries
		countries = new Table(await queries.GetAllInfo("Countries"));

		country_id = countries.Count;
		country_check = await queries.Search(countries.TableName, [information[i].Country]);

		if (country_check === null) {
			await queries.Insert(countries.TableName, countries.Columns, [country_id, information[i].Country])
		}

		else {
			country_id = country_check[0].CountryID;
		}

		//Origin
		origin = new Table(await queries.GetAllInfo("Origin"));

		origin_id = origin.Count;
		origin_check = await queries.Search(countries.TableName, [information[i].Origin_of_Imported_Products,
			information[i].Australian_Made, information[i].Product_of_Australia,
			information[i].SME, information[i].Aboriginal_TorresStraitIslander_Content,
			information[i].Recycled_Content]);

		if (origin_check === null) {

			await queries.Insert(origin.TableName, origin.Columns, [origin_id, country_id,
				information[i].Origin_of_Imported_Products,
				information[i].Australian_Made, information[i].Product_of_Australia,
				information[i].SME, information[i].Aboriginal_TorresStraitIslander_Content,
				information[i].Recycled_Content]);
		}

		else {
			origin_id = origin_check[0].OriginID;
		}
		
		//Manufacturer
		manufacturer = new Table(await queries.GetAllInfo("Manufacturer"));

		manufacturer_id = manufacturer.Count;

		manufacturer_check = await queries.Search(manufacturer.TableName, [information[i].Manufacturer]);

		if (manufacturer_check === null) {
			await queries.Insert(manufacturer.TableName, manufacturer.Columns, [manufacturer_id, 
				information[i].Manufacturer]);
		}

		else {
			manufacturer_id = manufacturer_check[0].ManufacturerID;
		}

		//Testing Agency
		testing = new Table(await queries.GetAllInfo("Testing_Agency"));

		testing_id = testing.Count;

		testing_check = await queries.Search(testing.TableName, [information[i].Testing_Agency]);

		if (testing_check === null) {
			await queries.Insert(testing.TableName, testing.Columns, [testing_id, 
				information[i].Testing_Agency]);
		}

		else {
			testing_id = testing_check[0].Testing_AgencyID;
		}

		//Certification
		certification = new Table(await queries.GetAllInfo("Certification"));

		certification_id = certification.Count;

		certification_check = await queries.Search(certification.TableName, [information[i].Other_Certificates,
			information[i].E0_Certified, information[i].Timber_Certified, information[i].Other_VOCs_Hazardous_Substances]);

		if (certification_check === null) {
			await queries.Insert(certification.TableName, certification.Columns, [certification_id,
				information[i].Other_Certificates, information[i].E0_Certified, information[i].Timber_Certified,
				information[i].Other_VOCs_Hazardous_Substances]);
		}

		else {
			certification_id = certification_check[0].CertificationID;
		}

		//UPIC
		upic = new Table(await queries.GetAllInfo("UPIC"));

		upic_id = information[i].UPIC;

		upic_check = await queries.Search(upic.TableName, [information[i].UPIC,
			information[i].Inclusions, information[i].Queensland_Made, information[i].Indigenous_Furniture]);

		if (upic_check === null) {
			await queries.Insert(upic.TableName, upic.Columns, [upic_id,
				information[i].Inclusions, information[i].Queensland_Made, information[i].Indigenous_Furniture]);
		}

		else {
			upic_id = upic_check[0].UPIC;
		}


		//Suppliers
		supplier = new Table(await queries.GetAllInfo("Supplier"));

		supplier_id = supplier.Count;

		supplier_check = await queries.Search(supplier.TableName, [information[i].SupplierName,
			information[i].ABN, information[i].Contact, information[i].Phone, information[i].Mobile,
			information[i].Mobile, information[i].Email]);

		if (supplier_check === null) {
			await queries.Insert(supplier.TableName, supplier.Columns, [supplier_id,
				information[i].SupplierName,
				information[i].ABN, information[i].Contact, information[i].Phone, information[i].Mobile,
				information[i].Mobile, information[i].Email]);
		}

		else {
			supplier_id = supplier_check[0].SupplierID;
		}


		//Category
		category = new Table(await queries.GetAllInfo("Category"));

		category_id = category.Count;

		category_check = await queries.Search(category.TableName, [information[i].CategoryName,
			information[i].CategoryDescription]);

		if (category_check === null) {
			await queries.Insert(category.TableName, category.Columns, [category_id,
				information[i].CategoryName, information[i].CategoryDescription]);
		}

		else {
			category_id = category_check[0].CategoryID;
		}


		//Category2
		category2 = new Table(await queries.GetAllInfo("Category2"));

		category2_id = category2.Count;

		category2_check = await queries.Search(category2.TableName, [information[i].Category_2Name,
			information[i].Category_2Description]);

		if (category2_check === null) {
			await queries.Insert(category2.TableName, category2.Columns, [category2_id,
				information[i].Category_2Name, information[i].Category_2Description, category_id]);
		}

		else {
			category2_id = category2_check[0].Category_2ID;
		}


		//Category3
		category3 = new Table(await queries.GetAllInfo("Category3"));

		category3_id = category3.Count;

		category3_check = await queries.Search(category3.TableName, [information[i].Category_3Name,
			information[i].Category_3Description]);

		if (category3_check === null) {
			await queries.Insert(category3.TableName, category3.Columns, [category3_id,
				information[i].Category_3Name, information[i].Category_3Description, category2_id]);
		}

		else {
			category3_id = category3_check[0].Category_3ID;
		}

		//Category4
		category4 = new Table(await queries.GetAllInfo("Category4"));

		category4_id = category4.Count;

		category4_check = await queries.Search(category4.TableName, [information[i].Category_4Name,
			information[i].Category_4Description, category3_id]);

		if (category3_check === null) {
			await queries.Insert(category4.TableName, category4.Columns, [category4_id,
				information[i].Category_4Name, information[i].Category_4Description, category3_id]);
		}

		else {
			category4_id = category4_check[0].Category_4ID;
		}


		//Colours
		colours = new Table(await queries.GetAllInfo("Colours"));

		colours_id = colours.Count;

		colours_check = await queries.Search(colours.TableName, [information[i].Colours]);

		if (colours_check === null) {
			await queries.Insert(colours.TableName, colours.Columns, [colours_id,
				information[i].Colours]);
		}

		else {
			colours_id = colours_check[0].ColourID;
		}


		//AU/NZ Code
		aunzcode = new Table(await queries.GetAllInfo("AU/NZ_Code"));

		aunzcode_id = aunzcode.Count;

		aunzcode_check = await queries.Search(aunzcode.TableName, [information[i].AUNZ_Code]);

		if (aunzcode_check === null) {
			await queries.Insert(aunzcode.TableName, aunzcode.Columns, [aunzcode_id,
				information[i].AUNZ_Code]);
		}

		else {
			aunzcode_id = aunzcode_check[0].AUNZ_CodeID;
		}


		//Product Accreditation
		accredit = new Table(await queries.GetAllInfo("Product_Accreditation"));

		accredit_id = accredit.Count;

		accredit_check = await queries.Search(accredit.TableName, [information[i].Accreditation_Scheme]);

		if (accredit_check === null) {
			await queries.Insert(accredit.TableName, accredit.Columns, [accredit_id,
				information[i].Accreditation_Scheme]);
		}

		else {
			accredit_id = accredit_check[0].Product_AccreditationID;
		}

		//Tier Pricing
		tier = new Table(await queries.GetAllInfo("Tier_Pricing_&_Quantity"));

		tier_id = tier.Count;

		tier_check = await queries.Search(tier.TableName, [await queries.GetNumber(information[i].Tier1_Price),
			await queries.GetInt(information[i].Tier1_Quantity), await queries.GetNumber(information[i].Tier2_Price), 
			await queries.GetInt(information[i].Tier2_Quantity), await queries.GetNumber(information[i].Tier3_Price), 
			await queries.GetInt(information[i].Tier3_Quantity), await queries.GetNumber(information[i].Tier4_Price),
			await queries.GetInt(information[i].Tier4_Quantity), await queries.GetNumber(information[i].Tier5_Price), 
			await queries.GetInt(information[i].Tier5_Quantity)
			]);

		if (tier_check === null) {
			await queries.Insert(tier.TableName, tier.Columns, [tier_id,
				await queries.GetNumber(information[i].Tier1_Price),
				await queries.GetInt(information[i].Tier1_Quantity), await queries.GetNumber(information[i].Tier2_Price), 
				await queries.GetInt(information[i].Tier2_Quantity), await queries.GetNumber(information[i].Tier3_Price), 
				await queries.GetInt(information[i].Tier3_Quantity), await queries.GetNumber(information[i].Tier4_Price),
				await queries.GetInt(information[i].Tier4_Quantity), await queries.GetNumber(information[i].Tier5_Price), 
				await queries.GetInt(information[i].Tier5_Quantity)]);
		}

		else {
			tier_id = tier_check[0].TierID;
		}

		//Details
		details = new Table(await queries.GetAllInfo("Details"));

		details_id = details.Count;

		height = information[i].Dimensions.match(/\d+(?=H)/);
		width = information[i].Dimensions.match(/\d+(?=W)/);
		depth = information[i].Dimensions.match(/\d+(?=D)/);

		details_check = await queries.Search(details.TableName, [colours_id,
			information[i].Assembly_Required, await queries.GetNumber(height), await queries.GetNumber(width),
			await queries.GetNumber(depth), await queries.GetNumber(information[i].Weight), information[i].Material,
			information[i].Stackable, information[i].Adjustability, information[i].Ergonomic,
			information[i].Mechanism, information[i].Lumbar_Support, information[i].Compatible_With,
			information[i].Castors, await queries.GetNumber(information[i].Lifting_Capacity), await queries.GetNumber(information[i].Max_Load_Weight),
			information[i].Default_Warranty, aunzcode_id, accredit_id, information[i].Test_Certificate_Expiry]);

		if (details_check === null) {
			await queries.Insert(details.TableName, details.Columns, [details_id,
				colours_id,
				information[i].Assembly_Required, await queries.GetNumber(height), await queries.GetNumber(width),
				await queries.GetNumber(depth), await queries.GetNumber(information[i].Weight), information[i].Material,
				information[i].Stackable, information[i].Adjustability, information[i].Ergonomic,
				information[i].Mechanism, information[i].Lumbar_Support, information[i].Compatible_With,
				information[i].Castors, await queries.GetNumber(information[i].Lifting_Capacity),
				await queries.GetNumber(information[i].Max_Load_Weight),
				information[i].Default_Warranty, aunzcode_id, accredit_id, information[i].Test_Certificate_Expiry]);
		}

		else {
			details_id = details_check[0].DetailsID;
		}

		//Furniture	
		furniture = new Table(await queries.GetAllInfo("Furniture"));

		furniture_id = furniture.Count;

		furniture_check = await queries.Search(furniture.TableName, [information[i].ProductCode,
			category4_id, supplier_id, origin_id, information[i].Generic_Description,
			information[i].Long_Description, await queries.GetNumber(information[i].Unit_Price), await queries.GetNumber(information[i].MSRP_Price),
			upic_id, manufacturer_id, testing_id, certification_id, details_id, tier_id]);

		if (furniture_check === null) {
			await queries.Insert(furniture.TableName, furniture.Columns, [furniture_id,
				information[i].ProductCode,
				category4_id, supplier_id, origin_id, information[i].Generic_Description,
				information[i].Long_Description, await queries.GetNumber(information[i].Unit_Price), await queries.GetNumber(information[i].MSRP_Price),
				upic_id, manufacturer_id, testing_id, certification_id, details_id, tier_id]);
		}

		else {
			furniture_id = furniture_check[0].FurnitureID;
		}


		//Regions
		region = new Table(await queries.GetAllInfo("Regions"));

		regions_list = [];

		for (i = 0; i < information[i].regions.length; i++) {
			regions_list.push(information[i].regions[i].box1);
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
		
		for (let i = 0; i < information[i].regions.length; i++) {
			await queries.Insert(serviceregion.TableName, serviceregion.Columns, [region_id_list[i],
				information[i].regions[i].box2, information[i].regions[i].box3, 
				serviceregion.Count, furniture_id
				]);
			serviceregion.AddCount();
		}


		//Specification
		specification = new Table(await queries.GetAllInfo("Specification"));

		for (let i = 0; i < information[i].Specification.length; i++) {
			await queries.Insert(specification.TableName, specification.Columns,
				[specification.Count, information[i].Specification[i].box1,
				information[i].Specification[i].box2, 
				furniture_id, information[i].Specification[i].box3,
				information[i].Specification[i].box4]);

			specification.AddCount();
		}

		//External Link
		external_links = new Table(await queries.GetAllInfo("External_Links"));

		await queries.Insert(external_links.TableName, external_links.Columns,
			[external_links.Count, information[i].Thumbnail, information[i].PrimaryImage,
			information[i].Additional_Image, information[i].Additional_Image2, information[i].Additional_Image3, 
			information[i].Additional_Image4, information[i].Additional_Image5, information[i].Further_Document1,
			information[i].Further_Document1Label, information[i].Further_Document2,
			information[i].Further_Document2Label, furniture_id]);

	}

}); 


module.exports = router;