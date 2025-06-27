from sqlalchemy import text
from sqlalchemy.orm import Mapped, mapped_column, relationship

from core.db import Base


class User(Base):
    phone_number: Mapped[str]
    first_name: Mapped[str]
    last_name: Mapped[str]
    email: Mapped[str]
    password: Mapped[str]

    is_user: Mapped[bool] = mapped_column(
        default=True, server_default=text("true"), nullable=False
    )
    is_admin: Mapped[bool] = mapped_column(
        default=False, server_default=text("false"), nullable=False
    )

    wind_farms = relationship("WindFarm", back_populates="user")

    extend_existing = True

    def __repr__(self):
        return f"{self.__class__.__name__}(id={self.id})"
