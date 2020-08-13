var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = this && this.__extends || function __extends(t, e) { 
 function r() { 
 this.constructor = t;
}
for (var i in e) e.hasOwnProperty(i) && (t[i] = e[i]);
r.prototype = e.prototype, t.prototype = new r();
};
var StrengthenVoApi = (function (_super) {
    __extends(StrengthenVoApi, _super);
    function StrengthenVoApi() {
        return _super.call(this) || this;
    }
    StrengthenVoApi.prototype.checkNpcMessage = function () {
        var arr = ["challenge", "manage", "affair", "search", "wife", "servant", "bookroom", "studyatk"];
        for (var i = 0; i < arr.length; i++) {
            var openType = arr[i];
            if (openType == "servant") {
                if ([openType + "VoApi"] && Api[openType + "VoApi"].checkRedPoint()) {
                    return true;
                }
            }
            else if (openType == "affair") {
                // if (Api.manageVoApi.getCurAffairNums() > 0)
                // {
                // 	return true;
                // } 
            }
            else if (openType == "bookroom") {
                if (Api[openType + "VoApi"] && Api[openType + "VoApi"].checkNpcMessage()) {
                    return true;
                }
            }
            else if (Api[openType + "VoApi"] && Api[openType + "VoApi"].isShowNpc) {
                var isShowNpc = Api[openType + "VoApi"].isShowNpc();
                if (isShowNpc && Api[openType + "VoApi"] && Api[openType + "VoApi"].checkNpcMessage()) {
                    return true;
                }
            }
        }
        return false;
    };
    return StrengthenVoApi;
}(BaseVoApi));
__reflect(StrengthenVoApi.prototype, "StrengthenVoApi");
