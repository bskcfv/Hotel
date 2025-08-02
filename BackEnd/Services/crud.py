from sqlalchemy.orm import Session, joinedload, join
from fastapi import HTTPException
from sqlalchemy.exc import IntegrityError
from Config.DB.tablas import Hotel, Habitacion, Tipo_Habitacion, Users, Reserva
from Config.DB.schemas import HotelBase, HabitacionBase, TipoHabitacionBase, UserBase, ReservaBase


#Sí
def consultar_hotel(db:Session):
    return db.query(Hotel).all()
#Si
def consultar_tipo(db:Session):
    return db.query(Tipo_Habitacion).all()
#Si
def consultar_hotel_by_id(id_hotel:int, db:Session):
    return db.query(Hotel).filter(Hotel.id_hotel == id_hotel).first()
#No
def consultar_habitacion_by_id(id_habitacion:int, db:Session):
    return db.query(Habitacion).filter(Habitacion.id_habitacion == id_habitacion).first()
#Si
def consultar_habitaciones_by_idhotel(fk_hotel: int, db: Session):
    return db.query(Habitacion).join(Tipo_Habitacion).filter(Habitacion.fk_id_hotel == fk_hotel).all()
#Si
def consultar_hotel_by_name(db:Session, nombre:str):
    return db.query(Hotel).filter(Hotel.nombre == nombre).all()
#Si
def consultar_hotel_by_ciudad(db:Session, ciudad:str):
    return db.query(Hotel).filter(Hotel.ciudad == ciudad).all()

def login(db:Session, correo:str):
    return db.query(Users).filter(Users.correo == correo).first()


def insertar_hotel(db:Session, hotel:HotelBase):
    hotel_existente = db.query(Hotel).filter(Hotel.id_hotel == hotel.id_hotel).first()
    if hotel_existente:
        raise HTTPException(status_code=400, detail=f'El Hotel con el id {hotel.id_hotel} ya existe')
    try:
        db_hotel = Hotel(**hotel.dict())
        db.add(db_hotel)
        db.commit()
        db.refresh(db_hotel)
        return db_hotel
    except IntegrityError as e:
        db.rollback()
        raise HTTPException(status_code=500, detail=f'Error al registrar el Hotel, tipo de error: {e}')

def insertar_habitacion(db:Session, habitacion:HabitacionBase):
    habitacion_existente = db.query(Habitacion).filter(Habitacion.id_habitacion == habitacion.id_habitacion).first()
    if habitacion_existente:
        raise HTTPException(status_code=400, detail=f'La habitacion con el id {habitacion.id_habitacion} ya existe')
    try:
        db_habitacion = Habitacion(**habitacion.dict())
        db.add(db_habitacion)
        db.commit()
        db.refresh(db_habitacion)
        return db_habitacion
    except IntegrityError as e:
        db.rollback()
        raise HTTPException(status_code=500, detail=f'Error al registrar la Habitacion, tipo de error: {e}')

def insertar_user(db:Session, user = UserBase):
    user_existente = db.query(Users).filter(Users.id_user == user.id_user).first()
    if user_existente:
        raise HTTPException(status_code=400, detail=f'El Usuario con el id {user.id_user} ya existe')
    try:
        db_user = Users(**user.dict())
        db.add(db_user)
        db.commit()
        db.refresh(db_user)
        return db_user
    except IntegrityError as e:
        db.rollback()
        raise HTTPException(status_code=500, detail=f'Error al registrar el Usuario, tipo de error: {e}')

def insertar_reserva(db:Session, reserva = ReservaBase):
    reserva_existente = db.query(Reserva).filter(Reserva.id_reserva == reserva.id_reserva).first()
    reserva_habt = db.query(Reserva).filter(Reserva.fk_id_habitacion == reserva.fk_id_habitacion).all()
    if reserva_existente:
        raise HTTPException(status_code=400, detail=f'La Reserva con el id {reserva.id_reserva} ya existe')
    
    for r in reserva_habt:
        if not (reserva.fecha_salida <= r.fecha_entrada or reserva.fecha_entrada >= r.fecha_salida):
            raise HTTPException(
                status_code=400,
                detail=(
                    f'La habitación ya está reservada desde {r.fecha_entrada} hasta {r.fecha_salida}. '
                    f'Por favor selecciona otras fechas.'
                )
            )
    
    try:
        db_reserva = Reserva(**reserva.dict())
        db.add(db_reserva)
        db.commit()
        db.refresh(db_reserva)
        return db_reserva
    except IntegrityError as e:
        db.rollback()
        raise HTTPException(status_code=500, detail=f'Error al registrar la Reserva, tipo de error: {e}')

