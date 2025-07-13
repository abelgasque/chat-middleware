import ApiResponse from "../entities/responses/api.response.js"
import SupersetService from "../services/superset.service.js";

/**
 * @swagger
 * tags:
 *   name: Superset
 *   description: Dashboards do superset
 */
class SupersetController {
    constructor() {
        this.supersetService = new SupersetService();
    }

    guestToken = async (req, res, next) => {
        try {
            const { id, clauses } = req.body;
            return res.status(200).json(await this.supersetService.getGuestToken(id, clauses));
        } catch (error) {
            next(error);
        }
    };
}

export default SupersetController;