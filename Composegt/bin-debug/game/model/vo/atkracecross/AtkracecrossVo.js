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
var AtkracecrossVo = (function (_super) {
    __extends(AtkracecrossVo, _super);
    function AtkracecrossVo() {
        var _this = _super.call(this) || this;
        /**
         * 衙门分数
         */
        _this.point = 0;
        /**
         * 仇人信息
         * {uid:uid,name:xx,point:分数,st:攻击时间,power:势力,level:官品}
         */
        _this.einfo = null;
        /**
         * 请求处理最后时间
         */
        _this.lastday = 0;
        /**
         * 是否参与过
         */
        _this.isjoin = 0;
        /**
         * 武馆信息
         */
        _this.info = null;
        /**
         * 战斗信息
         */
        _this.ainfo = null;
        /**
         * 防守信息
         * 0:{uid:uid,name:xx,point:分数,st:攻击时间,sid:门客id,num:战胜人数,retscore:得分}
         */
        _this.dinfo = null;
        /**
         * 是否可领奖
         */
        _this.rewardc = null;
        return _this;
    }
    AtkracecrossVo.prototype.initData = function (data) {
        if (data) {
            this.point = data.point;
            this.einfo = data.einfo;
            this.lastday = data.lastday;
            this.isjoin = data.isjoin;
            if (data.rewardc) {
                this.rewardc = data.rewardc;
            }
            if (data.info != null) {
                if (this.info == null) {
                    this.info = new AtkraceInfoVo();
                }
                this.info.initData(data.info);
            }
            else if (this.info != null) {
                this.info.dispose();
                this.info = null;
            }
            if (data.ainfo != null && Object.keys(data.ainfo).length > 0) {
                if (this.ainfo == null) {
                    this.ainfo = new AtkraceAtkInfoVo();
                }
                this.ainfo.initData(data.ainfo);
            }
            else if (this.ainfo != null) {
                this.ainfo.dispose();
                this.ainfo = null;
            }
            this.dinfo = data.dinfo;
        }
    };
    AtkracecrossVo.prototype.dispose = function () {
        this.point = 0;
        this.einfo = null;
        this.lastday = 0;
        this.isjoin = 0;
        this.info.dispose();
        this.info = null;
        this.ainfo.dispose();
        this.ainfo = null;
        this.dinfo = null;
        this.rewardc = null;
    };
    return AtkracecrossVo;
}(BaseVo));
__reflect(AtkracecrossVo.prototype, "AtkracecrossVo");
