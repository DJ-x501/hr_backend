const AppError = require("../../utils/AppError");
const { prisma } = require("../../configs/database");


class OrganisationService {

    static async createOrganisation(data, adminID) {
        const { name, email, contact, ...rest } = data;
        
        if (!name || !email || !contact) {
            throw new AppError("Name, email, and contact are required fields", 400);
        }

        const existingOrg = await prisma.organization.findFirst({
            where: {
                OR: [
                    { email: email },
                    { contact: contact }
                ]
            }
        });

        if (existingOrg) {
            throw new AppError("Organisation with this email or contact already exists", 400);
        }

        const newOrg = await prisma.organization.create({
            data: {
                name,
                email,
                contact,
                ...rest,
                adminID: adminID
            }
        });

        return newOrg;
    }

    static async getAllOrganisations(adminID) {
        const data = await prisma.organization.findMany({
            where: { adminID: adminID }
        });
        return data;
    }

    static async getOrganisationById(id, adminID) {
        const orgId = parseInt(id, 10);

        if (isNaN(orgId)) {
            throw new AppError("Invalid Organisation ID", 400);
        }

        const data = await prisma.organization.findFirst({
            where: { 
                id: orgId,
                adminID: adminID
            }
        });

        if (!data) {
            throw new AppError("Organisation not found", 404);
        }

        return data;
    }

    static async updateOrganisation(id, data, adminID) {
        const org = await this.getOrganisationById(id, adminID);
        const { id: _id, adminID: _adminID, ...updateData } = data; // Prevent arbitrary field override

        if (updateData.email !== undefined || updateData.contact !== undefined) {
            const orConditions = [];
            if (updateData.email) orConditions.push({ email: updateData.email });
            if (updateData.contact) orConditions.push({ contact: updateData.contact });

            if (orConditions.length > 0) {
                const existingOrg = await prisma.organization.findFirst({
                    where: {
                        OR: orConditions,
                        NOT: { id: org.id }
                    }
                });

                if (existingOrg) {
                    throw new AppError("Another organisation with this email or contact already exists", 400);
                }
            }
        }

        const updatedOrg = await prisma.organization.update({
            where: { id: org.id },
            data: updateData
        });

        return updatedOrg;
    }

    static async deleteOrganisation(id, adminID) {
        const org = await this.getOrganisationById(id, adminID);

        await prisma.organization.delete({
            where: { id: org.id }
        });

        return true;
    }
}

module.exports = OrganisationService;