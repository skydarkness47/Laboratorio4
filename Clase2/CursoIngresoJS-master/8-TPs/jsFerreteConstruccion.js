/*2.	Para el departamento de Construcción:
A.	 Mostrar la cantidad de alambre a comprar  si se ingresara el largo y el ancho de un terreno rectangular y se debe alambra con tres hilos de alambre.
B.	Mostrar la cantidad de alambre a comprar  si se ingresara el radio  de un terreno circular y se debe alambra con tres hilos de alambre.
C.	Para hacer un contrapiso de 1m x 1m se necesitan 2 bolsas de cemento y 3 de cal, debemos mostrar cuantas bolsas se necesitan de cada uno para las medidas que nos ingresen.


function Rectangulo () 
{

}
function Circulo () 
{
	
}
function Materiales () 
{
	
}
*/
//ejercicio 2 ---------------------------------------

var app = angular.module("FerreteFacturacion", []);
app.controller("Control2", function($scope){
$scope.largo="1";
$scope.ancho="2";
$scope.radio="3";


$scope.Rectangulo=function(){
$scope.result2 = (Number($scope.largo) * Number($scope.ancho))/2; 	
//$scope.result2="algo";
}

$scope.Circulo=function(){
$scope.result2 = (3.14 * Number($scope.radio)) *(3.14 * Number($scope.radio)) ; 	
}

$scope.Materiales=function(){
$scope.cemento=2;
$scope.cal=3;
$scope.resultCemento= (Number($scope.largo) * Number($scope.ancho)) *2;
$scope.resultCal=(Number($scope.largo) * Number($scope.ancho))*3;

}

//---------------------------------------------------


});