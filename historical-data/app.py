import os
from flask import Flask, jsonify, request
import psycopg2
from psycopg2.extras import RealDictCursor

app = Flask(__name__)

def get_db_connection():
    conn = psycopg2.connect(os.environ.get('DATABASE_URL'))
    return conn

@app.route('/')
def hello():
    return "Historical Data Service is running!"

@app.route('/data', methods=['GET'])
def get_historical_data():
    conn = None
    try:
        conn = get_db_connection()
        cur = conn.cursor(cursor_factory=RealDictCursor)
        cur.execute("SELECT * FROM weather_searches ORDER BY searched_at DESC LIMIT 100;")
        historical_data = cur.fetchall()
        cur.close()
        return jsonify(historical_data)
    except (Exception, psycopg2.Error) as error:
        print("Error while fetching data from PostgreSQL", error)
        return jsonify({"error": "Failed to retrieve historical data"}), 500
    finally:
        if conn:
            conn.close()

# Extra (For future improvement): Endpoint to get history for a specific city
@app.route('/data/<city_name>', methods=['GET'])
def get_city_historical_data(city_name):
    conn = None
    try:
        conn = get_db_connection()
        cur = conn.cursor(cursor_factory=RealDictCursor)
        cur.execute("SELECT * FROM weather_searches WHERE city_name ILIKE %s ORDER BY searched_at DESC LIMIT 50;", (city_name,))
        city_data = cur.fetchall()
        cur.close()
        return jsonify(city_data)
    except (Exception, psycopg2.Error) as error:
        print(f"Error while fetching data for {city_name} from PostgreSQL", error)
        return jsonify({"error": f"Failed to retrieve historical data for {city_name}"}), 500
    finally:
        if conn:
            conn.close()


if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000) # Must match EXPOSE & Nginx
