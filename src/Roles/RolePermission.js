const AccessControl = require("accesscontrol");
const ac = new AccessControl();
 
exports.roles = (function() {
ac.grant("player")
 .readOwn("player")
 .createOwn("player")
 .updateOwn("player")
 .readAny("advertisements")
 .readOwn("advertisements")
 .createOwn("advertisements")
 .updateOwn("advertisements")
 
 
ac.grant("admin")
 .extend("player")
 .readAny("player")
 .updateAny("player")
 .deleteAny("player")
 .createAny("pets")
 .readAny("advertisements")
 .updateAny("advertisements")
 .deleteAny("advertisements")

return ac;
})();
