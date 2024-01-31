import azure.functions as func
from azure.storage.blob import BlobServiceClient

import qrcode
from qrcode.image.styledpil import StyledPilImage
from qrcode.image.styles.moduledrawers.pil import *
from qrcode.image.styles.colormasks import SolidFillColorMask


import os
import re
import io
import json

app = func.FunctionApp()
connectionString = os.environ["STORAGE_CONNECTION_STRING"]


@app.route(route="GenerateQRCode", auth_level=func.AuthLevel.ANONYMOUS)
def GenerateQRCode(req: func.HttpRequest) -> func.HttpResponse:
    url = req.params.get('url') or req.get_json().get('url')
    style = req.params.get('style') or req.get_json().get('style')
    color = req.params.get('color') or req.get_json().get('color')

    if not url:
        return func.HttpResponse(
            "Please pass a url on the query string or the request body",
            status_code=400
        )

    try:
        # Generate the qrcode
        qr = qrcode.QRCode(error_correction=qrcode.constants.ERROR_CORRECT_L)
        qr.add_data(url)

        qrCodeData = qr.make_image(
            image_factory=StyledPilImage,
            module_drawer=getModuleDrawer(style),
            color_mask=SolidFillColorMask(
                front_color=getRGBValue(color),
                back_color=(255, 255, 255)
            )
        )

        # create a blob client
        blobServiceClient = BlobServiceClient.from_connection_string(
            conn_str=connectionString)
        containerName = 'qr-codes'
        containerClient = blobServiceClient.get_container_client(containerName)
        if not containerClient.exists():
            containerClient = blobServiceClient.create_container(containerName)

        # use regex to remove https:// from the url
        modifiedUrl = re.sub(r'^https?://', '', url)
        blobName = f"{modifiedUrl}-{style}-{color}.png"
        blobClient = containerClient.get_blob_client(blobName)

        # Upload the qrcode to blob container if it already doesn't exists
        if not blobClient.exists():
            # Converting qrcode data to bytes
            buffer = io.BytesIO()
            qrCodeData.save(buffer)
            buffer.seek(0)
            qrcodeInBytes = buffer.read()

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
