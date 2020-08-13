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
 * 子嗣属性vo
 * author dmj
 * date 2017/9/23
 * @class ChildrenAttrVo
 */
var ChildAttrVo = (function (_super) {
    __extends(ChildAttrVo, _super);
    function ChildAttrVo() {
        var _this = _super.call(this) || this;
        // 武力
        _this.forceTotal = 0;
        // 智力
        _this.brainsTotal = 0;
        // 政治
        _this.politicsTotal = 0;
        // 魅力
        _this.charmTotal = 0;
        // 总和
        _this.attTotal = 0;
        return _this;
    }
    ChildAttrVo.prototype.initData = function (data) {
        if (data) {
            if (data) {
                var curTotal = this.attTotal;
                this.forceTotal = Number(data[0]);
                this.brainsTotal = Number(data[1]);
                this.politicsTotal = Number(data[2]);
                this.charmTotal = Number(data[3]);
                this.attTotal = this.forceTotal + this.brainsTotal + this.politicsTotal + this.charmTotal;
                // if(curTotal!=0 && this.attTotal - curTotal >0){
                // 	let dis = this.attTotal - curTotal;
                // 	let pos = egret.Point.create(320,GameConfig.stageHeigth/2);
                // 	// App.CommonUtil.playRewardFlyAction([{tipMessage:LanguageManager.getlocal("rankpower")+"+"+dis}],pos);	
                // 	let powerFly = new PowerFly();
                // 	powerFly.init(dis);
                // 	LayerManager.msgLayer.addChild(powerFly);
                // }
            }
        }
    };
    ChildAttrVo.prototype.dispose = function () {
        this.forceTotal = 0;
        this.brainsTotal = 0;
        this.politicsTotal = 0;
        this.charmTotal = 0;
    };
    return ChildAttrVo;
}(BaseVo));
__reflect(ChildAttrVo.prototype, "ChildAttrVo");
