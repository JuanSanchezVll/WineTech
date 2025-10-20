#include "DHT.h"  // biblioteca para sensores DHT
#define TIPO_SENSOR DHT11  // tipo do sensor: DHT11

// Pino onde o sensor está ligado.
const int PINO_SENSOR_DHT11 = A1;

DHT sensorDHT(PINO_SENSOR_DHT11, TIPO_SENSOR);  // cria objeto do sensor

void setup() {
  Serial.begin(9600);  // inicia Serial Monitor (velocidade 9600)
  sensorDHT.begin();   // inicializa o sensor DHT
}

void loop() {
  float umidade = sensorDHT.readHumidity();         // lê umidade (%)
  float temperatura = sensorDHT.readTemperature();  // lê temperatura (°C)

  if (isnan(temperatura) || isnan(umidade)) {          // checa se houve erro nas leituras
    Serial.println("Erro ao ler os dados do sensor");  // imprime mensagem de erro
  } else {
    Serial.print(umidade, 1);
    Serial.print(";");               // imprime com 1 casa decimal
    Serial.println(temperatura, 1);  // imprime com 1 casa decimal
  }

  delay(1000);  // espera 1 segundo antes da próxima leitura
}