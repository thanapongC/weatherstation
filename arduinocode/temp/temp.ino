#include "DHT.h"
unsigned int samplingTime = 280;
unsigned int deltaTime = 40;
unsigned int sleepTime = 9680;
DHT dht;

void setup()
{
  Serial.begin(9600);
  dht.setup(2);
  
}
void loop()
{
  delayMicroseconds(samplingTime);
  int temperature = dht.getTemperature();
   delayMicroseconds(deltaTime);
   delayMicroseconds(sleepTime);
  Serial.println(temperature+1);
  delay(1000);
}

