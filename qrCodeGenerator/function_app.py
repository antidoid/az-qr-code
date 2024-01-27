import azure.functions as func
import json
from azure.storage.blob import BlobServiceClient
import qrcode
from qrcode.image.pure import PyPNGImage
import os
import re
import io

app = func.FunctionApp()
connectionString = os.environ["STORAGE_CONNECTION_STRING"]


@app.route(route="GenerateQRCode", auth_level=func.AuthLevel.ANONYMOUS)
def GenerateQRCode(req: func.HttpRequest) -> func.HttpResponse:
    url = req.params.get('url') or req.get_json().get('url')

    if not url:
        return func.HttpResponse(
            "Please pass a url on the query string or the request body",
            status_code=400
        )

    # Generate the qrcode
    try:
        qrCodeData = qrcode.make(url, image_factory=PyPNGImage)

        # create a blob client
        blobServiceClient = BlobServiceClient.from_connection_string(
            conn_str=connectionString)
        containerName = 'qr-codes'
        containerClient = blobServiceClient.get_container_client(containerName)
        if not containerClient.exists():
            containerClient = blobServiceClient.create_container(containerName)

        # use regex to remove https:// from the url
        modifiedUrl = re.sub(r'^https?://', '', url)
        blobName = modifiedUrl + '.png'
        blobClient = containerClient.get_blob_client(blobName)

        # Converting qrcode data to bytes
        buffer = io.BytesIO()
        qrCodeData.save(buffer)
        buffer.seek(0)
        qrcodeInBytes = buffer.read()

        # Upload the qrcode to blob container
        blobClient.upload_blob(qrcodeInBytes)

        return func.HttpResponse(
            status_code=200,
            mimetype="application/json",
            body=json.dumps({"qr_code_url": blobClient.url}),
        )
    except Exception as e:
        return func.HttpResponse(status_code=500, body=f"Error: {e}")
