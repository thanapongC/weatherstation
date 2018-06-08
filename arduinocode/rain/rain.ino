unsigned int samplingTime = 280;
unsigned int deltaTime = 40;
unsigned int sleepTime = 9680;
void setup() {
  Serial.begin(9600);

}

void loop() {
  delayMicroseconds(samplingTime);
  int rain = digitalRead(2); 
  delayMicroseconds(deltaTime);
  delayMicroseconds(sleepTime);
  Serial.println(rain);
  delay(1000);
}
