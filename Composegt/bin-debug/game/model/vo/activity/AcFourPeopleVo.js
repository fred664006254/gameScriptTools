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
var AcFourPeopleVo = (function (_super) {
    __extends(AcFourPeopleVo, _super);
    function AcFourPeopleVo() {
        var _this = _super.call(this) || this;
        //  --getServant  兑换的门客ID
        //   --getWife  兑换的红颜ID
        //   --needItem  兑换所需道具
        //   --needNum  兑换所需数量
        _this.getServant = 0;
        _this.getWife = 0;
        _this.needItem = 0;
        _this.needNum = 0;
        return _this;
    }
    Object.defineProperty(AcFourPeopleVo.prototype, "isShowRedDot", {
        get: function () {
            var cfg = Config.AcCfg.getCfgByActivityIdAndCode(this.aid, this.code);
            if (!cfg) {
                return false;
            }
            var fourPeoplelist = cfg.getPeopleList();
            var currBoo = false;
            for (var i = 0; i < fourPeoplelist.length; i++) {
                // 当前拥有多少道具
                var data = fourPeoplelist[i];
                var _itemNum = Api.itemVoApi.getItemNumInfoVoById(data.needItem);
                var servantInfoVo = Api.servantVoApi.getServantObj(data.getServant);
                if (servantInfoVo) {
                    currBoo = false;
                }
                else {
                    if (_itemNum >= data.needNum) {
                        currBoo = true;
                    }
                    else {
                        currBoo = false;
                    }
                    return currBoo;
                }
            }
        },
        enumerable: true,
        configurable: true
    });
    AcFourPeopleVo.prototype.dispose = function () {
        this.getServant = 0;
        this.getWife = 0;
        this.needItem = 0;
        this.needNum = 0;
    };
    return AcFourPeopleVo;
}(AcBaseVo));
__reflect(AcFourPeopleVo.prototype, "AcFourPeopleVo");
