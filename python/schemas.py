from pydantic import BaseModel
from datetime import date
from typing import Optional, List

class HotelBase(BaseModel):
    id_hotel:int
    nombre:str
    ciudad:str
    valoracion:int
    imagen: Optional [str]
    
class Hotel(HotelBase):
    class Config:
        orm_mode = True


class TipoHabitacionBase(BaseModel):
    id_tipo:int
    nombre:str
    no_camas:int
class TipoHabitacion(TipoHabitacionBase):
    class Config:
        orm_mode = True

class HabitacionBase(BaseModel):
    id_habitacion:int
    no_habitacion:str
    estado:str
    fk_id_tipo: int
    fk_id_hotel:int
    precio: Optional [int]
class Habitacion(HabitacionBase):
    class Config:
        orm_mode = True

class UserBase(BaseModel):
    id_user:int
    nombre:str
    edad:int
    correo:str
    contrasena:str
class User(UserBase):
    class Config:
        orm_mode = True

class ReservaBase(BaseModel):
    id_reserva:int
    fecha_entrada:date
    fecha_salida:date
    precio:int
    fk_id_habitacion:int
    fk_id_user:int
class Reserva(ReservaBase):
    class Config:
        orm_mode = True