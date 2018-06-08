#include <SPI.h>
#include <nRF24L01p.h>

nRF24L01p transmitter(7,8);//CSN,CE

void setup() {
  //Serial.begin(9600);
  delay(150);
Serial.begin(115200);
SPI.begin();
SPI.setBitOrder(MSBFIRST);
transmitter.channel(90); // ตั้งช่องความถี่ให้ตรงกัน
transmitter.TXaddress("ALL"); // ตั้งชื่อตำแหน่งให้ตรงกัน ชื่อตั้งได้สูงสุด 5 ตัวอักษร
transmitter.init();
}


String message;
void loop() {
  // put your main code here, to run repeatedly:
  int light = analogRead(A7); 
Serial.println(light);
   String Slight = String(light);
   transmitter.txPL(Slight); // ค่าที่ต้องการส่ง
   transmitter.send(FAST); // สั่งให้ส่งออกไป
   delay(1000);
}
