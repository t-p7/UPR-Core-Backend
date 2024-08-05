var express = require('express');
var router = express.Router();

router.post("/new/furniture", function (req, res, next) {

	const furniture_insert = sql`
		INSERT INTO Furniture (
    		FurnitureID, ProductCode, Category_4ID, SupplierID, OriginID, 
    		Generic_Description, Short_Description, Long_Description, Unit_Price, 
    		MSRP_Price, UPIC, ManufacturerID, Testing_AgencyID, DetailsID, TierID
		) VALUES (
		    ${req.body.FurnitureID}, ${req.body.ProductCode}, ${category4}, ${req.body.SupplierID}, ${req.body.OriginID}, 
    		${req.body.Generic_Description}, ${req.body.Short_Description}, ${req.body.Long_Description}, ${req.body.Unit_Price}, 
    		${req.body.MSRP_Price}, ${req.body.UPIC}, ${req.body.ManufacturerID}, ${req.body.Testing_AgencyID}, ${req.body.DetailsID}, ${req.body.TierID}
		);
		
		-- Suppliers 
		INSERT INTO Suppliers (
		    SupplierID, SupplierName, ABN, Contact, Phone, Mobile, Email, Website
		) VALUES (
		    ${req.body.SupplierID}, ${req.body.SupplierName}, ${req.body.ABN}, ${req.body.Contact}, ${req.body.Phone}, ${req.body.Mobile}, 
		    ${req.body.Email}, ${req.body.Website}
		);
		
		-- Origin table
		INSERT INTO Origin (
		    OriginID, Country_of_Origin, Origin_of_Imported_Products, Australian_Made, 
		    Product_of_Australia, SME, Aboriginal_TorresStraitIslander_Content, Recycled_Content
		) VALUES (
		    ${req.body.OriginID}, ${req.body.Country_of_Origin}, ${req.body.Origin_of_Imported_Products}, ${req.body.Australian_Made}, 
		    ${req.body.Product_of_Australia}, ${req.body.SME}, ${req.body.Aboriginal_TorresStraitIslander_Content}, ${req.body.Recycled_Content}
		);
		
		-- Manufacturer table
		INSERT INTO Manufacturer (
		    ManufacturerID, ManufacturerName
		) VALUES (
		    ${req.body.ManufacturerID}, ${req.body.ManufacturerName}
		);
		
		-- Testing Agency Table
		INSERT INTO Testing_Agency (
		    Testing_AgencyID, Testing_AgencyName
		) VALUES (
		    ${req.body.Testing_AgencyID}, ${req.body.Testing_AgencyName}
		);
		
		-- Category Tables (Category, Category2, Category3, Category4)
		INSERT INTO Category (
		    CategoryID, CategoryName, CategoryDescription
		) VALUES (
		    ${req.body.CategoryID}, ${req.body.CategoryName}, ${req.body.CategoryDescription}
		);
		
		INSERT INTO Category2 (
		    Category_2ID, Category_2Name, Category_2Description, CategoryID
		) VALUES (
		    ${req.body.Category_2ID}, ${req.body.Category_2Name}, ${req.body.Category_2Description}, ${req.body.CategoryID}
		);
		
		INSERT INTO Category3 (
		    Category_3ID, Category_3Name, Category_3Description, Category_2ID
		) VALUES (
		    ${req.body.Category_3ID}, ${req.body.Category_3Name}, ${req.body.Category_3Description}, ${req.body.Category_2ID}
		);
		
		INSERT INTO Category4 (
		    Category_4ID, Category_4Name, Category_4Description, Category_3ID
		) VALUES (
		    ${req.body.Category_4ID}, ${req.body.Category_4Name}, ${req.body.Category_4Description}, ${req.body.Category_3ID}
		);
		
		-- Details Table
		INSERT INTO Details (
		    DetailsID, ColourID, Assembly_Required, Height, Depth, Width, 
		    Weight, Material, Stackable, Adjustability, Ergonomic, Mechanism, Lumbar_Support, 
		    Compatible_With, Castors, Lifting_Capacity, Max_Load_Weight, Default_Warranty, 
		    AUNZ_CodeID, Product_AccreditationID, Test_Certificate_Expiry
		) VALUES (
		    ${req.body.DetailsID}, ${req.body.ColourID}, ${req.body.Assembly_Required}, ${req.body.Height}, ${req.body.Depth}, ${req.body.Width}, 
		    ${req.body.Weight}, ${req.body.Material}, ${req.body.Stackable}, ${req.body.Adjustability}, ${req.body.Ergonomic}, ${req.body.Mechanism}, ${req.body.Lumbar_Support}, 
		    ${req.body.Compatible_With}, ${req.body.Castors}, ${req.body.Lifting_Capacity}, ${req.body.Max_Load_Weight}, ${req.body.Default_Warranty}, 
		    ${req.body.AUNZ_CodeID}, ${req.body.Product_AccreditationID}, ${req.body.Test_Certificate_Expiry}
		);
		
		-- Colours Table
		INSERT INTO Colours (
		    ColourID, ColourDescription
		) VALUES (
		    ${req.body.ColourID}, ${req.body.ColourDescription}
		);
		
		-- AU/NZ Code Table
		INSERT INTO AUNZ_Code (
		    AUNZ_CodeID, AUNZ_Code
		) VALUES (
		    ${req.body.AUNZ_CodeID}, ${req.body.AUNZ_Code}
		);
		
		-- Product Accreditation Table
		INSERT INTO Product_Accreditation (
		    Product_AccreditationID, Product_Accreditation_Scheme
		) VALUES (
		    ${req.body.Product_AccreditationID}, ${req.body.Product_Accreditation_Scheme}
		);

	`

}); 


module.exports = router;