var express = require('express');
var router = express.Router();

router.post("/search/general", async function (req, res) {

	var select = `SELECT 
        "Furniture"."FurnitureID", "Furniture"."ProductCode", "Supplier"."SupplierName",
        "Origin"."Origin_of_Imported_Products", "UPIC"."UPIC", "Furniture"."Unit_Price",
        "Furniture"."MSRP_Price"
        FROM 
            "Furniture"
        JOIN 
            "Supplier" ON "Furniture"."SupplierID" = "Supplier"."SupplierID"
        JOIN 
            "Origin" ON "Furniture"."OriginID" = "Origin"."OriginID"
        JOIN 
            "UPIC" ON "Furniture"."UPIC" = "UPIC"."UPIC"
        `;

	if (req.body.hasOwnProperty('ProductCode')) {
		search = await sql`${sql.unsafe(select)} WHERE "Furniture"."ProductCode" = '${sql.unsafe(req.body.ProductCode)}';`;
		res.json({search});
	}

	else if (req.body.hasOwnProperty('Category_4Name')) {
		search = await sql`${sql.unsafe(select)} WHERE "Furniture"."Category_4ID" = 
			(SELECT "Category_4ID" FROM "Category4" WHERE LOWER("Category4"."Category_4Name") LIKE '%${sql.unsafe(req.body.Category_4Name)}%');`;
		res.json({search});
	}

	else if (req.body.hasOwnProperty('Category_3Name')) {
		search = await sql`${sql.unsafe(select)} WHERE "Furniture"."Category_4ID" = 
			(SELECT "Category_4ID" FROM "Category4" WHERE "Category4"."Category_3ID" IN 
			(SELECT "Category3"."Category_3ID" FROM "Category3" WHERE "Category_3Name" LIKE '%${sql.unsafe(req.body.Category_3Name)}%'));`;
		res.json({search});
	}

	else if (req.body.hasOwnProperty('Category_2Name')) {
		search = await sql`${sql.unsafe(select)} WHERE "Furniture"."Category_4ID" = 
			(SELECT "Category_4ID" FROM "Category4" WHERE "Category4"."Category_3ID" IN 
			(SELECT "Category3"."Category_3ID" FROM "Category3" WHERE "Category_2ID" IN 
			(SELECT "Category2"."Category_2" FROM "Category" WHERE "Category_2Name" LIKE '%${sql.unsafe(req.body.Category_2Name)}%')));`;
		res.json({search});
	}

	else if (req.body.hasOwnProperty('CategoryName')) {
		search = await sql`${sql.unsafe(select)} WHERE "Furniture"."Category_4ID" = 
			(SELECT "Category_4ID" FROM "Category4" WHERE "Category4"."Category_3ID" IN 
			(SELECT "Category3"."Category_3ID" FROM "Category3" WHERE "Category3"."Category_2ID" IN 
			(SELECT "Category2"."Category_2ID" FROM "Category2" WHERE "Category2"."CategoryID" IN
			(SELECT "Category"."CategoryID" FROM "Category" WHERE "Category"."CategoryName" LIKE '%${sql.unsafe(req.body.CategoryName)}%'))));`;
		res.json({search});
	}

	else {
		res.json({message: "No viable parameters found"});
	}
	
});

router.post("search/:id", async function (req, res) {
	const search = await sql`SELECT 
    	* 
		FROM 
		    "Furniture"
		JOIN 
		    "Supplier" ON "Furniture"."SupplierID" = "Supplier"."SupplierID"
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
		    "AU/NZ_Code" ON "Details"."AUNZ_CodeID" = "AU/NZ_Code"."AUNZ_CodeID"
		JOIN 
		    "Product_Accreditation" ON "Details"."Product_AccreditationID" = "Product_Accreditation"."Product_AccreditationID"
		JOIN 
		    "Certification" ON "Furniture"."FurnitureID" = "Certification"."FurnitureID"
		JOIN 
		    "Specification" ON "Furniture"."FurnitureID" = "Specification"."FurnitureID"
		JOIN 
		    "Countries" ON "Origin"."CountryID" = "Countries"."CountryID"
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
		    "Tier_Pricing_Quantity" ON "Furniture"."TierID" = "Tier_Pricing_Quantity"."TierID"
    WHERE "Furniture"."FurnitureID" = ${sql.unsafe(req.params.id)};`;

    const region_pricing = await sql`
    SELECT * FROM "Delivery_&_Service_Region_Pricing"
    JOIN "Regions" ON "Delivery_&_Service_Region_Pricing"."RegionID" = "Regions"."RegionID" 
    WHERE "Delivery_&_Service_Region_Pricing"."FurnitureID" = ${sql.unsafe(search.FurnitureID)}
    `;

    const specification = await sql`
    SELECT * FROM "Specification"
    WHERE "Specification"."FurnitureID" = ${sql.unsafe(search.FurnitureID)}
    `;

    if (search.length === 0) {
    	res.status(404).json({message: "Furniture ID not found"});
    }

    else {
    	res.status(200).json({search, region_pricing, specification});
    }

})

module.exports = router;