// Extend an existing object with a method from another
function augment( receivingClass, givingClass ) {
    // only provide certain methods
    if ( arguments[2] ) {
        for ( var i = 2, len = arguments.length; i < len; i++ ) {
            receivingClass.prototype[arguments[i]] = givingClass.prototype[arguments[i]];
        }
    }
    // provide all methods
    else {
        for ( var methodName in givingClass.prototype ) {
            // check to make sure the receiving class doesn't
            // have a method of the same name as the one currently
            // being processed
            if ( !Object.hasOwnProperty.call(receivingClass.prototype, methodName) ) {
                receivingClass.prototype[methodName] = givingClass.prototype[methodName];
            }
            
            // Alternatively (check prototype chain as well):
            // if ( !receivingClass.prototype[methodName] ) {
            //      receivingClass.prototype[methodName] = givingClass.prototype[methodName];
            // }
        }
    }
}
 
var Mixin  = function() {}
Mixin.prototype = {
  register: function(){
    console.log( "register" );
  },
  login: function(){
    console.log( "login" );
  },
  delete: function(){
    console.log( "delete" );
  }
};

// A skeleton carAnimator constructor
function Logincredentials() {
  this.moveLeft = function(){
    console.log( "login" );
  };
}
 
// A skeleton personAnimator constructor
function Credentials(){
  this.update = function(){
    console.log("Update details")
  };
}

augment(Logincredentials, Mixin);
augment(Credentials, Mixin);

// Create a new instance of carAnimator
var myBarcode = new Credentials();
myBarcode.register();
myBarcode.login();
myBarcode.delete();

var Barcode = new PersonAnimator();
Barcode.register();
Barcode.login();