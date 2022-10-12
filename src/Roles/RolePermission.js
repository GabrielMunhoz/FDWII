const AccessControl = require("accesscontrol");
const ac = new AccessControl();
 
exports.roles = (function() {
ac.grant("player")
 .readOwn("player")
 .createOwn("player")
 .updateOwn("player")
 .readAny("advertisements")
 .createAny("advertisements")
 .readOwn("advertisements")
 .createOwn("advertisements")
 .updateOwn("advertisements")
 .deleteOwn("advertisements")
 .readAny("gameCategory")
 
 
ac.grant("admin")
 .extend("player")
 .readAny("player")
 .updateAny("player")
 .deleteAny("player")
 .createAny("advertisements")
 .readAny("advertisements")
 .updateAny("advertisements")
 .deleteAny("advertisements")
 .createAny("gameCategory")
 .readAny("gameCategory")
 .updateAny("gameCategory")
 .deleteAny("gameCategory")

return ac;
})();
