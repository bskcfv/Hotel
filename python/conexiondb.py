#CONEXION DATABASE
from sqlalchemy import create_engine
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker

RUTADATABASE = "mysql+mysqlconnector://root:@localhost:3306/hoteltech"

engine = create_engine(RUTADATABASE)

try:
    with engine.connect() as connection:
        print("Conexion Exitosa")
except Exception as e:
    print(f"Error al conectar: {e}")

SessionLocal = sessionmaker(autocommit=False,autoflush=False,bind=engine)

Base = declarative_base()