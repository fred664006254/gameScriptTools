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
 * @class AllianceVo
 */
var AllianceVo = (function (_super) {
    __extends(AllianceVo, _super);
    function AllianceVo() {
        var _this = _super.call(this) || this;
        //军团id
        _this.id = 0;
        //军团创建者uid
        _this.creator = 0;
        //军团创建者名称
        _this.creatorname = "";
        //军团经验
        _this.exp = 0;
        //玩家成员
        _this.list = null;
        //军团总人数
        _this.mn = 0;
        //军团当前最大人数
        _this.maxmn = 0;
        //军团名称
        _this.name = null;
        //军团财富
        _this.wealth = null;
        //qq
        _this.cqq = null;
        //密码
        _this.pswd = null;
        //微信
        _this.cweixin = null;
        //军团等级
        _this.level = 0;
        //对外公告
        _this.intro = null;
        //对内公告
        _this.message = null;
        //军团日志
        _this.log = null;
        //军团势力
        _this.affect = 0;
        //招募是否开启0随机加入
        _this.switch = null;
        //职位设置,初始化时处理职位
        _this.position = null;
        //特殊数据重置时间
        _this.lastday = null;
        //数据上次更新时间
        _this.updated_at = null;
        //今日贡献次数
        _this.info = null;
        //军团申请
        _this.apply = null;
        _this.boss = null;
        return _this;
    }
    AllianceVo.prototype.initData = function (data) {
        if (data) {
            if (data.id != null) {
                this.id = Number(data.id);
            }
            if (data.creator != null) {
                this.creator = Number(data.creator);
            }
            if (data.creatorname != null) {
                this.creatorname = String(data.creatorname);
            }
            if (data.exp != null) {
                this.exp = data.exp;
            }
            if (data.list != null) {
                this.list = data.list;
            }
            if (data.mn != null) {
                this.mn = data.mn;
            }
            if (data.maxmn != null) {
                this.maxmn = data.maxmn;
            }
            if (data.name != null) {
                this.name = data.name;
            }
            if (data.cqq != null) {
                this.cqq = data.cqq;
            }
            if (data.cweixin != null) {
                this.cweixin = data.cweixin;
            }
            if (data.level != null) {
                this.level = data.level;
            }
            if (data.intro != null) {
                this.intro = data.intro;
            }
            if (data.message != null) {
                this.message = data.message;
            }
            if (data.log != null) {
                this.log = data.log;
            }
            if (data.affect != null) {
                this.affect = data.affect;
            }
            if (data.switch != null) {
                this.switch = data.switch;
            }
            if (data.position != null) {
                this.position = data.position;
            }
            if (data.lastday != null) {
                this.lastday = data.lastday;
            }
            if (data.updated_at != null) {
                this.updated_at = data.updated_at;
            }
            if (data.wealth != null) {
                this.wealth = data.wealth;
            }
            if (data.pswd != null) {
                this.pswd = data.pswd;
            }
            if (data.boss != null) {
                this.boss = data.boss;
            }
            if (data.apply != null) {
                this.apply = data.apply;
            }
            if (data.info != null) {
                this.info = data.info;
            }
        }
    };
    AllianceVo.prototype.isBossOpen = function () {
        if (Object.keys(this.boss).length > 0) {
            return true;
        }
        return false;
    };
    //刺客首领是否已开启
    AllianceVo.prototype.isInfinityBoss = function () {
        return this.boss.infinityBoss == 1;
    };
    //刺客首领是否已开启
    AllianceVo.prototype.infinityBossTomorrow = function () {
        return this.boss.tomorrow || GameData.serverTime;
    };
    //刺客首领是否可以开启
    AllianceVo.prototype.isInfinityClear = function () {
        return this.boss.clear == 1;
    };
    AllianceVo.prototype.dispose = function () {
        //军团id
        this.id = null;
        //军团创建者uid
        this.creator = null;
        //军团创建者名称
        this.creatorname = null;
        //军团创建者名称
        this.exp = 0;
        //玩家成员
        this.list = null;
        //军团总人数
        this.mn = 0;
        //qq
        this.cqq = null;
        //微信
        this.cweixin = null;
        //军团等级
        this.level = null;
        //对外公告
        this.intro = null;
        //对内公告
        this.message = null;
        //军团日志
        this.log = null;
        //军团势力
        this.affect = 0;
        //招募是否开启0随机加入
        this.switch = null;
        //职位设置,初始化时处理职位
        this.position = null;
        //特殊数据重置时间
        this.lastday = null;
        //数据上次更新时间
        this.updated_at = null;
        this.maxmn = 0;
        this.name = null;
        this.wealth = 0;
        this.pswd = null;
        this.boss = null;
        this.info = 0;
    };
    return AllianceVo;
}(BaseVo));
__reflect(AllianceVo.prototype, "AllianceVo");
