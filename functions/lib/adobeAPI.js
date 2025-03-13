const {
    ServicePrincipalCredentials,
    PDFServices,
    HTMLToPDFJob,
    HTMLToPDFResult,
    HTMLToPDFParams,
    PageLayout,
} = require("@adobe/pdfservices-node-sdk");

const https = require('https');

async function generatePDFfromHTML({ credentialsServicePDF, fileURL, getDownloadURL, filePDF }) {

    return new Promise(async (resolve, reject) => {
        const credentials = new ServicePrincipalCredentials({
            clientId: credentialsServicePDF.id,
            clientSecret: credentialsServicePDF.secret
        });

        const pdfServices = new PDFServices({ credentials });
        // Create parameters for the job
        const params = getHTMLToPDFParams();
        const job = new HTMLToPDFJob({ inputURL: fileURL, params });

        try {
            // Submit the job & get a polling URL
            const pollingURL = await pdfServices.submit({ job });
            //console.log('Job submitted, polling URL:', pollingURL);

            // Get the job result
            const pdfServicesResponse = await pdfServices.getJobResult({ pollingURL, resultType: HTMLToPDFResult });
            //console.log('Job result received:', pdfServicesResponse);

            // Get the URL for downloading the PDF
            const downloadURI = pdfServicesResponse.result.asset._downloadURI;
            //console.log('downloadURI:: ', downloadURI)

            // Using https to download the PDF from the link
            const fileWriteStream = filePDF.createWriteStream({
                metadata: { contentType: 'application/pdf' }
            });

            https.get(downloadURI, (response) => {
                response.pipe(fileWriteStream);

                fileWriteStream.on('finish', async () => {
                    // console.log('PDF successfully uploaded to Firebase Storage!');

                    const fileURL = await getDownloadURL(filePDF);
                    if (fileURL) {

                        resolve({ status: 'Success', message: 'PDF successfully uploaded to Firebase Storage!', url: fileURL })
                    } else {
                        reject({ status: 'Error', message: 'Unable to get URL of the PDF at Firebase Storage.' });
                    }
                });

                fileWriteStream.on('error', () => {
                    // console.error('Error while uploading to Firebase Storage:', err);
                    reject({ status: 'Error', message: 'Error while uploading to Firebase Storage.' });

                });
            }).on('error', () => {
                // console.error('Error while downloading the HTML to convert to PDF:', err);
                reject({ status: 'Error', message: 'Error while downloading the HTML to convert to PDF.' });

            });

        } catch (err) {
            // console.error('Error while creating the PDF:', err);
            reject({ status: 'Error', message: 'Error while creating the PDF.' });

        }
    })

}
function getHTMLToPDFParams() {

    // Define the page layout, in this case an 8.3 x 11.7 inch page (a4)

    const pageLayout = new PageLayout({
        pageHeight: 11.7,
        pageWidth: 8.3
    });

    return new HTMLToPDFParams(
        {
            pageLayout,
            includeHeaderFooter: false,
        }
    );
}

module.exports = { generatePDFfromHTML };
