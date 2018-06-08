#include <SPI.h>
#include <nRF24L01p.h>

nRF24L01p receiver(7,8);//CSN,CE
unsigned int samplingTime = 280;
unsigned int deltaTime = 40;
unsigned int sleepTime = 9680;

void setup(){
delay(150);
Serial.begin(115200);
SPI.begin();
SPI.setBitOrder(MSBFIRST);
receiver.channel(90);  // ตั้งช่องความถี่ให้ตรงกัน
receiver.RXaddress("ALL");  // ตั้งชื่อตำแห่นงให้ตรงกัน ชื่อตั้งได้สูงสุด 5 ตัวอักษร
receiver.init();
}

String message;

void loop(){
if(receiver.available()){
 receiver.read(); // สั่งให้เริ่มอ่าน
 delayMicroseconds(samplingTime);
receiver.rxPL(message); // สั่งใหอ่านเก็บไว้ที่ตัวแปร
 delayMicroseconds(deltaTime);

  delayMicroseconds(sleepTime);
Serial.println(message);
delay(1000);
message="";
}
}
