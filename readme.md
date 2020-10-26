## Script fintual
Este es un script que dado una fecha de inversion(pasada), un monto inicial y un objeto o json de que lugares de inversiones, entrega el monto actual de dicho dinero invertido.


## Instrucciones de uso
1. npm install

2. Este es un script que recibe como argumentos tres elementos:
- fecha inicial de inversion
- monto inicial de inversion
- json con inversiones. Actualmente solo aguanta las siguientes inversiones:
```
{"risky_norris": 0.7, "moderate_pitt": 0.2, "conservative_clooney": 0.1}
```

Ejemplo de ejecucion:
```
node futureCash.js 14/04/2020 100 '{"risky_norris": 0.7, "moderate_pitt": 0.2, "conservative_clooney": 0.1}'
```
Si por algun motivo el script no funciona por la fecha, se debe a que en ese dia aun no se manejan datos, por lo que se puede modificar en el script, linea 9, tal como se ve comentada la linea 10