const asyncHandler = require("../../utils/asyncHandler");
const OrganisationService = require("./organisationService");
class OrganisationController {

    static createOrganisation = asyncHandler(async function(req, res, next) {
        const adminID = req.user.id;
        const response = await OrganisationService.createOrganisation(req.body, adminID);
        res.status(201).json({
            status: "success",
            message: "Organisation created successfully",
            data: response
        });
    });

    static getAllOrganisations = asyncHandler(async function(req,res,next){
        const adminID = req.user.id;
        const response = await OrganisationService.getAllOrganisations(adminID);
        res.status(200).json({
            status: "success",
            message: "All organisations fetched successfully",
            data: response
        });
    });

    static getOrganisationById = asyncHandler(async function(req, res, next) {
        const { id } = req.params;
        const adminID = req.user.id;
        const response = await OrganisationService.getOrganisationById(id, adminID);
        res.status(200).json({
            status: "success",
            message: "Organisation fetched successfully",
            data: response
        });
    });

    static updateOrganisation = asyncHandler(async function(req, res, next) {
        const { id } = req.params;
        const adminID = req.user.id;
        const response = await OrganisationService.updateOrganisation(id, req.body, adminID);
        res.status(200).json({
            status: "success",
            message: "Organisation updated successfully",
            data: response
        });
    });

    static deleteOrganisation = asyncHandler(async function(req, res, next) {
        const { id } = req.params;
        const adminID = req.user.id;
        await OrganisationService.deleteOrganisation(id, adminID);
        res.status(200).json({
            status: "success",
            message: "Organisation deleted successfully",
            data: null
        });
    });
};





module.exports = OrganisationController;