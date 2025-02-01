from fastapi import FastAPI, Query, Depends
from typing import List, Optional
import sqlite3
from collections import defaultdict
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

origins = [
    "http://localhost:5173",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

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

    cursor = conn.execute(query, params)
    rows = cursor.fetchall()
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

    # Group products by vcpu and memory
    grouped = defaultdict(lambda: {'vcpu': None, 'memory': None, 'instances': []})
    
    for product in products:
        key = (product["vcpu"], product["memory"])  # Using vcpu and memory as the key for grouping
        grouped[key]['vcpu'] = product["vcpu"]
        grouped[key]['memory'] = product["memory"]
        grouped[key]['instances'].append({
            "id": product["id"],
            "unit": product["unit"],
            "price_per_unit": product["price_per_unit"],
            "instance_type": product["instance_type"],
            "location": product["location"]
        })
    
    # Format the grouped data
    grouped_products = list(grouped.values())
    
    return grouped_products
