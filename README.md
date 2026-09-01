# Haowen Zhang — bilingual research portfolio

A static academic portfolio for zhw970623, with English as the default. The homepage presents the introduction and CV downloads, experience, education, selected work, the directly visible real-flight video, two life photographs, granted patents, then honors and certifications. The real-flight video sits immediately after the paper/project list and starts only on request. All four homepage papers have covers: the supplied STAF-Navi and GeoDAN simulation loops, the original HiDeGS architecture figure, and the author-supplied Dual-Stream UNet / DCSI-UNet architecture figure. Research details and additional demonstrations remain on separate pages.

## Structure

- index.html: default English homepage
- zh/index.html: Chinese homepage with matching content
- en/index.html: compatibility redirect to the English homepage, preserving query and fragment
- research/index.html: research directory, papers and demonstrations
- research/staf-navi.html, geodan.html, formation-navigation.html: project articles
- experience/huawei.html: compiler work and attributed public LLVM illustration
- patents.html: four grant certificates, one publication notice and one substantive-examination notice, each with a redacted display document
- honors.html: Huawei Optical Product Line President’s Award, academic and competition honors, professional certifications, and the ICRA 2026 conference photograph
- en/research/, en/experience/, en/patents.html: corresponding English pages
- assets/documents/: separate three-page Chinese and English CVs with clickable homepage links and QR codes, plus six redacted patent display copies
- assets/compiler/: unmodified LLVM image and its license
- assets/brands/: official employer-identification marks with provenance notes
- assets/media/: optimized silent MP4 clips and JPEG posters
- assets/photos/: the author's supplied portrait, life and certificate photographs, plus official Wuhan University and BUPT affiliation marks with source notes
- assets/papers/: HiDeGS Figure 1 and the author-supplied Dual-Stream UNet / DCSI-UNet architecture image, with source attribution and full-size links
- assets/style.css, academic.css, portfolio.css: shared responsive styles
- assets/media.js: progressive, localized media controls

No build step, account credentials, remote fonts, tracking or third-party JavaScript is required. The GitHub Pages address is https://zhw970623.github.io/. GitHub Pages serves the root of the main branch; the .nojekyll file preserves the static HTML, media and PDF files without Jekyll processing.

All profile sidebars include the author's supplied LinkedIn profile. The Huawei Optical Product Line President’s Award is highlighted under home-page experience, in the bottom honors section, and on the Huawei and honors pages. No unprovided award certificate or unverified award date is added.

The public education section intentionally lists Wuhan University and Beijing University of Posts and Telecommunications only. Their official, watermark-free emblems identify affiliation and do not imply institutional endorsement. The homepage separates four granted patents from seven directly viewable honor and certification items; the bilingual detail pages provide full-size evidence views and keep the two historic Huawei credentials under professional certifications.

## Updating

Keep index.html (English) and zh/index.html (Chinese) in sync; en/index.html is only a redirect. Keep other Chinese pages and their English counterparts in sync. Paper titles must remain in their original language with original links, never translated. For each paper cover, prefer its supplied demo loop; otherwise use its original architecture figure with source attribution. Do not invent a diagram for missing material. Preserve publication status, patent evidence dates, author roles and evaluation conditions. Website patent roles use only “Inventor,” with no ranking or sole/co-inventor label; the certificate documents are unchanged. Do not describe an under-review manuscript as accepted, or a publication/examination notice as a patent grant.

Homepage demo covers are silent and play only when visible, with individual and global pause controls. Reduced-motion and data-saving preferences prevent automatic playback; manual play remains available. The real-flight video is separate and starts only on request. Media posters and no-script direct links remain available without JavaScript.

## Credits and privacy

The organization is inspired by [Yunwoo Lee's research page](https://yunwoolee94.github.io/journal/dmvc_tracker/), with original prose and implementation. No reference-site media or research claims are reused.

The compiler figure is from [LLVM's Clang Driver documentation](https://clang.llvm.org/docs/DriverInternals.html), provided under Apache-2.0 with LLVM-exception; see assets/compiler/LICENSE.txt. It is not an internal Huawei project image.

Research clips were supplied by the author and are qualitative material, not independent benchmark evidence. The author requested publication of this reviewed portfolio on 2026-08-31. Original patent PDFs are not included; the clearly marked display copies remove contact information and machine-readable codes while retaining patent identity and official seals.

The current CV downloads preserve the first three pages of each author-supplied bilingual input. A page-one footer panel adds a clickable homepage URL, a scannable QR code and the existing Huawei award; all original body text, pagination and footers are retained. The link and QR both target https://zhw970623.github.io/.

These attachments retain the author's contact details and under-review research descriptions as supplied and reviewed for this publication. The original six-page files are unchanged and are not included. Do not upload other private source documents, unpublished implementation files or employer code. No license to research media, CVs or patent content is implied by this repository.
