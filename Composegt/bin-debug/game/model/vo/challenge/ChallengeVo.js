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
var ChallengeVo = (function (_super) {
    __extends(ChallengeVo, _super);
    function ChallengeVo() {
        var _this = _super.call(this) || this;
        /**
         * 目前已经通过的关卡ID
         */
        _this.cid = 0;
        /**
         * 正在战斗的关卡已经消灭的士兵数
         */
        _this.ksoldier = 0;
        /**
         *  "攻击过的门客信息 1001 ＝ 1已攻击过 可恢复 2攻击过 不可恢复
         */
        _this.info = {};
        return _this;
    }
    ChallengeVo.prototype.initData = function (data) {
        if (data) {
            if (data.cid != null) {
                var curCid = this.cid;
                this.cid = Number(data.cid);
                if ((!this.cid) || this.cid != curCid) {
                    Api.composemapVoApi.formatUnlockGroupList();
                }
                // this.cid = 3; // test code
                //分阶段引导
                // if(curCid != this.cid && this.cid == 216 && curCid == 215&&Api.switchVoApi.checkOpenPrison()){
                // 	Api.rookieVoApi.curGuideKey = "prison";
                // 	Api.rookieVoApi.insertWaitingGuide({"idx":"prison_1"},true);
                // 	if(PlatformManager.isShowNewAnalytics())
                // 	{
                // 		PlatformManager.analyticsUnlockCell();
                // 	}
                // }
                // if(curCid != this.cid && this.cid == 41 && curCid == 40){
                // 	if(PlatformManager.isShowNewAnalytics())
                // 	{
                // 		PlatformManager.analyticsFirstChapter();
                // 	}
                // }
            }
            if (data.ksoldier != null) {
                this.ksoldier = Number(data.ksoldier);
            }
            if (data.info != null) {
                this.info = data.info;
            }
        }
    };
    ChallengeVo.prototype.dispose = function () {
        this.cid = 0;
        this.ksoldier = 0;
        this.info = {};
    };
    return ChallengeVo;
}(BaseVo));
__reflect(ChallengeVo.prototype, "ChallengeVo");
