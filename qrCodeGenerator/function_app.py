import azure.functions as func
from azure.storage.blob import BlobServiceClient
from azure.identity import DefaultAzureCredential

import qrcode
from qrcode.image.styledpil import StyledPilImage
from qrcode.image.styles.moduledrawers.pil import *
from qrcode.image.styles.colormasks import SolidFillColorMask


import re
import io
import json

app = func.FunctionApp()


@app.route(route="GenerateQRCode", auth_level=func.AuthLevel.FUNCTION)
def GenerateQRCode(req: func.HttpRequest) -> func.HttpResponse:
    url = req.params.get('url') or req.get_json().get('url')
    style = req.params.get('style') or req.get_json().get('style')
    color = req.params.get('color') or req.get_json().get('color')

    # return error response if url was not provided in the query param / req body
    if not url:
        return func.HttpResponse(
            "Please pass a url on the query string or the request body",
            status_code=400
        )

    try:
        # Create a Managed Identity default credential
        credential = DefaultAzureCredential()

        # create a blob client
        blobServiceClient = BlobServiceClient(
            "https://qrcodegenerator998.blob.core.windows.net", credential)

        # create the blob container client
        containerName = 'qr-codes'
        containerClient = blobServiceClient.get_container_client(containerName)

        # create container if it doesn't already exists
        if not containerClient.exists():
            containerClient = blobServiceClient.create_container(containerName)

        # use regex to remove https:// from the url
        modifiedUrl = re.sub(r'^https?://', '', url)
        blobName = f"{modifiedUrl}-{style}-{color}.png"
        blobClient = containerClient.get_blob_client(blobName)

        # Check if the blob with same name already exists
        if not blobClient.exists():
            # Generate the qrcode
            qr = qrcode.QRCode(
                error_correction=qrcode.constants.ERROR_CORRECT_L)
            qr.add_data(url)

            qrCodeData = qr.make_image(
                image_factory=StyledPilImage,
                module_drawer=getModuleDrawer(style),
                color_mask=SolidFillColorMask(
                    front_color=getRGBValue(color),
                    back_color=(255, 255, 255)
                )
            )

            # Converting qrcode data to bytes
            buffer = io.BytesIO()
            qrCodeData.save(buffer)
            buffer.seek(0)
            qrcodeInBytes = buffer.read()

            # Upload the blob
            blobClient.upload_blob(qrcodeInBytes)

        return func.HttpResponse(
            status_code=200,
            mimetype="application/json",
            body=json.dumps({"qr_code_url": blobClient.url}),
        )
    except Exception as e:
        return func.HttpResponse(status_code=500, body=f"Error: {e}")


def getRGBValue(color):
    match color:
        case "red":
            return (226, 29, 29)
        case "green":
            return (34, 165, 63)
        case "blue":
            return (10, 2, 99)
        case "yellow":
            return (255, 157, 11)
        case _:
            return (0, 0, 0)


def getModuleDrawer(drawerName):
    match drawerName:
        case "square":
            return SquareModuleDrawer()
        case "gapped-square":
            return GappedSquareModuleDrawer()
        case "circle":
            return CircleModuleDrawer()
        case "rounded":
            return RoundedModuleDrawer()
        case "vertical":
            return VerticalBarsDrawer()
        case "horizontal":
            return HorizontalBarsDrawer()
        case _:
            return SquareModuleDrawer()
