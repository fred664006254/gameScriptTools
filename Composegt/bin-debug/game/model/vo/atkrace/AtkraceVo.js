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
var AtkraceVo = (function (_super) {
    __extends(AtkraceVo, _super);
    function AtkraceVo() {
        var _this = _super.call(this) || this;
        /**
         * 衙门分数
         */
        _this.point = 0;
        /**
         * 仇人信息
         * {uid:uid,name:xx,point:分数,st:攻击时间,power:势力,level:官品}
         */
        _this.einfo = [];
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
         * 下一场战斗信息，收到下一个ainfo数据会替换到ainfo
         */
        _this.nextAInfo = null;
        /**
         * 防守信息
         * 0:{uid:uid,name:xx,point:分数,st:攻击时间,sid:门客id,num:战胜人数,retscore:得分}
         */
        _this.dinfo = [];
        /**
         * 是否可领奖
         */
        _this.rewardc = null;
        return _this;
    }
    AtkraceVo.prototype.initData = function (data) {
        if (data) {
            this.point = data.point;
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
            if (data.ainfo != null) {
                if (this.nextAInfo == null) {
                    this.nextAInfo = new AtkraceAtkInfoVo();
                    this.nextAInfo.initData(data.ainfo);
                    this.ainfo = new AtkraceAtkInfoVo();
                    this.ainfo.initData(data.ainfo);
                }
                else {
                    if (NetManager.curReceiveCmd == NetRequestConst.REQUEST_ATKRACE_CHOOSE || NetManager.curReceiveCmd == NetRequestConst.REQUEST_ATKRACE_FIGHT) {
                        App.LogUtil.log("最新数据", data.ainfo.meslist, data.ainfo.fids);
                        App.LogUtil.log("设置当前用数据", this.nextAInfo.bindData.meslist, this.nextAInfo.bindData.fids);
                        this.ainfo.initData(this.nextAInfo.bindData);
                        this.nextAInfo.initData(data.ainfo);
                    }
                    else {
                        this.ainfo.initData(data.ainfo);
                    }
                }
            }
            // else if (this.ainfo!=null) {
            // 	this.ainfo.dispose();
            // 	this.ainfo = null;
            // }
            this.dinfo = data.dinfo ? data.dinfo : [];
            this.einfo = data.einfo ? data.einfo : [];
        }
    };
    AtkraceVo.prototype.updataAdata = function () {
        if (this.nextAInfo && this.nextAInfo.bindData) {
            this.ainfo.initData(this.nextAInfo.bindData);
        }
    };
    AtkraceVo.prototype.dispose = function () {
        this.point = 0;
        this.einfo = null;
        this.lastday = 0;
        this.isjoin = 0;
        this.info.dispose();
        this.info = null;
        this.ainfo.dispose();
        this.ainfo = null;
        this.nextAInfo.dispose();
        this.nextAInfo = null;
        this.dinfo = null;
        this.rewardc = null;
    };
    return AtkraceVo;
}(BaseVo));
__reflect(AtkraceVo.prototype, "AtkraceVo");
