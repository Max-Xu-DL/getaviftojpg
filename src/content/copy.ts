export const steps = [
  {
    title: "Add your files",
    body: "Drop one or more .avif images on the box above, or choose them with the file picker. Up to 30 files is fine. Other file types are listed with an error.",
  },
  {
    title: "Set the quality",
    body: "The slider starts at 92. Drag it and release to encode the list again. The number is the JPEG quality factor, not a percentage of the AVIF file size.",
  },
  {
    title: "Download the JPG",
    body: "Save a single file, or use Download all and allow multiple downloads if the browser asks. Each file keeps its name and gains a .jpg extension. The original AVIF is not modified.",
  },
] as const;

export const guideSections = [
  {
    id: "what-avif",
    title: "What AVIF is",
    paragraphs: [
      "AVIF (AV1 Image File Format) stores photographs and graphics with the AV1 video codec. At a similar visual quality it is usually much smaller than JPEG, and it can also hold transparency, animation, wide-gamut color, and more than 8 bits per channel. Chrome, Edge, Firefox, and Safari display it, which is why websites and phones have started using it.",
      "Many desktop apps and upload forms still ask for JPEG. Windows Photos on an older PC, Word, a school portal, a marketplace, or a print shop may refuse an AVIF. When the picker greys the file out, a .jpg is the straightforward fix.",
    ],
  },
  {
    id: "why-jpg",
    title: "Why convert to JPG",
    paragraphs: [
      "JPEG has been the default photo format since the early 1990s, and almost every camera, browser, office app, and social network accepts it. It is lossy: a quality setting decides how much fine detail the encoder may discard. JPEG has no transparency, so the picture is flat, which is what a headshot, a product shot, or a scanned form is expected to be.",
      "A conversion is a second encode. The AVIF was already compressed, and writing a JPG compresses those pixels again, so a little detail can soften and the new file is often larger. That size increase is normal. AVIF is simply the more efficient codec. Keep the original if you might edit or print later, and use the JPG as the copy you share.",
      "This page does not resize, crop, rotate, or sharpen. It keeps the original pixel dimensions and only changes the format. The slider starts at 92. Use 75 to 80 if an upload has a size cap. A setting of 100 is still lossy.",
    ],
  },
  {
    id: "how-to",
    title: "How to convert AVIF to JPG",
    paragraphs: [
      "Use the converter at the top of this page.",
      "On a phone, tap Choose AVIF files and pick the image from Photos or Files. The JPG downloads, or the phone opens a share sheet when that is how it saves files.",
      "The page decodes with createImageBitmap, which uses the browser’s built-in AVIF decoder in Chromium, Firefox, and Safari. If that call fails, it loads the file in an image element and draws from there. Pixels are painted on a canvas and encoded as JPEG at the quality you chose. No plugin and no extra decoder are downloaded.",
    ],
  },
  {
    id: "file-changes",
    title: "What changes in the file",
    paragraphs: [
      "Transparent pixels are painted on white, because JPEG has no alpha channel. If you need a clear background, use PNG instead. An animated AVIF becomes a still of the first frame. This tool does not export every frame.",
      "Color goes through the canvas, normally as sRGB, which matches the web and most upload forms. AVIF can store a wider gamut than a standard JPEG. If you are preparing a print master and that extra range matters, convert in a desktop editor and choose the profile there.",
      "EXIF, GPS, the camera model, and color profiles are not copied. The canvas writes pixels only, which also means a location tag is not carried into the JPG. If you still need a caption or a copyright line inside the file, copy it yourself.",
      "Very large images can fail when they exceed the browser’s canvas limit. The file row shows the error instead of an empty download. Resize the AVIF elsewhere and try again.",
    ],
  },
  {
    id: "when-not",
    title: "When JPG is the wrong file",
    paragraphs: [
      "Keep the AVIF if the destination already accepts AVIF or WebP. You will send less data and usually keep more detail. Choose PNG for screenshots, logos, and transparency, where a second lossy pass only softens hard edges. Convert to JPG when a person or a form has asked for JPEG and will not take the file you already have.",
    ],
  },
  {
    id: "privacy-notes",
    title: "Privacy",
    paragraphs: [
      "Files stay on your device. The site sends this page and the script that talks to the canvas. When Vercel Web Analytics is enabled for the project, it can also receive a page view and conversion counts, not the picture, the file name, or the JPG. There is no account and no upload address. Closing the tab drops the in-memory previews. The host can still log an IP address and a browser name, as any public site does. Those logs cannot contain your photos, because the photos never leave the browser.",
    ],
  },
] as const;

export const faqs = [
  {
    question: "Is the AVIF to JPG converter free?",
    answer:
      "Yes. There is no account, no watermark, and no daily cap. The page is a free tool for turning AVIF files into JPG files in your browser.",
  },
  {
    question: "Are my images uploaded to a server?",
    answer:
      "No. The file is read on your device, decoded by the browser, and saved as a new JPG. getaviftojpg.com has no image upload. Closing the tab discards the preview.",
  },
  {
    question: "Which browsers can convert AVIF?",
    answer:
      "Current Chrome, Edge, Firefox, and Safari can decode AVIF and encode JPEG. That includes recent iPhone and Android browsers. If a file fails, update the browser. This page does not ship a fallback decoder for very old browsers.",
  },
  {
    question: "Why is the JPG larger than the AVIF?",
    answer:
      "AVIF usually compresses a photograph more tightly than JPEG. A high quality setting, such as the default 92, often produces a bigger file than the AVIF you started with. Lower the slider if you need a smaller JPG. The picture keeps the same pixel dimensions either way.",
  },
  {
    question: "What quality setting should I use?",
    answer:
      "Start at 92 for a photo you want to look close to the original. Use 75 to 80 when a form limits file size. Use 100 only when you want the least aggressive JPEG the browser can write. The slider is the encoder’s quality factor, not a percent of the AVIF’s file size, and 100 is still lossy.",
  },
  {
    question: "Does it keep transparency, animation, or EXIF?",
    answer:
      "No. Transparent pixels are drawn on white, because JPEG has no alpha channel. An animated AVIF exports the first frame only. EXIF, GPS, camera data, and color profiles are not copied. The JPG contains the pixels and nothing else.",
  },
  {
    question: "Can I convert more than one file?",
    answer:
      "Yes. Drop a batch or select several .avif files, up to 30 at a time. Each file is converted on its own. Other file types are listed with an error so they are not renamed as if they were AVIF.",
  },
  {
    question: "Will this change my original AVIF?",
    answer:
      "No. The download is a new JPG. The AVIF stays where it was, at its original size and name.",
  },
] as const;
