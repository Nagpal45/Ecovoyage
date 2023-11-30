import numpy as np
import pandas as pd
from sklearn.model_selection import train_test_split
from sklearn.metrics import mean_squared_error
import joblib
from sklearn.preprocessing import StandardScaler

class CustomLinearRegression:
    def __init__(self, learning_rate=0.01, n_iterations=1000, alpha=0.1):
        self.alpha = alpha
        self.learning_rate = learning_rate
        self.n_iterations = n_iterations
        self.weights = None
        self.bias = None

    def fit(self, X, y):
        self.weights = np.zeros(X.shape[1])
        self.bias = 0

        for _ in range(self.n_iterations):
            predictions = self.predict(X)
            gradient_weights = -(2/X.shape[0]) * np.dot(X.T, (y - predictions))
            gradient_bias = -(2/X.shape[0]) * np.sum(y - predictions)

            self.weights -= self.learning_rate * gradient_weights
            self.bias -= self.learning_rate * gradient_bias

    def predict(self, X):
        return np.dot(X, self.weights) + self.bias
    
    

df = pd.read_csv('C:/Users/ASUS/Desktop/Ecovoyage/MLmodel/co2_emissions.csv')
features = ['carMake', 'carModel', 'vehicleClass', 'transmission', 'fuelType']
target = 'CO2 Emissions(g/km)'
df_encoded = pd.get_dummies(df[features])

X_train, X_test, y_train, y_test = train_test_split(df_encoded, df[target], test_size=0.2, random_state=42)

scaler = StandardScaler()
X_train = scaler.fit_transform(X_train)
X_test = scaler.transform(X_test)



model = CustomLinearRegression()
model.fit(X_train, y_train)

predictions = model.predict(X_test)

mse = mean_squared_error(y_test, predictions)
print(f'Mean Squared Error: {mse}')

joblib.dump(model, 'co2_emissions_model1.pkl')