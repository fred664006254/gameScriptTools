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
 * 军团系统vo
 * author dky
 * date 2017/11/27
 * @class MyAllianceVo
 */
var MyAllianceVo = (function (_super) {
    __extends(MyAllianceVo, _super);
    function MyAllianceVo() {
        var _this = _super.call(this) || this;
        //玩家uid
        _this.uid = 0;
        //记录玩家的帮派信息
        _this.info = null;
        //玩家申请信息
        _this.apply = null;
        //玩家职位 1普通成员 2精英 3副盟主 4盟主
        _this.po = 0;
        //总贡献值
        _this.tctv = 0;
        //当前贡献值
        _this.ctv = 0;
        //玩家成员
        _this.joint = 0;
        //下次可以加入帮派的时间
        _this.nextt = 0;
        //特殊数据重置时间
        _this.lastday = 0;
        //下次可以加入帮派的时间
        _this.updated_at = 0;
        _this.shop = null;
        /**
         *  "攻击过的门客信息 1001 ＝ 1已攻击过 可恢复 2攻击过 不可恢复
         */
        _this.servant = {};
        return _this;
    }
    MyAllianceVo.prototype.initData = function (data) {
        if (data) {
            if (data.uid != null) {
                this.uid = Number(data.uid);
            }
            if (data.info != null) {
                this.info = data.info;
            }
            if (data.apply != null) {
                this.apply = data.apply;
            }
            if (data.po != null) {
                this.po = data.po;
            }
            if (data.tctv != null) {
                this.tctv = data.tctv;
            }
            if (data.ctv != null) {
                this.ctv = data.ctv;
            }
            if (data.donate != null) {
                this.donate = data.donate;
            }
            if (data.joint != null) {
                this.joint = data.joint;
            }
            if (data.nextt != null) {
                this.nextt = data.nextt;
            }
            if (data.lastday != null) {
                this.lastday = data.lastday;
            }
            if (data.updated_at != null) {
                this.updated_at = data.updated_at;
            }
            if (data.shop != null) {
                this.shop = data.shop;
            }
            if (data.servant != null) {
                this.servant = data.servant;
            }
        }
    };
    MyAllianceVo.prototype.dispose = function () {
        //玩家uid
        this.uid = 0;
        //记录玩家的帮派信息
        this.info = null;
        //玩家申请信息
        this.apply = null;
        //玩家职位 1普通成员 2精英 3副盟主 4盟主
        this.po = 0;
        //总贡献值
        this.tctv = 0;
        //最后捐献时间
        this.donate = null;
        //玩家成员
        this.joint = 0;
        //下次可以加入帮派的时间
        this.nextt = 0;
        //特殊数据重置时间
        this.lastday = 0;
        //下次可以加入帮派的时间
        this.updated_at = 0;
        this.shop = null;
        this.ctv = 0;
        this.servant = null;
    };
    return MyAllianceVo;
}(BaseVo));
__reflect(MyAllianceVo.prototype, "MyAllianceVo");
