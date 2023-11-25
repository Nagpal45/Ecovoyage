from flask import Flask, request, jsonify
import joblib
import pandas as pd
from flask_cors import CORS

app = Flask(__name__)
CORS(app, resources={r"/predict": {"origins": ["http://localhost:3000"]}})
CORS(app, resources={r"/carData/*": {"origins": ["http://localhost:3000"]}})
model = joblib.load('C:/Users/ASUS/Desktop/Ecovoyage/co2_emissions_model.pkl')

training_data = pd.read_csv('C:/Users/ASUS/Desktop/Ecovoyage/MLmodel/co2_emissions.csv')
features = ['carMake', 'carModel', 'vehicleClass', 'transmission', 'fuelType']
df_encoded = pd.get_dummies(training_data[features])

@app.route('/predict', methods=['POST'])
def predict():
    try:
        data = request.json
        car_data = pd.DataFrame([data])

        car_data_encoded = pd.get_dummies(car_data).reindex(columns=df_encoded.columns, fill_value=0)
        prediction = model.predict(car_data_encoded)[0]

        return jsonify({'prediction': prediction})
    except Exception as e:
        return jsonify({'error': str(e)})
    
@app.route('/carData/<carMake>', methods=['GET'])
def get_car_data(carMake):
    try:
        car_data = training_data[training_data['carMake'] == carMake]

        models = car_data['carModel'].unique().tolist()
        vehicle_classes = car_data['vehicleClass'].unique().tolist()
        transmissions = car_data['transmission'].unique().tolist()
        fuel_types = car_data['fuelType'].unique().tolist()

        return jsonify({
            'models': models,
            'vehicle_classes': vehicle_classes,
            'transmissions': transmissions,
            'fuel_types': fuel_types
        })
    except Exception as e:
        return jsonify({'error': str(e)})
    
@app.route('/carData/<carMake>/<carModel>', methods=['GET'])
def get_car_data2(carMake, carModel):
    try:
        car_data = training_data[training_data['carModel'] == carModel]

        vehicle_classes = car_data['vehicleClass'].unique().tolist()
        transmissions = car_data['transmission'].unique().tolist()
        fuel_types = car_data['fuelType'].unique().tolist()

        return jsonify({
            'vehicle_classes': vehicle_classes,
            'transmissions': transmissions,
            'fuel_types': fuel_types
        })
    except Exception as e:
        return jsonify({'error': str(e)})

if __name__ == '__main__':
    app.run(port=8000)
