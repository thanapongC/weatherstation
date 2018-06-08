unsigned int samplingTime = 280;
unsigned int deltaTime = 40;
unsigned int sleepTime = 9680;
int sensorPin = 1; 
int sensorValue = 0; 

void setup() {
    // declare the ledPin as an OUTPUT:
    Serial.begin(9600);
}
void loop() {
    // read the value from the sensor:
    //delayMicroseconds(samplingTime);
    sensorValue = analogRead(sensorPin);
      //delayMicroseconds(deltaTime);
 // delayMicroseconds(sleepTime);
    Serial.println(sensorValue);
    delay(1000);
}
