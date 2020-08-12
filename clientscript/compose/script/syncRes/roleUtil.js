
var resourceRole = require("../../config/resource/resourceRole.json");

// 规则工具
module.exports={
    // 检测并获取图片合图目录
    getMergeDir:function (path) {
        for (var k in resourceRole.mergedir) {

            var isFnt = k.indexOf("_fnt") !== -1 || k.indexOf("_fnt2") !== -1 || k.indexOf("_upfnt") !== -1;
            if (!isFnt) {                	
				if (path.indexOf(k + "/") === 0 && path.substr(k.length + 1).indexOf("/") === -1) {
					return k;
				}
            } else {if (path.indexOf(k + "/") === 0) {
			        return k;
                }
            }
        }
        return false;
    },
    // 检测是否需要压缩
    checkCompress:function (path) {
        
        for (var k in resourceRole.nocompress) {
            if (path.indexOf(k) === 0) {
                return false;
            }
        }
        return true;
    }
}