const express = require("express");
const OrganisationController = require("./organisationController");
const adminAuth = require("../../middleware/adminAuth");
const router = express.Router();

router.use(adminAuth);

router.post("/org", OrganisationController.createOrganisation);
router.get("/org", OrganisationController.getAllOrganisations);
router.get("/org/:id", OrganisationController.getOrganisationById);
router.put("/org/:id", OrganisationController.updateOrganisation);
router.delete("/org/:id", OrganisationController.deleteOrganisation);

module.exports = router;