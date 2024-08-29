"use client";
import { Document, Page, pdfjs } from 'react-pdf';
import 'react-pdf/dist/esm/Page/AnnotationLayer.css';
import 'react-pdf/dist/esm/Page/TextLayer.css';
import { useState, useEffect } from 'react';

// Specify the worker source
pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.mjs`;

interface PdfRendererProps {
  fileKey: string; // Use fileKey instead of url
}

const PdfRenderer = ({ fileKey }: PdfRendererProps) => {
  const [error, setError] = useState<string | null>(null);

  // Construct URL based on the file key
  const pdfUrl = `https://utfs.io/f/${fileKey}`;

  useEffect(() => {
    if (!fileKey) {
      setError("PDF key is missing.");
    }
  }, [fileKey]);

  return (
    <div className="w-full text-white rounded-md shadow flex flex-col items-center">
      <div className="h-14 w-full border-b border-zinc-200 flex items-center justify-between px-2">
        <div className="flex items-center gap-1.5">
          PDF Viewer
        </div>
      </div>
      <div className="flex-1 w-full max-h-screen">
        {error ? (
          <div className="text-red-500">Error: {error}</div>
        ) : (
          <Document
            file={pdfUrl} // Use the constructed URL
            onLoadError={(error) => setError(`Error loading PDF: ${error.message}`)}
            className="max-h-full"
          >
            <Page pageNumber={1} />
          </Document>
        )}
      </div>
    </div>
  );
};

export default PdfRenderer;
