from fastapi import FastAPI, Query, Depends
from typing import List, Optional
import sqlite3

app = FastAPI()

# Database helper functions
def get_db_connection():
    conn = sqlite3.connect('aws_pricing.db')
    conn.row_factory = sqlite3.Row
    return conn


# Helper function to get products from the database with filters
def get_products(
    location: Optional[str] = None,
    min_ram: Optional[float] = None,
    max_ram: Optional[float] = None,
    min_cpu: Optional[int] = None,
    max_cpu: Optional[int] = None
) -> List[dict]:
    conn = get_db_connection()
    query = "SELECT * FROM products WHERE 1=1"
    params = []

    if location:
        query += " AND location LIKE ?"
        params.append(f"%{location}%")
    
    if min_ram is not None:
        query += " AND memory >= ?"
        print(query,min_ram)
        params.append(min_ram)

    if max_ram is not None:
        query += " AND memory <= ?"
        params.append(max_ram)

    if min_cpu is not None:
        query += " AND vcpu >= ?"
        params.append(min_cpu)
    
    if max_cpu is not None:
        query += " AND vcpu <= ?"
        params.append(max_cpu)

    print(params)
    cursor = conn.execute(query, params)
    rows = cursor.fetchall()
    print(rows)
    conn.close()
    return [dict(row) for row in rows]

@app.get("/products/{id}", response_model=dict)
async def get_product(id: str):
    conn = get_db_connection()
    cursor = conn.execute("SELECT * FROM products WHERE id = ?", (id,))
    product = cursor.fetchone()
    conn.close()
    
    if product is None:
        return {"error": "Product not found"}
    
    return dict(product)


@app.get("/products/", response_model=List[dict])
async def read_products(
    location: Optional[str] = Query(None, max_length=50),
    min_ram: Optional[float] = Query(None, gt=0),
    max_ram: Optional[float] = Query(None, gt=0),
    min_cpu: Optional[int] = Query(None, gt=0),
    max_cpu: Optional[int] = Query(None, gt=0)
):
    products = get_products(location, min_ram, max_ram, min_cpu, max_cpu)
    return [{
        "id": product["id"],
        "unit": product["unit"],
        "price_per_unit": product["price_per_unit"],
        "vcpu": product["vcpu"],
        "memory": product["memory"],
        "location": product["location"],
        "instance_type": product["instance_type"]
    } for product in products]
