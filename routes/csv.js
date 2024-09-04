var express = require('express');
var router = express.Router();
const sql = require('../db');
const queries = require('./middleware/queries');
const Table = require('./middleware/tables');


router.post("/insert/spreadsheet", async function (req, res) {

	for (let i = 0; i < req.body.length; i++) {
		//Countries
		countries = new Table(await queries.GetAllInfo("Countries"));
	
		country_id = countries.Count;
		country_check = await queries.Search(countries.TableName, [req.body[i].Country]);
	
		if (country_check === null) {
			await queries.Insert(countries.TableName, countries.Columns, [country_id, req.body[i].Country])
		}
	
		else {
			country_id = country_check[0].CountryID;
		}
	
		//Origin
		origin = new Table(await queries.GetAllInfo("Origin"));
	
		origin_id = origin.Count;
		origin_check = await queries.Search(countries.TableName, [req.body[i].Origin_of_Imported_Products,
			req.body[i].Australian_Made, req.body[i].Product_of_Australia,
			req.body[i].SME, req.body[i].Aboriginal_TorresStraitIslander_Content,
			req.body[i].Recycled_Content]);
	
		if (origin_check === null) {
	
			await queries.Insert(origin.TableName, origin.Columns, [origin_id, country_id,
				req.body[i].Origin_of_Imported_Products,
				req.body[i].Australian_Made, req.body[i].Product_of_Australia,
				req.body[i].SME, req.body[i].Aboriginal_TorresStraitIslander_Content,
				req.body[i].Recycled_Content]);
		}
	
		else {
			origin_id = origin_check[0].OriginID;
		}
		
		//Manufacturer
		manufacturer = new Table(await queries.GetAllInfo("Manufacturer"));
	
		manufacturer_id = manufacturer.Count;
	
		manufacturer_check = await queries.Search(manufacturer.TableName, [req.body[i].Manufacturer]);
	
		if (manufacturer_check === null) {
			await queries.Insert(manufacturer.TableName, manufacturer.Columns, [manufacturer_id, 
				req.body[i].Manufacturer]);
		}
	
		else {
			manufacturer_id = manufacturer_check[0].ManufacturerID;
		}
	
		//Testing Agency
		testing = new Table(await queries.GetAllInfo("Testing_Agency"));
	
		testing_id = testing.Count;
	
		testing_check = await queries.Search(testing.TableName, [req.body[i].Testing_Agency]);
	
		if (testing_check === null) {
			await queries.Insert(testing.TableName, testing.Columns, [testing_id, 
				req.body[i].Testing_Agency]);
		}
	
		else {
			testing_id = testing_check[0].Testing_AgencyID;
		}
	
		//Certification
		certification = new Table(await queries.GetAllInfo("Certification"));
	
		certification_id = certification.Count;
	
		certification_check = await queries.Search(certification.TableName, [req.body[i].Other_Certificates,
			req.body[i].E0_Certified, req.body[i].Timber_Certified, req.body[i].Other_VOCs_Hazardous_Substances]);
	
		if (certification_check === null) {
			await queries.Insert(certification.TableName, certification.Columns, [certification_id,
				req.body[i].Other_Certificates, req.body[i].E0_Certified, req.body[i].Timber_Certified,
				req.body[i].Other_VOCs_Hazardous_Substances]);
		}
	
		else {
			certification_id = certification_check[0].CertificationID;
		}
	
		//UPIC
		upic = new Table(await queries.GetAllInfo("UPIC"));
	
		upic_id = req.body[i].UPIC;
	
		upic_check = await queries.Search(upic.TableName, [req.body[i].UPIC,
			req.body[i].Inclusions, req.body[i].Queensland_Made, req.body[i].Indigenous_Furniture]);
	
		if (upic_check === null) {
			await queries.Insert(upic.TableName, upic.Columns, [upic_id,
				req.body[i].Inclusions, req.body[i].Queensland_Made, req.body[i].Indigenous_Furniture]);
		}
	
		else {
			upic_id = upic_check[0].UPIC;
		}
	
	
		//Suppliers
		supplier = new Table(await queries.GetAllInfo("Supplier"));
	
		supplier_id = supplier.Count;
	
		supplier_check = await queries.Search(supplier.TableName, [req.body[i].SupplierName,
			req.body[i].ABN, req.body[i].Contact, req.body[i].Phone, req.body[i].Mobile,
			req.body[i].Mobile, req.body[i].Email]);
	
		if (supplier_check === null) {
			await queries.Insert(supplier.TableName, supplier.Columns, [supplier_id,
				req.body[i].SupplierName,
				req.body[i].ABN, req.body[i].Contact, req.body[i].Phone, req.body[i].Mobile,
				req.body[i].Mobile, req.body[i].Email]);
		}
	
		else {
			supplier_id = supplier_check[0].SupplierID;
		}
	
	
		//Category
		category = new Table(await queries.GetAllInfo("Category"));
	
		category_id = category.Count;
	
		category_check = await queries.Search(category.TableName, [req.body[i].CategoryName,
			req.body[i].CategoryDescription]);
	
		if (category_check === null) {
			await queries.Insert(category.TableName, category.Columns, [category_id,
				req.body[i].CategoryName, req.body[i].CategoryDescription]);
		}
	
		else {
			category_id = category_check[0].CategoryID;
		}
	
	
		//Category2
		category2 = new Table(await queries.GetAllInfo("Category2"));
	
		category2_id = category2.Count;
	
		category2_check = await queries.Search(category2.TableName, [req.body[i].Category_2Name,
			req.body[i].Category_2Description]);
	
		if (category2_check === null) {
			await queries.Insert(category2.TableName, category2.Columns, [category2_id,
				req.body[i].Category_2Name, req.body[i].Category_2Description, category_id]);
		}
	
		else {
			category2_id = category2_check[0].Category_2ID;
		}
	
	
		//Category3
		category3 = new Table(await queries.GetAllInfo("Category3"));
	
		category3_id = category3.Count;
	
		category3_check = await queries.Search(category3.TableName, [req.body[i].Category_3Name,
			req.body[i].Category_3Description]);
	
		if (category3_check === null) {
			await queries.Insert(category3.TableName, category3.Columns, [category3_id,
				req.body[i].Category_3Name, req.body[i].Category_3Description, category2_id]);
		}
	
		else {
			category3_id = category3_check[0].Category_3ID;
		}
	
		//Category4
		category4 = new Table(await queries.GetAllInfo("Category4"));
	
		category4_id = category4.Count;
	
		category4_check = await queries.Search(category4.TableName, [req.body[i].Category_4Name,
			req.body[i].Category_4Description, category3_id]);
	
		if (category3_check === null) {
			await queries.Insert(category4.TableName, category4.Columns, [category4_id,
				req.body[i].Category_4Name, req.body[i].Category_4Description, category3_id]);
		}
	
		else {
			category4_id = category4_check[0].Category_4ID;
		}
	
	
		//Colours
		colours = new Table(await queries.GetAllInfo("Colours"));
	
		colours_id = colours.Count;
	
		colours_check = await queries.Search(colours.TableName, [req.body[i].Colours]);
	
		if (colours_check === null) {
			await queries.Insert(colours.TableName, colours.Columns, [colours_id,
				req.body[i].Colours]);
		}
	
		else {
			colours_id = colours_check[0].ColourID;
		}
	
	
		//AU/NZ Code
		aunzcode = new Table(await queries.GetAllInfo("AU/NZ_Code"));
	
		aunzcode_id = aunzcode.Count;
	
		aunzcode_check = await queries.Search(aunzcode.TableName, [req.body[i].AUNZ_Code]);
	
		if (aunzcode_check === null) {
			await queries.Insert(aunzcode.TableName, aunzcode.Columns, [aunzcode_id,
				req.body[i].AUNZ_Code]);
		}
	
		else {
			aunzcode_id = aunzcode_check[0].AUNZ_CodeID;
		}
	
	
		//Product Accreditation
		accredit = new Table(await queries.GetAllInfo("Product_Accreditation"));
	
		accredit_id = accredit.Count;
	
		accredit_check = await queries.Search(accredit.TableName, [req.body[i].Accreditation_Scheme]);
	
		if (accredit_check === null) {
			await queries.Insert(accredit.TableName, accredit.Columns, [accredit_id,
				req.body[i].Accreditation_Scheme]);
		}
	
		else {
			accredit_id = accredit_check[0].Product_AccreditationID;
		}
	
		//Tier Pricing
		tier = new Table(await queries.GetAllInfo("Tier_Pricing_&_Quantity"));
	
		tier_id = tier.Count;
	
		tier_check = await queries.Search(tier.TableName, [req.body[i].Tier1_Price,
			req.body[i].Tier1_Quantity, req.body[i].Tier2_Price, req.body[i].Tier2_Quantity,
			req.body[i].Tier3_Price, req.body[i].Tier3_Quantity, req.body[i].Tier4_Price,
			req.body[i].Tier4_Quantity, req.body[i].Tier5_Price, req.body[i].Tier5_Quantity
			]);
	
		if (tier_check === null) {
			await queries.Insert(tier.TableName, tier.Columns, [tier_id,
				req.body[i].Tier1_Price,
				req.body[i].Tier1_Quantity, req.body[i].Tier2_Price, req.body[i].Tier2_Quantity,
				req.body[i].Tier3_Price, req.body[i].Tier3_Quantity, req.body[i].Tier4_Price,
				req.body[i].Tier4_Quantity, req.body[i].Tier5_Price, req.body[i].Tier5_Quantity]);
		}
	
		else {
			tier_id = tier_check[0].TierID;
		}
	
		//Details
		details = new Table(await queries.GetAllInfo("Details"));
	
		details_id = details.Count;
	
		details_check = await queries.Search(details.TableName, [colours_id,
			req.body[i].Assembly_Required, req.body[i].Height, req.body[i].Width,
			req.body[i].Depth, req.body[i].Weight, req.body[i].Material,
			req.body[i].Stackable, req.body[i].Adjustability, req.body[i].Ergonomic,
			req.body[i].Mechanism, req.body[i].Lumbar_Support, req.body[i].Compatible_With,
			req.body[i].Castors, req.body[i].Lifting_Capacity, req.body[i].Max_Load_Weight,
			req.body[i].Default_Warranty, aunzcode_id, accredit_id, req.body[i].Test_Certificate_Expiry]);
	
		if (details_check === null) {
			await queries.Insert(details.TableName, details.Columns, [details_id,
				colours_id,
				req.body[i].Assembly_Required, req.body[i].Height, req.body[i].Width,
				req.body[i].Depth, req.body[i].Weight, req.body[i].Material,
				req.body[i].Stackable, req.body[i].Adjustability, req.body[i].Ergonomic,
				req.body[i].Mechanism, req.body[i].Lumbar_Support, req.body[i].Compatible_With,
				req.body[i].Castors, req.body[i].Lifting_Capacity, req.body[i].Max_Load_Weight,
				req.body[i].Default_Warranty, aunzcode_id, accredit_id, req.body[i].Test_Certificate_Expiry]);
		}
	
		else {
			details_id = details_check[0].DetailsID;
		}
	
		//Furniture	
		furniture = new Table(await queries.GetAllInfo("Furniture"));
	
		furniture_id = furniture.Count;
	
		furniture_check = await queries.Search(furniture.TableName, [req.body[i].ProductCode,
			category4_id, supplier_id, origin_id, req.body[i].Generic_Description,
			req.body[i].Long_Description, req.body[i].Unit_Price, req.body[i].MSRP_Price,
			upic_id, manufacturer_id, testing_id, certification_id, details_id, tier_id]);
	
		if (furniture_check === null) {
			await queries.Insert(furniture.TableName, furniture.Columns, [furniture_id,
				req.body[i].ProductCode,
				category4_id, supplier_id, origin_id, req.body[i].Generic_Description,
				req.body[i].Long_Description, req.body[i].Unit_Price, req.body[i].MSRP_Price,
				upic_id, manufacturer_id, testing_id, certification_id, details_id, tier_id]);
		}
	
		else {
			furniture_id = furniture_check[0].FurnitureID;
		}
	
	
		//Regions
		region = new Table(await queries.GetAllInfo("Regions"));
	
		regions_list = [];
	
		for (i = 0; i < req.body[i].ServiceRegions.length; i++) {
			regions_list.push(req.body[i].ServiceRegions[i].box1);
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
		
		for (let i = 0; i < req.body[i].ServiceRegions.length; i++) {
			await queries.Insert(serviceregion.TableName, serviceregion.Columns, [region_id_list[i],
				req.body[i].ServiceRegions[i].box2, req.body[i].ServiceRegions[i].box3, 
				serviceregion.Count, furniture_id
				]);
			serviceregion.AddCount();
		}
	
	
		//Specification
		specification = new Table(await queries.GetAllInfo("Specification"));
	
		for (let i = 0; i < req.body[i].Specification.length; i++) {
			await queries.Insert(specification.TableName, specification.Columns,
				[specification.Count, req.body[i].Specification[i].box1,
				req.body[i].Specification[i].box2, 
				furniture_id, req.body[i].Specification[i].box3,
				req.body[i].Specification[i].box4]);
	
			specification.AddCount();
		}
	}

	

}); 


module.exports = router;