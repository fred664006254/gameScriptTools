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
 * 活动集合Vo基类
 * author 陈可
 * date 2018/12/3
 * @class AcGroupBaseVo
 */
var AcGroupBaseVo = (function (_super) {
    __extends(AcGroupBaseVo, _super);
    function AcGroupBaseVo() {
        var _this = _super.call(this) || this;
        _this._allAidList = [];
        _this._acList = {};
        _this._theLastVo = null;
        return _this;
    }
    AcGroupBaseVo.prototype.initData = function (data) {
        _super.prototype.initData.call(this, data);
        if (this.aid) {
            if (this._allAidList.length < 1) {
                this._allAidList = Config.IconorderCfg.getAcNameListByIcon(this.aid);
            }
            var tmpSt = 91543845929;
            var tmpEt = 0;
            for (var i = 0; i < this._allAidList.length; i++) {
                var aidAndCode = this._allAidList[i].split("-");
                // let aid = this._allAidList[i];
                var aid = aidAndCode[0];
                var code = aidAndCode[1];
                if (!this._acList[aid]) {
                    // let vo:AcBaseVo=Api.acVoApi.getActivityVoByAidAndCode(aid);
                    // if(vo)
                    // {
                    // 	this._acList[aid]=vo;
                    // }
                    //有code情况下直接取vo;
                    if (code) {
                        var vo = Api.acVoApi.getActivityVoByAidAndCode(aid, code);
                        if (vo) {
                            this._acList[aid] = vo;
                        }
                    }
                    else {
                        //取到list 集合
                        var voList = Api.acVoApi.getActivityVoListByAid(aid);
                        for (var i_1 = 0; i_1 < voList.length; i_1++) {
                            var vo = voList[i_1];
                            //当取到的icon == 当前aid的时候，ps：处理iconOrderCfg 没有配置 aid-code情况
                            if (Config.IconorderCfg.getIconNameByName(vo.aid, String(vo.code)) == this.aid) {
                                this._acList[aid] = vo;
                                break;
                            }
                        }
                    }
                }
                if (this._acList[aid] && this._acList[aid].isStart) {
                    tmpSt = Math.min(tmpSt, this._acList[aid].st);
                    if (tmpEt < this._acList[aid].et) {
                        tmpEt = this._acList[aid].et;
                        this._theLastVo = this._acList[aid];
                    }
                }
            }
            this.st = tmpSt;
            this.et = tmpEt;
        }
    };
    /**
     * 获取有数据的活动，包含正在开启的活动和等待开启的活动
     */
    AcGroupBaseVo.prototype.getAcVoList = function () {
        return this._acList;
    };
    Object.defineProperty(AcGroupBaseVo.prototype, "isShowRedDot", {
        // /**
        //  * 获取到所有控制的活动id列表，和配置里面一样是所有的
        //  */
        // public getAllCfgAidList():string[]
        // {
        // 	return this._allAidList||[];
        // }
        get: function () {
            var result = false;
            for (var aid in this._acList) {
                result = this._acList[aid].isShowRedDot;
                if (result) {
                    break;
                }
            }
            return result;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AcGroupBaseVo.prototype, "acCountDownNoExtra", {
        /**
         * 活动结束倒计时剔除展示期，格式：00：00：00
         */
        get: function () {
            var et = this.et;
            if (this._theLastVo && Config.AcCfg.getExtraTimeByIdAndCode(this._theLastVo.aid, this._theLastVo.code)) {
                et = this.et - Config.AcCfg.getExtraTimeByIdAndCode(this._theLastVo.aid, this._theLastVo.code) * 86400;
            }
            return App.DateUtil.getFormatBySecond((et - GameData.serverTime), 1);
        },
        enumerable: true,
        configurable: true
    });
    /**
     * 活动展示期
     */
    AcGroupBaseVo.prototype.checkIsInEndShowTime = function () {
        var v = false;
        var extraTime = 0;
        if (this._theLastVo) {
            extraTime = Config.AcCfg.getExtraTimeByIdAndCode(this._theLastVo.aid, this._theLastVo.code);
        }
        if (extraTime && (GameData.serverTime >= (this.et - extraTime * 86400))) {
            v = true;
        }
        return v;
    };
    AcGroupBaseVo.prototype.dispose = function () {
        this._allAidList = [];
        this._acList = {};
        this._theLastVo = null;
        _super.prototype.dispose.call(this);
    };
    return AcGroupBaseVo;
}(AcBaseVo));
__reflect(AcGroupBaseVo.prototype, "AcGroupBaseVo");
//# sourceMappingURL=AcGroupBaseVo.js.map