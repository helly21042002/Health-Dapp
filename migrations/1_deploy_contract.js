const health= artifacts.require("MedicalRecord");

module.exports= function(deployer){
    deployer.deploy(health);
   
}
