
var process2 = require('child_process');
module.exports = {
	shell:function (cmd) {		
		process2.execSync(cmd,function (error, stdout, stderr) {
			if (error !== null) {
				console.log(error);
				console.log(cmd);
			}
		});
	}
}