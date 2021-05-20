from fastapi.exceptions import HTTPException
from db import db, metadata, sqlalchemy

# Table documentTypes may have unique document types to avoid duplicates
documentTypes = sqlalchemy.Table(
    "documentTypes",
    metadata,
    sqlalchemy.Column("id", sqlalchemy.Integer, primary_key=True),
    sqlalchemy.Column("type", sqlalchemy.String, nullable=False, unique=True),
    sqlalchemy.Column("title", sqlalchemy.String, nullable=False),
    sqlalchemy.Column("position", sqlalchemy.INTEGER,
                      nullable=False, unique=False),
)


class DocumentTypes:

    """ Create a new document type based on the inputs given """
    @classmethod
    async def create_documentType(cls, **documentType_fields):
        query = documentTypes.insert().values(**documentType_fields)
        documentType_id = await db.execute(query)
        return documentType_id

    """ Get one document type based on the given type attribute """
    @classmethod
    async def get_documentType(cls, type):
        query = documentTypes.select().where(documentTypes.c.type == type)
        documentType = await db.fetch_one(query)
        return documentType

    """ Get all the document types from the table """
    @classmethod
    async def get_all_documentTypes(cls, skip: int = 0, take: int = 20):
        # We could add a limit on the number of records being fetched
        # if there are lots of records
        query = documentTypes.select().offset(skip).limit(take)
        allDocumentTypes = await db.fetch_all(query)
        # allDocumentTypes = await db.query(documentTypes).offset(skip).limit(take).all()
        return allDocumentTypes

    """ Update a document type """
    @classmethod
    async def update_documentType(cls, id, **documentType_fields):
        updated_type = documentType_fields.get("type")
        updated_title = documentType_fields.get("title")
        updated_position = documentType_fields.get("position")
        query = documentTypes.update().where(documentTypes.c.id ==
                                             id).values(type=updated_type,
                                                        title=updated_title, position=updated_position)
        await db.execute(query)
        return {"id": id, "details": f"Document type updated"}
