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
/**
 * 门客系统vo
 * author dmj
 * date 2017/9/22
 * @class ServantVo
 */
var ServantVo = (function (_super) {
    __extends(ServantVo, _super);
    //是否通过擂台引导
    // private isShowAtkraceGuide = false;
    // private isCheckGuide = false;
    function ServantVo() {
        var _this = _super.call(this) || this;
        // 门客vo列表
        _this.servantInfoVoObj = null;
        return _this;
    }
    ServantVo.prototype.initData = function (data) {
        if (data) {
            if (data.info) {
                if (this.servantInfoVoObj == null) {
                    this.servantInfoVoObj = {};
                }
                for (var key in data.info) {
                    if (this.servantInfoVoObj[key]) {
                        this.servantInfoVoObj[key].initData(data.info[key]);
                    }
                    else {
                        var servantInfoVo = new ServantInfoVo();
                        servantInfoVo.servantId = key;
                        servantInfoVo.initData(data.info[key]);
                        this.servantInfoVoObj[key] = servantInfoVo;
                    }
                }
                // 引导擂台与否？
                if (Api.atkraceVoApi.isShowNpc() && !Api.servantVoApi.isShowAtkraceGuide) {
                    for (var key in data.info) {
                        if (data.info[key].lv >= 60) {
                            // if(this.isCheckGuide){
                            // 	this.isShowAtkraceGuide = true;
                            // }
                            //功能解锁
                            App.MessageHelper.dispatchEvent(MessageConst.MESSAGE_REFRESH_FUNCTION_TXT);
                            Api.servantVoApi.isShowAtkraceGuide = true;
                            if (Api.servantVoApi.isCheckGuide) {
                                Api.rookieVoApi.curGuideKey = "atkrace";
                                Api.rookieVoApi.insertWaitingGuide({ "idx": "atkrace_1" }, true);
                            }
                            break;
                        }
                    }
                }
                Api.servantVoApi.isCheckGuide = true;
            }
        }
        /**
         * 检测修身相关红点
         */
        App.MessageHelper.dispatchEvent(MessageConst.MESSAGE_REFRESH_PRACTICE_RED);
    };
    ServantVo.prototype.dispose = function () {
        //是否通过擂台引导
        // this.isShowAtkraceGuide = false;
        // this.isCheckGuide = false; 
        this.servantInfoVoObj = null;
    };
    return ServantVo;
}(BaseVo));
__reflect(ServantVo.prototype, "ServantVo");
