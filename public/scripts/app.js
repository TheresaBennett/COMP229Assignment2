// IFFE - Immediatly invoced fuction expression
(function(){
   
    function Start ()
    {
        console.log("App Started...");
    }
    window.addEventListener("Load", Start);

})();