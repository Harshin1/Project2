// A constructor for defining new cars
function Barcode(options) {
  // some defaults
  this.format = options.format || 12;
  this.name = options.name || "product";
  
}

// A constructor for defining new trucks
}
 
// Define a skeleton vehicle factory
function VehicleFactory() {}
// Define the prototypes and utilities for this factory
 
// Our default vehicleClass is Car
VehicleFactory.prototype.vehicleClass = Barcode;
 
// Our Factory method for creating new Vehicle instances
VehicleFactory.prototype.createVehicle = function ( options ) {
  switch(options.vehicleType){
    case "Barcode":
      this.vehicleClass = Barcode;
      break;
    
    //defaults to VehicleFactory.prototype.vehicleClass (Car)
  }
 
  return new this.vehicleClass( options );
};
 
// Create an instance of our factory that makes cars
var carFactory = new VehicleFactory();
var car = carFactory.createVehicle( {
            vehicleType: "car",
            color: "yellow",
            doors: 6 } );
 
// Test to confirm our car was created using the vehicleClass/prototype Car

// Outputs: true
console.log(car instanceof Car);
 
// Outputs: Car object of color "yellow", doors: 6 in a "brand new" state
console.log(car);