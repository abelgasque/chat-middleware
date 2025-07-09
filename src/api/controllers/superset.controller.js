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
            return res.status(200).json(await this.supersetService.getGuestToken());
        } catch (error) {
            next(error);
        }
    };
}

export default SupersetController;