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
 * 军团成员vo
 * author dky
 * date 2017/11/30
 * @class AllianceMemberInfoVo
 */
var AllianceMemberInfoVo = (function (_super) {
    __extends(AllianceMemberInfoVo, _super);
    function AllianceMemberInfoVo() {
        var _this = _super.call(this) || this;
        // id
        _this.id = "";
        // 帮派成员名称
        _this.name = "";
        // 帮派成员头像
        _this.pic = 0;
        // level
        _this.level = 0;
        // 帮派当前献值
        _this.ctv = 0;
        // 帮派成员贡献值
        _this.tctv = 0;
        // po
        _this.po = 0;
        // 帮派成员最后登录时间
        _this.logindt = 0;
        // 帮势力
        _this.power = 0;
        // 玩家ID
        _this.uid = 0;
        // 捐献的ID
        _this.donate = "0";
        return _this;
    }
    // todo  根据配置添加get方法，比如，子嗣头像，子嗣当前阶段，当前升级需要经验等
    AllianceMemberInfoVo.prototype.initData = function (data) {
        if (data) {
            if (data.name) {
                this.name = String(data.name);
            }
            if (data.pic) {
                this.pic = data.pic;
            }
            if (data.level) {
                this.level = data.level;
            }
            if (data.tctv) {
                this.tctv = Number(data.tctv);
            }
            if (data.ctv) {
                this.ctv = Number(data.ctv);
            }
            if (data.po) {
                this.po = Number(data.po);
            }
            if (data.logindt) {
                this.logindt = Number(data.logindt);
            }
            if (data.power) {
                this.power = Number(data.power);
            }
            if (data.uid) {
                this.uid = Number(data.uid);
            }
            if (data.donate) {
                this.donate = String(data.donate);
            }
        }
    };
    AllianceMemberInfoVo.prototype.dispose = function () {
        this.id = "";
        this.name = "";
        this.pic = 0;
        this.level = 0;
        this.tctv = 0;
        this.po = 0;
        this.logindt = 0;
        this.power = 0;
        this.uid = 0;
        this.donate = "0";
    };
    return AllianceMemberInfoVo;
}(BaseVo));
__reflect(AllianceMemberInfoVo.prototype, "AllianceMemberInfoVo");
