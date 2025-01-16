from sqlalchemy import Column, Integer, String, Date, ForeignKey
from sqlalchemy.orm import relationship
from python.conexiondb import Base

class Hotel(Base):
    __tablename__ = "hotel"
    id_hotel = Column(Integer, primary_key=True, index=True, autoincrement=True)
    nombre = Column(String(20), nullable=False)
    ciudad = Column(String(20), nullable=False)
    valoracion = Column(Integer, nullable=False)
    imagen = Column(String(255), nullable=True)
    
    habitaciones = relationship("Habitacion", back_populates="hotel")

class Habitacion(Base):
    __tablename__ = "habitacion"
    id_habitacion = Column(Integer, primary_key=True, index=True, autoincrement=True)
    no_habitacion = Column(String(20), nullable=False)
    estado = Column(String(20), nullable=False)
    fk_id_tipo = Column(Integer, ForeignKey('tipo_habitacion.id_tipo'), nullable=False)
    fk_id_hotel = Column(Integer, ForeignKey('hotel.id_hotel'), nullable=False)
    precio = Column(Integer, nullable=False)

    hotel = relationship("Hotel", back_populates="habitaciones")
    tipo_habitacion = relationship("Tipo_Habitacion", back_populates="habitaciones")
    reservas = relationship("Reserva", back_populates="habitacion")

class Tipo_Habitacion(Base):
    __tablename__ = "tipo_habitacion"
    id_tipo = Column(Integer, primary_key=True, index=True, autoincrement=True)
    nombre = Column(String(20), nullable=False)
    no_camas = Column(Integer, nullable=False)

    habitaciones = relationship("Habitacion", back_populates="tipo_habitacion")

class Users(Base):
    __tablename__ = "users"
    id_user = Column(Integer, primary_key=True, index=True, autoincrement=True)
    nombre = Column(String(20), nullable=False)
    edad = Column(Integer, nullable=False)
    correo = Column(String(50), nullable=False)
    contrasena = Column(String(20), nullable=False)

    reservas = relationship("Reserva", back_populates="user")

class Reserva(Base):
    __tablename__ = "reserva"
    id_reserva = Column(Integer, primary_key=True, index=True, autoincrement=True)
    fecha_entrada = Column(Date, nullable=True)
    fecha_salida = Column(Date, nullable=True)
    precio = Column(Integer, nullable=True)
    fk_id_habitacion = Column(Integer, ForeignKey('habitacion.id_habitacion'), nullable=True)
    fk_id_user = Column(Integer, ForeignKey('users.id_user'), nullable=True)

    habitacion = relationship("Habitacion", back_populates="reservas")  
    user = relationship("Users", back_populates="reservas")