angular
  .module('app')
  .controller('CtrolLogin', function($scope,$rootScope,$state,data, Servlogin, i18nService, uiGridConstants,$auth) 
  {

 //-------------------

 
       if ($auth.isAuthenticated()) {
       
        $rootScope.datos=$auth.getPayload();
       //alert("pasa por aca?");
        $rootScope.usuarioAver="Bienvenido "+ $rootScope.datos.nombre;  
 
        $rootScope.userAVer="Bienvenido "+$rootScope.datos.nombre;
        if ($rootScope.datos.perfil == "administrador") {
        //  alert("pasa por aca?");
          console.info("si pasa por aca en el inicio!");  
          $rootScope.esAdmin=true;
          $rootScope.esVend=true;
        }else if ($rootScope.datos.perfil == "comprador") {
          $rootScope.esAdmin=false;
          $rootScope.esVend=false;
        }else if ($rootScope.datos.perfil == "vendedor") {
          $rootScope.esAdmin=false;         
          $rootScope.esVend=true;
        } 
       
      }else{
        console.info("llega al ctrol gral?3")
        console.info("notoken",$auth.getPayload());
          $rootScope.SeVe=false;
          $rootScope.usuarioAver="";
   
      }

 //----------------------

    
      $scope.usuario={};
      $scope.usuario.mail="";
      $scope.usuario.password="";
      $scope.usuario.tipo="";
      $scope.usuario.nombre="";
 
      
      $scope.ver=true;
 
      if ($auth.isAuthenticated()) {
        console.info("token",$auth.getPayload());
        $scope.ver=false;
      }else{$scope.ver=true;}
      
    //  if ($auth.isAuthenticated()) {
       
    //     $scope.datos=$auth.getPayload();
    //     $scope.usuarioAver="Bienvenido "+ $scope.datos.nombre;  
    //     $scope.ver=false;
    //     $rootScope.userAVer="Bienvenido "+$scope.datos.nombre;
    //     if ($scope.datos.perfil == "administrador") {
    //       console.info("si pasa por aca en el inicio!");  
    //       $rootScope.esAdmin=true;
    //       $rootScope.esVend=true;
    //     }else if ($scope.datos.perfil == "comprador") {
    //       $rootScope.esAdmin=false;
    //       $rootScope.esVend=false;
    //     }else if ($scope.datos.perfil == "vendedor") {
    //       $rootScope.esAdmin=false;         
    //       $rootScope.esVend=true;
    //     } 
       
    // }else{
    //   console.info("llega al ctrol gral?3")
    //   console.info("notoken",$auth.getPayload());
    //     $rootScope.SeVe=false;
    //     $rootScope.usuarioAver="";
    //     $scope.ver=true;
    // }

       $scope.authenticate = function(provider)
       {
          $auth.authenticate(provider);
          console.info("Provider:",provider);
        };
            
      
         $scope.Volver=function()
            {
              $state.go("inicio");
            }

             $scope.Test=function(TipoTest,HD)
            { 
               
              $scope.users={};
              Servlogin.TraerTodos().then(function(resp){
                $scope.users=resp;
                
                $scope.users.forEach(function(resp){
                  // console.info(resp['mail']);
                  // console.info(resp['nombre']);
                  // console.info(resp['tipo']);
                  
                 if (resp['tipo']==TipoTest && HD==resp['estado']) 
                 {
                    $scope.usuario.mail=resp['mail'];
                    $scope.usuario.password=resp['password'];
                    $scope.usuario.tipo=resp['tipo'];
                    $scope.usuario.nombre=resp['nombre'];              
                     
                 }

                });
                 //---------------
              });
            }


      $scope.loguer=function()
      {

          Servlogin.TraerUnLogin($scope.usuario.mail).then(
          function(respuesta)
          {
            // console.info("nom de resp:",respuesta.nombre);
            // console.info("nom de scope:",$scope.usuario.nombre);
            //  console.info("mail de resp:",respuesta.mail);
            // console.info("mail de scope:",$scope.usuario.mail);
            // console.info("password de resp:",respuesta.password);
            // console.info("password de scope:",$scope.usuario.password);
            
            if (respuesta.estado!='D') 
            {
                  if ((respuesta.mail == respuesta.mail) && (respuesta.password == $scope.usuario.password) && (respuesta.nombre == $scope.usuario.nombre)) 
                  {
                     
                    
                    $rootScope.SeVe=true;
                    $scope.ver=false; 
                    $scope.resp="Logueado"; 

                     
                     
                    
                    $auth.login(respuesta)
                    .then(function(response) 
                    {
                      

                      //------------------
                      if ($auth.isAuthenticated()) {
                        console.info("token",$auth.getPayload());
                        $scope.ver=false;
                        $scope.datos=$auth.getPayload();
                        $rootScope.userAVer="Bienvenido "+$scope.datos.nombre;
                        if ($scope.datos.perfil == "administrador") {
                          $rootScope.esAdmin=true;
                          $rootScope.esVend=true;
                        }else if ($scope.datos.perfil == "comprador") {
                          $rootScope.esAdmin=false;
                          $rootScope.esVend=false;
                        }else if ($scope.datos.perfil == "vendedor") {
                          $rootScope.esAdmin=false;         
                          $rootScope.esVend=true;
                         }               


                      }else{
                        console.info("notoken",$auth.getPayload());
                        $scope.ver=true;
                      }
                      //----------------------------- 
                    })  
                    .catch(function(response) {
                        console.info("no volvio bien auth: ",response);
                    });

                  }else
                  {
                    console.log("no coincinde!");
                    alert("usuario o contraseña invalidos!");  
                    $scope.ver=true;
                  }
            }else{alert("Usuario deshabilitado!!")}
          })    
       
      }


     $scope.Desloguear=function()
      {   
        $auth.logout();
        $scope.resp="Deslogueado";   
        $scope.ver=true; 
        $rootScope.usuarioAver= ""; 
        $rootScope.SeVe=false; 
      }

})
