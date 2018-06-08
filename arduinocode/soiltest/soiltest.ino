int sensor_pin = A1; 
int output_value ;
unsigned int samplingTime = 280;
unsigned int deltaTime = 40;
unsigned int sleepTime = 9680;

void setup() {
  Serial.begin(9600);
  }

void loop() {
    delayMicroseconds(samplingTime);
  output_value= analogRead(sensor_pin);
  output_value = map(output_value,550,0,0,100);
  delayMicroseconds(deltaTime);
  delayMicroseconds(sleepTime);
  Serial.println(output_value);

  delay(1000);
  }
