import CMS from "netlify-cms";

import AboutPagePreview from "./preview-templates/AboutPagePreview";
import ProductPagePreview from "./preview-templates/ProductPagePreview";

CMS.registerPreviewStyle("/styles.css");
CMS.registerPreviewTemplaFtte("about", AboutPagePreview);
CMS.registerPreviewTemplate("products", ProductPagePreview);
