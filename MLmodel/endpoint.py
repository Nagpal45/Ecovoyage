from flask import Flask, request, jsonify
import joblib
import pandas as pd
from flask_cors import CORS

app = Flask(__name__)
CORS(app, resources={r"/predict": {"origins": ["http://localhost:3000"]}})
model = joblib.load('C:/Users/ASUS/Desktop/Ecovoyage/co2_emissions_model.pkl')
# Load the training data to get the feature names used during training
training_data = pd.read_csv('C:/Users/ASUS/Desktop/Ecovoyage/MLmodel/co2_emissions.csv')
features = ['carMake', 'carModel', 'vehicleClass', 'transmission', 'fuelType']
df_encoded = pd.get_dummies(training_data[features])

@app.route('/predict', methods=['POST'])
def predict():
    try:
        data = request.json
        print(data)
        car_data = pd.DataFrame([data])

        # Align the columns of car_data_encoded with the columns used during training
        car_data_encoded = pd.get_dummies(car_data).reindex(columns=df_encoded.columns, fill_value=0)
        print(car_data_encoded)
        prediction = model.predict(car_data_encoded)[0]

        return jsonify({'prediction': prediction})
    except Exception as e:
        return jsonify({'error': str(e)})

if __name__ == '__main__':
    app.run(port=8000)
