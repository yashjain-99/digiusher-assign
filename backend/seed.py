import json
import sqlite3
from dataclasses import dataclass
import urllib.request

url = 'https://pricing.us-east-1.amazonaws.com/offers/v1.0/aws/AmazonRDS/20250113201859/eu-west-1/index.json'

@dataclass
class Product:
    id: str
    unit: str
    price_per_unit: str
    vcpu: str
    memory: str
    location: str
    instance_type: str


def parse_pricing_data(data: dict) -> list[Product]:
    products = []
    on_demand = data['terms']['OnDemand']

    for product_id, product in data['products'].items():
        if product.get('productFamily') != 'Database Instance':
            continue
        attributes = product['attributes']
        on_demand_pricing_data = on_demand.get(product_id)
        if not on_demand_pricing_data:
            continue
        for _, product_subtype_pricing_data in on_demand_pricing_data.items():
            for _, product_dimension_pricing_data in product_subtype_pricing_data['priceDimensions'].items():
                rate_code = product_dimension_pricing_data['rateCode']
                unit = product_dimension_pricing_data['unit']
                price_per_unit = product_dimension_pricing_data['pricePerUnit']['USD']
                vcpu = attributes['vcpu']
                memory = attributes['memory']
                location = attributes['location']
                instance_type = attributes['instanceType']
                products.append(Product(rate_code, unit, price_per_unit, vcpu, memory, location, instance_type))

    return products


def create_db():
    """Create an SQLite database and table for storing product data."""
    conn = sqlite3.connect('aws_pricing.db')
    c = conn.cursor()
    c.execute('''
        CREATE TABLE IF NOT EXISTS products (
            id TEXT PRIMARY KEY,
            unit TEXT,
            price_per_unit DECIMAL,
            vcpu INT,
            memory DECIMAL,
            location TEXT,
            instance_type TEXT
        )
    ''')
    conn.commit()
    conn.close()


def insert_product(product: Product):
    """Insert a product into the SQLite database."""
    conn = sqlite3.connect('aws_pricing.db')
    c = conn.cursor()
    c.execute('''
        INSERT OR REPLACE INTO products (id, unit, price_per_unit, vcpu, memory, location, instance_type)
        VALUES (?, ?, ?, ?, ?, ?, ?)
    ''', (product.id, product.unit, float(product.price_per_unit), int(product.vcpu), float(product.memory.split(' ')[0]), product.location, product.instance_type))
    conn.commit()
    conn.close()


if __name__ == '__main__':
    # Fetch and parse the data
    with urllib.request.urlopen(url) as f:
        response = f.read().decode('utf-8')
    
    data = json.loads(response)
    
    parsed_data = parse_pricing_data(data)
    
    # Set up the SQLite database and table
    create_db()

    # Insert parsed data into the SQLite database
    for product in parsed_data:
        insert_product(product)

    print("Data successfully inserted into the database.")
