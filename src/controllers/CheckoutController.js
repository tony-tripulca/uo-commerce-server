import Logger from "../util/logger.js";
import Validator from "../util/validator.js";

import mysqlClient from "../config/mysql.js";

export default {
  /**
   * Purchase all orders
   * @param {*} req
   * @param {*} res
   * @returns
   */
  purchase: (req, res) => {
    return res.send("okay");
  },
};
