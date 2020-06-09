const router = require("express").Router();
const {
  addPage,
  retrievePage,
  setPageMarkdown,
  listPage,
} = require("../controller/page");

router.get("/", listPage);
router.post("/", addPage);
router.patch("/:id", setPageMarkdown);
router.get("/:id", retrievePage);

module.exports = router;
