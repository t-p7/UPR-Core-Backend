var express = require('express');
var router = express.Router();

router.post("/search/general", async function (req, res) {

	var select = `SELECT 
    	"Furniture"."FurnitureID", "Furniture"."ProductCode", "Suppliers"."SuppliersName",
    	"Origin"."Origin_of_Imported_Porducts", "UPIC"."UPIC"
		FROM 
		    "Furniture", "Suppliers", "Origin", "Manufactuerer", "Testing_Agency",
		    "Details", "Colours", "AUNZ_Code", "Product_Accreditation",
		    "Certification", "Specification", "Service_Regions", "Countries",
		    "Regions", "Category4", "Category3", "Category2", "Category",
		    "UPIC", "Tier_Pricing_Quantity"
		JOIN 
		    "Suppliers" ON "Furniture"."SupplierID" = "Suppliers"."SupplierID"
		JOIN 
		    "Origin" ON "Furniture"."OriginID" = "Origin"."OriginID"
		JOIN 
		    "Manufacturer" ON "Furniture"."ManufacturerID" = "Manufacturer"."ManufacturerID"
		JOIN 
		    "Testing_Agency" ON "Furniture"."Testing_AgencyID" = "Testing_Agency"."Testing_AgencyID"
		JOIN 
		    "Details" ON "Furniture"."DetailsID" = "Details"."DetailsID"
		JOIN 
		    "Colours" ON "Details"."ColourID" = "Colours"."ColourID"
		JOIN 
		    "AUNZ_Code" ON "Details"."AUNZ_CodeID" = "AUNZ_Code"."AUNZ_CodeID"
		JOIN 
		    "Product_Accreditation" ON "Details"."Product_AccreditationID" = "Product_Accreditation"."Product_AccreditationID"
		JOIN 
		    "Certification" ON "Furniture"."FurnitureID" = "Certification"."FurnitureID"
		JOIN 
		    "Specification" ON "Furniture"."FurnitureID" = "Specification"."FurnitureID"
		JOIN 
		    "Service_Regions" ON "UPIC"."Service_RegionsID" = "Service_Regions"."Service_RegionID"
		JOIN 
		    "Countries" ON "Origin"."Country_of_Origin" = "Countries"."CountryID"
		JOIN 
		    "Regions" ON "Service_Regions"."Service_RegionID" = "Regions"."RegionID"
		JOIN 
		    "Category4" ON "Furniture"."Category_4ID" = "Category4"."Category_4ID"
		JOIN 
		    "Category3" ON "Category4"."Category_3ID" = "Category3"."Category_3ID"
		JOIN 
		    "Category2" ON "Category3"."Category_2ID" = "Category2"."Category_2ID"
		JOIN 
		    "Category" ON Category2.CategoryID = Category.CategoryID
		JOIN 
		    "UPIC" ON "Furniture"."UPIC" = "UPIC"."UPIC"
		JOIN 
		    "Tier_Pricing_Quality" ON "Furniture"."TierID" = "Tier_Pricing_Quantity"."TierID"
		JOIN 
    "Delivery_Service_Region_Pricing" ON "Regions"."RegionID" = "Delivery_Service_Region_Pricing"."RegionID"`;

	if (req.body.hasOwnProperty('ProductCode')) {
		search = sql`${sql.unsafe(select)} WHERE "Furniture"."ProductCode" = '${sql.unsafe(req.body.ProductCode)}';`;
		res.json({search});
	}

	else if (req.body.hasOwnProperty('Category_4Name')) {
		search = sql`${sql.unsafe(select)} WHERE "Furniture"."Category_4ID" = 
			(SELECT "Category_4ID" FROM "Category4" WHERE LOWER("Category4"."Category_4Name") LIKE '%${sql.unsafe(req.body.Category_4)}%');`;
		res.json({search});
	}

	else if (req.body.hasOwnProperty('Category_3Name')) {
		search = sql`${sql.unsafe(select)} WHERE "Furniture"."Category_4ID" = 
			(SELECT "Category_4ID" FROM "Category4" WHERE "Category4"."Category_3ID" IN 
			(SELECT "Category3"."Category_3ID" FROM "Category3" WHERE "Category_3Name" LIKE '%${sql.unsafe(req.body.Category_3)}%');`;
		res.json({search});
	}

	else if (req.body.hasOwnProperty('Category_2Name')) {
		search = sql`${sql.unsafe(select)} WHERE "Furniture"."Category_4ID" = 
			(SELECT "Category_4ID" FROM "Category4" WHERE "Category4"."Category_3ID" IN 
			(SELECT "Category3"."Category_3ID" FROM "Category3" WHERE "Category_2ID" IN 
			(SELECT "Category2"."Category_2" FROM "Category" WHERE "Category_2Name" LIKE '%${sql.unsafe(req.body.Category_2)}%'));`;
		res.json({search});
	}

	else if (req.body.hasOwnProperty('CategoryName')) {
		search = sql`${sql.unsafe(select)} WHERE "Furniture"."Category_4ID" = 
			(SELECT "Category_4ID" FROM "Category4" WHERE "Category4"."Category_3ID" IN 
			(SELECT "Category3"."Category_3ID" FROM "Category3" WHERE "Category3"."Category_2ID" IN 
			(SELECT "Category2"."Category_2ID" FROM "Category2" WHERE "Category2"."CategoryID" IN
			(SELECT "Category"."CategoryID" FROM "Category" WHERE "Category"."CategoryName" LIKE '%${sql.unsafe(req.body.Category)}%')));`;
		res.json({search});
	}

	else {
		res.json({message: "No viable parameters found"});
	}
	
});

router.post("search/:id", async function (req, res) {
	var search = sql`SELECT 
    	* 
		FROM 
		    "Furniture", "Suppliers", "Origin", "Manufactuerer", "Testing_Agency",
		    "Details", "Colours", "AUNZ_Code", "Product_Accreditation",
		    "Certification", "Specification", "Service_Regions", "Countries",
		    "Regions", "Category4", "Category3", "Category2", "Category",
		    "UPIC", "Tier_Pricing_Quantity"
		JOIN 
		    "Suppliers" ON "Furniture"."SupplierID" = "Suppliers"."SupplierID"
		JOIN 
		    "Origin" ON "Furniture"."OriginID" = "Origin"."OriginID"
		JOIN 
		    "Manufacturer" ON "Furniture"."ManufacturerID" = "Manufacturer"."ManufacturerID"
		JOIN 
		    "Testing_Agency" ON "Furniture"."Testing_AgencyID" = "Testing_Agency"."Testing_AgencyID"
		JOIN 
		    "Details" ON "Furniture"."DetailsID" = "Details"."DetailsID"
		JOIN 
		    "Colours" ON "Details"."ColourID" = "Colours"."ColourID"
		JOIN 
		    "AUNZ_Code" ON "Details"."AUNZ_CodeID" = "AUNZ_Code"."AUNZ_CodeID"
		JOIN 
		    "Product_Accreditation" ON "Details"."Product_AccreditationID" = "Product_Accreditation"."Product_AccreditationID"
		JOIN 
		    "Certification" ON "Furniture"."FurnitureID" = "Certification"."FurnitureID"
		JOIN 
		    "Specification" ON "Furniture"."FurnitureID" = "Specification"."FurnitureID"
		JOIN 
		    "Service_Regions" ON "UPIC"."Service_RegionsID" = "Service_Regions"."Service_RegionID"
		JOIN 
		    "Countries" ON "Origin"."Country_of_Origin" = "Countries"."CountryID"
		JOIN 
		    "Regions" ON "Service_Regions"."Service_RegionID" = "Regions"."RegionID"
		JOIN 
		    "Category4" ON "Furniture"."Category_4ID" = "Category4"."Category_4ID"
		JOIN 
		    "Category3" ON "Category4"."Category_3ID" = "Category3"."Category_3ID"
		JOIN 
		    "Category2" ON "Category3"."Category_2ID" = "Category2"."Category_2ID"
		JOIN 
		    "Category" ON Category2.CategoryID = Category.CategoryID
		JOIN 
		    "UPIC" ON "Furniture"."UPIC" = "UPIC"."UPIC"
		JOIN 
		    "Tier_Pricing_Quality" ON "Furniture"."TierID" = "Tier_Pricing_Quantity"."TierID"
		JOIN 
    "Delivery_Service_Region_Pricing" ON "Regions"."RegionID" = "Delivery_Service_Region_Pricing"."RegionID"
    WHERE "Furniture"."FurnitureID" = ${sql.unsafe(req.params.id)};`;

    if (search.length === 0) {
    	res.status(404).json({message: "Furniture ID not found"});
    }

    else {
    	res.status(200).json({search});
    }

})

module.exports = router;