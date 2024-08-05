var express = require('express');
var router = express.Router();

router.get("/search", function (req, res, next) {

	const select = `SELECT 
    	* 
		FROM 
		    Furniture
		JOIN 
		    Suppliers ON Furniture.SupplierID = Suppliers.SupplierID
		JOIN 
		    Origin ON Furniture.OriginID = Origin.OriginID
		JOIN 
		    Manufacturer ON Furniture.ManufacturerID = Manufacturer.ManufacturerID
		JOIN 
		    Testing_Agency ON Furniture.Testing_AgencyID = Testing_Agency.Testing_AgencyID
		JOIN 
		    Details ON Furniture.DetailsID = Details.DetailsID
		JOIN 
		    Colours ON Details.ColourID = Colours.ColourID
		JOIN 
		    AUNZ_Code ON Details.AUNZ_CodeID = AUNZ_Code.AUNZ_CodeID
		JOIN 
		    Product_Accreditation ON Details.Product_AccreditationID = Product_Accreditation.Product_AccreditationID
		JOIN 
		    Certification ON Furniture.FurnitureID = Certification.FurnitureID
		JOIN 
		    Specification ON Furniture.FurnitureID = Specification.FurnitureID
		JOIN 
		    Service_Regions ON UPIC.Service_RegionsID = Service_Regions.Service_RegionID
		JOIN 
		    Countries ON Origin.Country_of_Origin = Countries.CountryID
		JOIN 
		    Regions ON Service_Regions.Service_RegionID = Regions.RegionID
		JOIN 
		    Category4 ON Furniture.Category_4ID = Category4.Category_4ID
		JOIN 
		    Category3 ON Category4.Category_3ID = Category3.Category_3ID
		JOIN 
		    Category2 ON Category3.Category_2ID = Category2.Category_2ID
		JOIN 
		    Category ON Category2.CategoryID = Category.CategoryID
		JOIN 
		    UPIC ON Furniture.UPIC = UPIC.UPIC
		JOIN 
		    Tier_Pricing_Quality ON Furniture.TierID = Tier_Pricing_Quality.TierID
		JOIN 
    Delivery_Service_Region_Pricing ON Regions.RegionID = Delivery_Service_Region_Pricing.RegionID`;

	if (req.body.hasOwnProperty('ProductCode')) {
		search = sql`${select} WHERE Furniture.ProductCode = '${req.body.ProductCode}';`;
		res.json({search});
	}

	else if (req.body.hasOwnProperty('Category_4Name')) {
		search = sql`${select} WHERE Furniture.Category_4ID = 
			(SELECT Category_4ID FROM Category4 WHERE LOWER(Category4.Category_4Name) LIKE '%${req.body.Category_4}%');`;
		res.json({search});
	}

	else if (req.body.hasOwnProperty('Category_3Name')) {
		search = sql`${select} WHERE Furniture.Category_4ID = 
			(SELECT Category_4ID FROM Category4 WHERE Category4.Category_3ID IN 
			(SELECT Category3.Category_3ID FROM Category3 WHERE Category_3Name LIKE '%${req.body.Category_3}%');`;
		res.json({search});
	}

	else if (req.body.hasOwnProperty('Category_2Name')) {
		search = sql`${select} WHERE Furniture.Category_4ID = 
			(SELECT Category_4ID FROM Category4 WHERE Category4.Category_3ID IN 
			(SELECT Category3.Category_3ID FROM Category3 WHERE Category_2ID IN 
			(SELECT Category2.Category_2 FROM Category WHERE Category_2Name LIKE '%${req.body.Category_2}%'));`;
		res.json({search});
	}

	else if (req.body.hasOwnProperty('CategoryName')) {
		search = sql`${select} WHERE Furniture.Category_4ID = 
			(SELECT Category_4ID FROM Category4 WHERE Category4.Category_3ID IN 
			(SELECT Category3.Category_3ID FROM Category3 WHERE Category3.Category_2ID IN 
			(SELECT Category2.Category_2ID FROM Category2 WHERE Category2.CategoryID IN
			(SELECT Category.CategoryID FROM Category WHERE Category.CategoryID LIKE '%${req.body.Category}%')));`;
		res.json({search});
	}

	else {
		res.json({message: "No viable parameters found"});
	}
	
}); 

module.exports = router;