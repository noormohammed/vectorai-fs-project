from typing import Optional
from pydantic import BaseModel


class DocumentTypes(BaseModel):
    # id: int
    type: Optional[str]
    title: Optional[str]
    position: Optional[int]

    class Config:
        orm_mode = True
