import React, { useEffect } from "react";
import htmlDocx from "html-docx-js/dist/html-docx";
// // import { Packer } from "docx-js";
// const { Document } = require("docx-js");
import { Document } from "docx-js";

import { Packer, Paragraph, TextRun, parseHtml } from "docx";
// import docx from "docx";
import { saveAs } from "file-saver";

// css
import "./style.scss";

const Use = () => {
  const exportWord = () => {
    // 定义要转换的HTML内容
    const htmlContent = `
<p style="color: blue; font-size: 16px;">这是一个蓝色的段落。</p>
<h1 style="font-weight: bold; color: red;">这是一个红色的标题。</h1>
`;

    // 将HTML转换为Word文档
    const docx = htmlDocx(htmlContent);

    // 创建一个Blob对象，并使用createObjectURL创建一个URL
    const blob = new Blob([docx], {
      type: "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
    });
    const url = URL.createObjectURL(blob);

    // 使用这个URL下载文件
    const a = document.createElement("a");
    a.href = url;
    a.download = "styled-document.docx";
    a.click();
  };
  const watermarkParagraph = new Paragraph({
    children: [
      new TextRun({
        text: "CONFIDENTIAL",
        font: "Arial",
        color: "gray",
        size: 24,
        bold: true,
        italics: false,
        underline: {},
        // 将水印文本旋转-45度
        rotation: -45,
        // 将水印文本移动到合适的位置
        x: 100,
        y: 100,
      }),
    ],
  });
  const generate = () => {
    const aaa = document.querySelector("#docWrap").innerHTML;
    const doc = new Document({
      sections: [
        {
          children: [
            new Paragraph(aaa),
            new Paragraph({
              children: [
                watermarkParagraph,
                // new ImageRun({
                //   data: Uint8Array.from(atob(imageBase64Data), (c) =>
                //     c.charCodeAt(0),
                //   ),
                //   transformation: {
                //     width: 200,
                //     height: 100,
                //   },
                // }),
              ],
            }),
          ],
        },
      ],
    });

    Packer.toBlob(doc).then((blob) => {
      console.log(blob);
      saveAs(blob, "example.docx");
      console.log("Document created successfully");
    });
  };
  // 将HTML转换为docx格式
  const htmlToDocx = () => {
    const htmlContent = ` <h1>Hello World</h1><p>This is a test paragraph.</p>`;
    // 使用parseHTML方法将HTML转换为Document对象
    const parsed = htmlDocx(htmlContent);
    // 创建一个新的Document对象
    const doc = new Document(parsed);
    // 将Document对象转换为二进制流
    const buffer = docx.Packer.toBuffer(doc);

    return buffer;
  };
  const test = () => {
    // 假设你的HTML内容是这样的：
    const htmlContent = `
<h1>Hello World</h1>
<p>This is a paragraph.</p>
`;

    // 将HTML转换为docx支持的格式
    const converted = htmlDocx(htmlContent);

    // 创建一个新的docx文档
    const document = new Document({
      creator: "Me",
      title: "My HTML Document",
    });

    // 添加转换后的HTML到文档中
    document.addSection({
      children: [
        {
          paragraph: {
            text: converted,
          },
        },
      ],
    });

    // 打包文档并下载
    const packer = new Packer();
    packer.toBlob(document).then((blob) => {
      saveAs(blob, "my-document.docx");
    });
  };
  // 创建一个水印的Word文档
  const createWatermarkedDocument = (htmlContent, watermarkText) => {
    // 将HTML转换为Docx
    const docxContent = htmlDocx.asBlob(htmlContent);

    // 创建一个新的Word文档
    const documentEl = new Document();

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
    return packer.toBlob(documentEl);
  };
  const createAndDownloadWordFile = (content) => {
    // 创建一个包含段落的简单文档
    const document = docx.Document({
      creator: "你的名字",
      title: "文档标题",
      sections: [
        {
          properties: {},
          children: [
            new docx.Paragraph({
              text: content,
              paragraphFormat: { alignment: docx.AlignmentType.CENTER },
            }),
          ],
        },
      ],
    });

    // 将文档转换为 Blob
    const blob = docx.Packer.toBlob(document);

    // 使用 file-saver 保存文件
    saveAs(blob, "example.docx");
  };
  useEffect(() => {
    // setTimeout(() => {
    //   // 使用示例
    //   const htmlContent = "<h1>Hello World</h1>"; // 你的HTML内容
    //   const watermarkText = "CONFIDENTIAL"; // 水印文字
    //   const docBlob = createWatermarkedDocument(htmlContent, watermarkText);
    //   // 使用JS下载生成的Word文档
    //   const link = document.createElement("a");
    //   link.href = URL.createObjectURL(docBlob);
    //   link.download = "document-with-watermark.docx";
    //   link.click();
    // }, 1000);
    // createAndDownloadWordFile("这是一个示例内容。");
    // test();
    // generate();
    // exportWord();
  }, []);
  return (
    <div>
      use
      <div id="docWrap">
        doc
        <div>test</div>
      </div>
    </div>
  );
};

export default Use;
