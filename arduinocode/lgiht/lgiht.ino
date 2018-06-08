

void setup() {
  Serial.begin(9600);

}


String message;
void loop() {
  // put your main code here, to run repeatedly:
  int light = analogRead(A1); 

  Serial.println(light);
   delay(1000);
}
