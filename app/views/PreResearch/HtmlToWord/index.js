import React, { useEffect } from "react";
import htmlDocx from "html-docx-js/dist/html-docx";
import exportWord from "js-export-word";
import { saveAs } from "file-saver";
// import { Document, Packer, Parser } from "html-docx-js";
import { Packer, Paragraph, TextRun, parseHtml, Document, Parser } from "docx";
import Watermarker from "watermark-dom";

const HtmlToWord = () => {
  const exportToWord = () => {
    var content = document.getElementById("contentWrap").innerHTML;

    var header =
      "<!DOCTYPE html><html xmlns:o='urn:schemas-microsoft-com:office:office' " +
      "xmlns:w='urn:schemas-microsoft-com:office:word' " +
      "xmlns='http://www.w3.org/TR/REC-html40'>" +
      "<head><style>.watermark {position: absolute;top: 50%;left: 50%;transform: translate(-50%, -50%);opacity: 0.3; /* 控制水印的透明度 */font-size: 100px; /* 控制水印字体大小 */font-weight: bold;color: gray; /* 控制水印颜色 */width: 100%;pointer-events: none; /* 确保水印不影响文档内容的选择和点击 */z-index: -1; /* 确保水印位于内容之后 */text-align: center;}#content {position: relative;z-index: 1; /* 确保内容位于水印之上 */}</style></head><body>";

    var footer = "</body></html>";

    var sourceHTML = header + content + footer;
    // const doc = new Document({
    //   sections: [
    //     {
    //       properties: {},
    //       children: [new Parser().parse(sourceHTML)],
    //     },
    //   ],
    // });
    var blob = htmlDocx.asBlob(sourceHTML);
    // 创建一个新的Word文档
    const documentEl = new Document({
      sections: [
        {
          properties: {},
          // children: [new Parser().parse(sourceHTML)],
          children: [sourceHTML],
        },
      ],
    });
    console.log(documentEl, "documentEl");
    // documentEl.createParagraph({
    //   alignment: "center",
    //   children: [
    //     {
    //       bold: true,
    //       fontSize: 36,
    //       text: "11111",
    //     },
    //   ],
    //   spacing: {
    //     after: 200,
    //     before: 0,
    //   },
    //   wrap: {
    //     type: "none",
    //   },
    // });

    // // 将Docx内容添加到文档中
    // documentEl.addSection({
    //   children: [
    //     {
    //       media: {
    //         preprocess: (content) => content,
    //         source: sourceHTML,
    //         type: "blob",
    //       },
    //     },
    //   ],
    // });
    saveAs(blob, "document.doc");
    // createWatermarkedDocument(sourceHTML, "1111");
  };

  const createWatermarkedDocument = (htmlContent, watermarkText) => {
    // 将HTML转换为Docx
    const docxContent = htmlDocx.asBlob(htmlContent);

    // 创建一个新的Word文档
    const documentEl = new Document({
      sections: [
        {
          properties: {},
          children: [
            new Paragraph({
              text: "Hello World",
              heading: "Heading1",
            }),
            new Paragraph({
              text: "This is a simple document created using docx library.",
            }),
          ],
        },
      ],
    });

    // 添加水印
    documentEl.createParagraph({
      alignment: "center",
      children: [
        {
          bold: true,
          fontSize: 36,
          text: watermarkText,
        },
      ],
      spacing: {
        after: 200,
        before: 0,
      },
      wrap: {
        type: "none",
      },
    });

    // 将Docx内容添加到文档中
    documentEl.addSection({
      children: [
        {
          media: {
            preprocess: (content) => content,
            source: docxContent,
            type: "blob",
          },
        },
      ],
    });

    // 打包文档
    const packer = new Packer();
    saveAs(packer.toBlob(documentEl), "document.doc");
  };
  useEffect(() => {
    exportToWord();
    // exportWord2();
  }, []);
  return (
    <div id="contentWrap">
      <div
        className="watermark"
        style={{
          position: "fixed",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          opacity: 0.3,
          "font-size": "50px",
          "font-weight": "bold",
          color: "gray",
          "z-index": -1,
          "pointer-events": "none",
        }}
      >
        WATERMARK
      </div>
      <div id="content">
        <h1 style={{ color: "red" }}>Hello, World!</h1>
        <p>
          This is a sample HTML content to be exported to Word with watermark.
        </p>
      </div>
    </div>
  );
};

export default HtmlToWord;
