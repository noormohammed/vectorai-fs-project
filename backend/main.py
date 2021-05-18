from fastapi.encoders import jsonable_encoder
from sqlalchemy.sql.expression import null
from starlette.responses import JSONResponse
import uvicorn
from models import DocumentTypes as ModelDocumentType
from schema import DocumentTypes as SchemaDocumentType
from app import app
from db import db
from fastapi import HTTPException


@app.post("/document/type/")
async def create_documentType(documentTypeFields: SchemaDocumentType):
    # First check if this document type exists and raise an exception if it does
    searchType = documentTypeFields.dict().get("type")
    documentType = await ModelDocumentType.get(searchType)
    if documentType is not None:
        raise HTTPException(
            status_code=409, detail=f"Document type '{searchType}' already exists")

    documentType_id = await ModelDocumentType.create(**documentTypeFields.dict())
    return {"id": documentType_id}


@app.get("/document/type/{type}", response_model=SchemaDocumentType)
async def get_dcoumentType(type: str):
    documentType = await ModelDocumentType.get(type)

    # Check if there is no document type for the given type
    if documentType is None:
        raise HTTPException(
            status_code=404, detail=f"Document type '{type}' not found")

    return SchemaDocumentType(**documentType).dict()


@app.get("/document/type/", response_model=SchemaDocumentType)
async def get_all(skip: int, take: int):
    allDocumentTypes = []
    results = await ModelDocumentType.get_all(skip, take)

    if len(results):
        for row in results:
            allDocumentTypes.append(SchemaDocumentType(**row).dict())
    else:
        raise HTTPException(
            status_code=200, detail=f"No document types added")

    json_compatible_response = jsonable_encoder(allDocumentTypes)
    return JSONResponse(content=json_compatible_response)


if __name__ == "__main__":
    uvicorn.run(app, host="0.0.0.0", port=8000)
