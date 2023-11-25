import pandas as pd
from sklearn.model_selection import train_test_split
from sklearn.linear_model import LinearRegression
from sklearn.metrics import mean_squared_error
import joblib 

df = pd.read_csv('C:/Users/ASUS/Desktop/Ecovoyage/MLmodel/co2_emissions.csv')
features = ['carMake', 'carModel', 'vehicleClass', 'transmission', 'fuelType']
target = 'CO2 Emissions(g/km)'
df_encoded = pd.get_dummies(df[features])

X_train, X_test, y_train, y_test = train_test_split(df_encoded, df[target], test_size=0.2, random_state=42)

model = LinearRegression()
model.fit(X_train, y_train)

predictions = model.predict(X_test)

mse = mean_squared_error(y_test, predictions)
print(f'Mean Squared Error: {mse}')

joblib.dump(model, 'co2_emissions_model.pkl')