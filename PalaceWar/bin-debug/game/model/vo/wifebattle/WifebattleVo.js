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
 * 红颜对战vo
 * author jiangly
 * date 2018/08/13
 * @class WifebattleVo
 */
var WifebattleVo = (function (_super) {
    __extends(WifebattleVo, _super);
    function WifebattleVo() {
        var _this = _super.call(this) || this;
        // public sinfo:{string:{attr:number,name:string,ranking:number,uid:string,zid:string,lv:number}}[] = [];
        // public winfo:{string:{intimacy:number,name:string,ranking:number,uid:string,zid:string,lv:number}}[] = [];
        // public uid:string = null;
        // 是否能参与 2是正常进入
        _this.isjoin = null;
        //群芳会分数 排行榜分数 不能购买道具
        _this.point = 0;
        //群芳会积分
        _this.rewardnum = 0;
        //玩家状态
        _this.info = null;
        //对手信息
        _this.ainfo = null;
        return _this;
    }
    WifebattleVo.prototype.initData = function (data) {
        if (data) {
            this.isjoin = data.isjoin;
            if (data.point) {
                this.point = data.point;
            }
            this.rewardnum = data.rewardnum;
            if (data.info) {
                this.info = data.info;
            }
            if (data.ainfo) {
                this.ainfo = data.ainfo;
            }
            App.MessageHelper.dispatchEvent(MessageConst.MESSAGE_WIFEBATTLE_REFRESHVO);
        }
    };
    //检测是否已经有没攻击的敌人
    WifebattleVo.prototype.checkHaveEnemy = function () {
        if (this.ainfo && this.ainfo.uid) {
            return true;
        }
        else {
            return false;
        }
    };
    //检测是否到时间可以搜索
    WifebattleVo.prototype.checkCanCDSearch = function () {
        if (GameData.serverTime - this.info.lasttime > Config.WifebattleCfg.intervalTime) {
            return true;
        }
        else {
            return false;
        }
    };
    WifebattleVo.prototype.checkHaveSearchCount = function () {
        if (this.info && this.info.num < Config.WifebattleCfg.dailyNum) {
            return true;
        }
        else {
            return false;
        }
    };
    //检测当前红颜是否需要弹出搜寻框
    WifebattleVo.prototype.isShowWifeSearch = function () {
        if (this.ainfo && this.ainfo.handle == 0) {
            return true;
        }
        else {
            return false;
        }
    };
    //得到对手位分最高的弹出提示信息
    WifebattleVo.prototype.getEnemyMaxInfo = function () {
        if (this.ainfo && this.ainfo.maxwifeinfo) {
            if (this.ainfo.maxwifeinfo.sexflag && this.ainfo.maxwifeinfo.sexflag >= 1) {
                //男红颜
                return { wifeid: this.ainfo.maxwifeinfo.wifeid, skin: this.ainfo.maxwifeinfo.maleskin, sexflag: this.ainfo.maxwifeinfo.sexflag };
            }
            else {
                return { wifeid: this.ainfo.maxwifeinfo.wifeid, skin: this.ainfo.maxwifeinfo.skin };
            }
        }
        else {
            return null;
        }
    };
    //CD显示
    WifebattleVo.prototype.getCDStr = function () {
        if (this.info && this.info.num >= Config.WifebattleCfg.dailyNum) {
            //今日次数用完
            return LanguageManager.getlocal("wifeBattleSearchDesc2");
        }
        else {
            if (!this.checkCanCDSearch()) {
                var time = this.info.lasttime + Config.WifebattleCfg.intervalTime - GameData.serverTime;
                var timeStr = App.DateUtil.getFormatBySecond(time, 3);
                return LanguageManager.getlocal('wifeBattleSearchDesc', [timeStr]);
            }
            else {
                return "";
            }
        }
    };
    WifebattleVo.prototype.dispose = function () {
        // 是否能参与 1是正常进入
        this.isjoin = null;
        //群芳会分数 排行榜分数 不能购买道具
        this.point = 0;
        this.rewardnum = 0;
        //玩家状态
        this.info = null;
        //对手信息
        this.ainfo = null;
    };
    return WifebattleVo;
}(BaseVo));
__reflect(WifebattleVo.prototype, "WifebattleVo");
//# sourceMappingURL=WifebattleVo.js.map