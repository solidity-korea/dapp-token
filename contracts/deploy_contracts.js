var MyToken = MyToken.require("./MyToken.sol");

module.exports = function(deployer) {
    deployer.deploy(MyToken);
};