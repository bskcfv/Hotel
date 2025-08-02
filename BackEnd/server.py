from fastapi import FastAPI, Depends, HTTPException
from sqlalchemy.orm import Session
from typing import List
from fastapi.middleware.cors import CORSMiddleware 
from Config.DB.conexiondb import SessionLocal, engine, Base
from Config.DB.tablas import Base
from Config.DB.schemas import Reserva ,User, HotelBase, HabitacionBase, TipoHabitacionBase, UserBase, ReservaBase, Hotel, Habitacion, TipoHabitacion, User
from Services.crud import insertar_reserva ,consultar_hotel,consultar_hotel_by_id, consultar_tipo, consultar_hotel_by_name, consultar_hotel_by_ciudad, consultar_habitacion_by_id ,consultar_habitaciones_by_idhotel, insertar_hotel, insertar_habitacion, insertar_user, login


Base.metadata.create_all(bind=engine)

app=FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Permitir todos los orígenes
    allow_credentials=True,
    allow_methods=["*"],  # Permitir todos los métodos
    allow_headers=["*"],  # Permitir todos los encabezados
)

def conexiondb():
    db=SessionLocal()
    try:
        yield db
    finally: db.close()
#Si
@app.get("/consultarhotel", response_model=list[Hotel])

async def get_hotel(db:Session =Depends(conexiondb)):
    return consultar_hotel(db)
#Si
@app.get("/consultar_tipo_habt", response_model=list[TipoHabitacion])

async def get_tipo_habt(db:Session=Depends(conexiondb)):
    return consultar_tipo(db)
#Si
@app.get("/consultarhotel_by_id/{id_hotel}", response_model=HotelBase)

async def get_hotel_by_id(id_hotel:int, db:Session=Depends(conexiondb)):
    hotel_seleccionado = consultar_hotel_by_id(id_hotel=id_hotel, db=db)
    if hotel_seleccionado is None:
        return {"mensaje":"Hotel no encontrado"}
    return hotel_seleccionado

@app.get("/Login/{correo}/{contrasena}", response_model=UserBase)

async def get_user(correo:str, contrasena:str, db:Session=Depends(conexiondb)):
    user_seleccionado = login(db, correo)
    if not user_seleccionado or user_seleccionado.contrasena != contrasena:
        raise HTTPException(status_code=404, detail="User no encontrado")
    return user_seleccionado
#Si
@app.get("/consultarhabitacion_by_id/{id_habitacion}", response_model=HabitacionBase)

async def get_habitacion_by_id(id_habitacion:int, db:Session=Depends(conexiondb)):
    habitacion_seleccionada = consultar_habitacion_by_id(id_habitacion=id_habitacion, db=db)
    if habitacion_seleccionada is None:
        return {"mensaje":"Habitacion no encontrada"}
    return habitacion_seleccionada

#Si
@app.get("/consultarhabitacion_by_idhotel/{fk_hotel}", response_model=list[HabitacionBase])
async def get_habitacion_by_idhotel(fk_hotel: int, db: Session = Depends(conexiondb)):
    hotel_Seleccionado = consultar_habitaciones_by_idhotel(fk_hotel=fk_hotel, db=db)
    if not hotel_Seleccionado: 
        raise HTTPException(status_code=404, detail="Hotel no encontrado o no tiene habitaciones")
    return hotel_Seleccionado

#Si
@app.get("/filterHotel/{filtro}", response_model=list[Hotel])

def buscar_hoteles_por_ciudad(filtro: str, db: Session = Depends(conexiondb)):
    hoteles = consultar_hotel_by_ciudad(db, filtro)
    if not hoteles:
        hoteles = consultar_hotel_by_name(db, filtro)
        if not hoteles:
            raise HTTPException(status_code=404, detail="No se encontraron hoteles en la ciudad especificada")
        return hoteles
    return hoteles


@app.post("/insertar_hotel", response_model=Hotel)

async def registrar_hotel(hotel:HotelBase, db:Session=Depends(conexiondb)):
    return insertar_hotel(db, hotel)

@app.post("/insertar_habitacion", response_model=Habitacion)

async def registrar_habitacion(habitacion:HabitacionBase, db:Session=Depends(conexiondb)):
    return insertar_habitacion(db, habitacion)

@app.post("/insertar_user", response_model=User)

async def registrar_user(user:UserBase, db:Session=Depends(conexiondb)):
    return insertar_user(db, user)

@app.post("/insertar_reserva", response_model=Reserva)

async def registrar_reserva(reserva:ReservaBase, db:Session=Depends(conexiondb)):
    return insertar_reserva(db, reserva)