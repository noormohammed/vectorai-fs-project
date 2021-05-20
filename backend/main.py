from fastapi.encoders import jsonable_encoder
from sqlalchemy.sql.expression import null
from starlette.responses import JSONResponse
import uvicorn
from models import DocumentTypes as ModelDocumentType
from schema import DocumentTypes as SchemaDocumentType
from app import app
from db import db
from fastapi import HTTPException

""" Create new document type """


@app.post("/api/v1/documents/type/")
async def create_documentType(documentTypeFields: SchemaDocumentType):
    # First check if this document type exists and raise an exception if it does
    searchType = documentTypeFields.dict().get("type")
    documentType = await ModelDocumentType.get_documentType(searchType)
    if documentType is not None:
        raise HTTPException(
            status_code=409, detail=f"Document type '{searchType}' already exists")

    documentType_id = await ModelDocumentType.create_documentType(**documentTypeFields.dict())
    return {"id": documentType_id}


""" Read a document type """


@app.get("/api/v1/documents/type/{type}", response_model=SchemaDocumentType)
async def get_dcoumentType(type: str):
    documentType = await ModelDocumentType.get_documentType(type)

    # Check if there is no document type for the given type
    if documentType is None:
        raise HTTPException(
            status_code=404, detail=f"Document type '{type}' not found")

    return SchemaDocumentType(**documentType).dict()


""" Read all document types """


@app.get("/api/v1/documents/type/", response_model=SchemaDocumentType)
async def get_all(skip: int, take: int):
    # allDocumentTypes = []
    results = await ModelDocumentType.get_all_documentTypes(skip, take)

    if not results:
        raise HTTPException(
            status_code=404, detail=f"No document types added")

    """ for row in results:
        allDocumentTypes.append(SchemaDocumentType(**row).dict()) """

    json_compatible_response = jsonable_encoder(results)
    return JSONResponse(content=json_compatible_response)


""" Update a document type """


@app.put("/api/v1/documents/type/{id}", response_model=SchemaDocumentType)
async def update_dcoumentType(id: int, documentTypeFields: SchemaDocumentType):
    results = await ModelDocumentType.update_documentType(id, **documentTypeFields.dict())
    print(results)

    # Check if there is no document type for the given type
    if results is None:
        raise HTTPException(
            status_code=404, detail=f"Document type '{type}' not found")

    json_compatible_response = jsonable_encoder(results)
    return JSONResponse(content=json_compatible_response)


if __name__ == "__main__":
    uvicorn.run(app, host="0.0.0.0", port=8000)
