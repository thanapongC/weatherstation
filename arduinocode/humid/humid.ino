#include "DHT.h"
unsigned int samplingTime = 280;
unsigned int deltaTime = 40;
unsigned int sleepTime = 9680;
DHT dht;

void setup()
{
  Serial.begin(9600);
  dht.setup(5);
  
}
void loop()
{
  delayMicroseconds(samplingTime);
  int humidity = dht.getHumidity();
   delayMicroseconds(deltaTime);
   delayMicroseconds(sleepTime);
  Serial.println(humidity);
  delay(1000);
}

