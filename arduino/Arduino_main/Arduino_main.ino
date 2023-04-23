#include <Adafruit_Fingerprint.h>

const int delayTime = (5000/800+1);



SoftwareSerial mySerial(2, 3);
Adafruit_Fingerprint finger = Adafruit_Fingerprint(&mySerial);

int timer=0;
long dur;
int dist;

// initialization of pins
const int buzzerPin = 8;
const int trig = 9;
const int echo = 10;

void setup()
{
  Serial.begin(9600);
  pinMode(LED_BUILTIN, OUTPUT);
  digitalWrite(LED_BUILTIN, LOW);
  


  // setup sonar
  pinMode(trig, OUTPUT); 
  pinMode(echo, INPUT);



  //fingerprint setup
  finger.begin(57600);
  delay(5);
  if (finger.verifyPassword()) {} 
  else 
  {
    while (1) { delay(1); }
  }
  
}

void loop()
{
  // registration part
  if(Serial.available()){
    uint8_t id=Serial.parseInt();
    if (id == 0) // ID #0 not allowed, try again!
    {
      return;
    }
    if (id == uint8_t(-1))
    {
      Serial.println("Cleared all finger prints from database");
      finger.emptyDatabase();
      return;    
    }
    Serial.print("Enrolling ID #");
    Serial.println(id);
    while (!  getFingerprintEnroll(id) );
    delay(5000);
  }
  // maintaining the delay after verification
  if(timer!=0){
    Serial.println(timer);
    timer++;
  }
  
  // check the identity
  if ( getFingerPrint() != -1)
  {
    digitalWrite(LED_BUILTIN, LOW); 
    timer++;  
  } 

  // delay time stops
  if(timer==delayTime){
    timer=0;
    digitalWrite(LED_BUILTIN, LOW);
  }


  // 
  if(timer==0){
    // trig sending
    digitalWrite(trig, LOW);
    delayMicroseconds(2);
    digitalWrite(trig, HIGH);
    delayMicroseconds(10);
    digitalWrite(trig, LOW);
    
    // echo receiving
    dur = pulseIn(echo, HIGH);
    dist= dur * 0.034 / 2;
    delay(200);

    Serial.print("Distance in cm: ");
    Serial.print(dist); 
    Serial.println("cm");

    alerting(dist);


  }
  //Add some delay before next scan.
  delay(800);            
}

void alerting(int dist){
  if(dist<30){
      Serial.println("Alert!!!");
      digitalWrite(LED_BUILTIN, HIGH);
      delay(5000);
    // tone(buzzerPin, 1000);                 // Play a tone of 1000 Hz
    // delay(500);                            // Wait for 500ms
    // noTone(buzzerPin);   
    // digitalWrite(7, HIGH);                     // Stop playing the tone
    // delay(1000);    
                          // Wait for another 500ms
    }
    else{
       digitalWrite(LED_BUILTIN, LOW);
      // digitalWrite(7, LOW);
    }
}


// returns -1 if failed, otherwise returns ID #
int getFingerPrint() 
{
  int p = finger.getImage();
  if (p != FINGERPRINT_OK)  return -1;

  p = finger.image2Tz();
  if (p != FINGERPRINT_OK)  return -1;

  p = finger.fingerFastSearch();
  if (p != FINGERPRINT_OK)  return -1;

  // found a match!
  Serial.print("ID-");
  Serial.println( finger.fingerID);
  return finger.fingerID;
}


// registering an id for fingerprint
uint8_t getFingerprintEnroll(uint8_t id) 
{

  int p = -1;
  Serial.print("Waiting for valid finger to enroll as #"); Serial.println(id);
  while (p != FINGERPRINT_OK) 
  {
    p = finger.getImage();
    switch (p) 
    {
    case FINGERPRINT_OK:
      Serial.println("Image taken");
      break;
    case FINGERPRINT_NOFINGER:
      break;
    case FINGERPRINT_PACKETRECIEVEERR:
      Serial.println("Communication error");
      break;
    case FINGERPRINT_IMAGEFAIL:
      Serial.println("Imaging error");
      break;
    default:
      Serial.println("Unknown error");
      break;
    }
  }

  // OK success!

  p = finger.image2Tz(1);
  switch (p) 
  {
    case FINGERPRINT_OK:
      Serial.println("Image converted");
      break;
    case FINGERPRINT_IMAGEMESS:
      Serial.println("Image too messy");
      return p;
    case FINGERPRINT_PACKETRECIEVEERR:
      Serial.println("Communication error");
      return p;
    case FINGERPRINT_FEATUREFAIL:
      Serial.println("Could not find fingerprint features");
      return p;
    case FINGERPRINT_INVALIDIMAGE:
      Serial.println("Could not find fingerprint features");
      return p;
    default:
      Serial.println("Unknown error");
      return p;
  }

  Serial.println("Remove finger");
  delay(2000);
  p = 0;
  while (p != FINGERPRINT_NOFINGER) 
  {
    p = finger.getImage();
  }
  Serial.print("ID "); Serial.println(id);
  p = -1;
  Serial.println("Place same finger again");
  while (p != FINGERPRINT_OK) 
  {
    p = finger.getImage();
    switch (p) 
    {
    case FINGERPRINT_OK:
      Serial.println("Image taken");
      break;
    case FINGERPRINT_NOFINGER:
      break;
    case FINGERPRINT_PACKETRECIEVEERR:
      Serial.println("Communication error");
      break;
    case FINGERPRINT_IMAGEFAIL:
      Serial.println("Imaging error");
      break;
    default:
      Serial.println("Unknown error");
      break;
    }
  }

  // OK success!

  p = finger.image2Tz(2);
  switch (p) 
  {
    case FINGERPRINT_OK:
      Serial.println("Image converted");
      break;
    case FINGERPRINT_IMAGEMESS:
      Serial.println("Image too messy");
      return p;
    case FINGERPRINT_PACKETRECIEVEERR:
      Serial.println("Communication error");
      return p;
    case FINGERPRINT_FEATUREFAIL:
      Serial.println("Could not find fingerprint features");
      return p;
    case FINGERPRINT_INVALIDIMAGE:
      Serial.println("Could not find fingerprint features");
      return p;
    default:
      Serial.println("Unknown error");
      return p;
  }

  // OK converted!
  Serial.print("Creating model for #");  Serial.println(id);

  p = finger.createModel();
  if (p == FINGERPRINT_OK) {
    Serial.println("Prints matched!");
  } else if (p == FINGERPRINT_PACKETRECIEVEERR) {
    Serial.println("Communication error");
    return p;
  } else if (p == FINGERPRINT_ENROLLMISMATCH) {
    Serial.println("Fingerprints did not match");
    return p;
  } else {
    Serial.println("Unknown error");
    return p;
  }

  Serial.print("ID "); Serial.println(id);
  p = finger.storeModel(id);
  if (p == FINGERPRINT_OK) {
    Serial.println("Stored!");
  } else if (p == FINGERPRINT_PACKETRECIEVEERR) {
    Serial.println("Communication error");
    return p;
  } else if (p == FINGERPRINT_BADLOCATION) {
    Serial.println("Could not store in that location");
    return p;
  } else if (p == FINGERPRINT_FLASHERR) {
    Serial.println("Error writing to flash");
    return p;
  } else {
    Serial.println("Unknown error");
    return p;
  }

  return true;
}

