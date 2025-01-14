from fastapi import FastAPI, File, Form, UploadFile, HTTPException
from fastapi.responses import StreamingResponse
from PIL import Image
import io
import os

app = FastAPI()

TEMP_FOLDER = "/tmp"  # Ensure this folder exists

@app.post("/resize")
async def resize(
    file: UploadFile = File(...),
    width: int = Form(800),  # Default width is 800
    height: int = Form(600)  # Default height is 600
):
    try:
        # Validate that the uploaded file is an image
        if not file.content_type.startswith('image/'):
            raise HTTPException(status_code=400, detail="Uploaded file is not an image")

        # Read the uploaded file content
        file_content = await file.read()

        # Open the image using Pillow
        image = Image.open(io.BytesIO(file_content))

        # Convert the image to RGB if it has an alpha channel
        if image.mode == 'RGBA':
            image = image.convert('RGB')

        # Resize the image
        image = image.resize((width, height))

        # Save the resized image temporarily
        output_path = os.path.join(TEMP_FOLDER, f'resized_{file.filename}')
        image.save(output_path, format='JPEG')

        # Stream the resized image back to the client
        def stream_file():
            with open(output_path, "rb") as resized_image:
                yield from resized_image

        return StreamingResponse(
            stream_file(),
            media_type="image/jpeg",
            headers={"Content-Disposition": f'attachment; filename="resized_{file.filename}"'}
        )

    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))