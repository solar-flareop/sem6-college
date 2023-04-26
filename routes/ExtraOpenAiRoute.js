const router = require("express").Router();
const {
  signatureController,
  codeExplainController,
  translateCodeController,
  sqlController,
  javascriptConverterController,
  contactExtractorController,
} = require("../controllers/ExtraOpenAiController");

//CONTACT EXTRACTOR
router.post("/contactextractor", contactExtractorController);

//SIGNATURE DETECT
router.post("/signature", signatureController);

//CODE EXPLAINER
router.post("/codeexplain", codeExplainController);

//SQL GENERATOR
router.post("/sqlgenerator", sqlController);

//CODE TRANSLATOR
router.post("/translatecode", translateCodeController);

//JS CONVERTER
router.post("/javascriptconverter", javascriptConverterController);

module.exports = router;
