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
 * 门客技能条
 */
var ServantSkillBar = (function (_super) {
    __extends(ServantSkillBar, _super);
    function ServantSkillBar(servantId, iconSize, showDetail) {
        if (iconSize === void 0) { iconSize = 72; }
        if (showDetail === void 0) { showDetail = true; }
        var _this = _super.call(this) || this;
        _this.iconSpace = 8;
        _this.skillData = [];
        // private onShowSkill: ServantSkillBarParams = null;
        _this._iconList = [];
        _this.servantId = servantId;
        _this.iconSize = iconSize;
        _this.showDetail = showDetail;
        _this.addEventListener(egret.Event.ADDED_TO_STAGE, _this.initView, _this);
        return _this;
    }
    ServantSkillBar.prototype.initView = function () {
        // let arr = Config.ServantskillCfg.getSpecialSkill(this.servantId);
        // for (let i=0;i<arr.length;i++) {
        // 	let _skill = Config.ServantskillCfg.getSpecialSkillItemCfg(arr[i]);
        // 	this.skillData.push({
        // 		skillid: arr[i],
        //         icon: Config.ServantskillCfg.getSkillIconKeyById(arr[i]),
        //         skillname: Config.ServantskillCfg.getSkillNameById(arr[i]),
        // 		des: _skill.getDescStr()
        // 	});
        // }
        // this.skillData.push({
        //     skillid: "9999",
        //     icon: "servant_skill_icon1",
        //     skillname: "种蘑菇",
        //     des: "蘑菇蘑菇蘑菇～"
        // });
        this.initSkillData();
        this.initIcons();
    };
    ServantSkillBar.prototype.initSkillData = function () {
        this.skillData = [];
        // 特殊技能
        var arrSpec = Config.ServantskillCfg.getSpecialSkill(this.servantId);
        for (var i = 0; i < arrSpec.length; i++) {
            var _skill = Config.ServantskillCfg.getSpecialSkillItemCfg(arrSpec[i]);
            this.skillData.push({
                skillid: arrSpec[i],
                icon: Config.ServantskillCfg.getSkillIconKeyById(arrSpec[i]),
                skillname: Config.ServantskillCfg.getSkillNameById(arrSpec[i]),
                des: _skill.getDescStr(),
                type: ServantSkillBarTypes.Special
            });
        }
        // 经营技能
        var levySkill = Config.SkilllevyCfg.getSkillLevyByServantId(this.servantId);
        if (levySkill) {
            this.skillData.push({
                skillid: levySkill.skillId,
                icon: levySkill.skillIconKey,
                skillname: levySkill.skillName,
                des: levySkill.skillDes,
                type: ServantSkillBarTypes.Levy
            });
        }
    };
    ServantSkillBar.prototype.initIcons = function () {
        this._iconList = [];
        for (var i = 0; i < this.skillData.length; i++) {
            var _icon = ComponentManager.getSkillIcon(this.skillData[i], this.showDetail);
            _icon.Size = this.iconSize;
            this.addChild(_icon);
            this._iconList.push(_icon);
            // _icon.addTouchTap(this.onIconTap, this, [_icon]);
            _icon.setPosition((this.iconSize + this.iconSpace) * i, 0);
        }
    };
    Object.defineProperty(ServantSkillBar.prototype, "labelWidth", {
        // private onIconTap(e: egret.Event, icon: ServantSkillIcon) {
        //     if (!this.showDetail) return;
        //     if (e.type != egret.TouchEvent.TOUCH_TAP) return;
        //     const _tapId: string = icon.skillId
        //     for (let i=0;i<this.skillData.length;i++) {
        //         if (this.skillData[i].skillid == _tapId) {
        //             this.onShowSkill = this.skillData[i];
        //             break;
        //         }
        //     }
        //     let _layer = this.getLayer();
        //     let _pos = icon.localToGlobal();
        //     ComponentManager.getSkillDetail().showSkill(this.onShowSkill, _layer, _pos, this.iconSize);
        // }
        /**
         * 设置一个宽度，使得图标在宽度内均匀分布
         * （需设置一个大于默认宽度的值）
         */
        set: function (w) {
            var _this = this;
            var l = this._iconList.length;
            var iw = (this.iconSize + this.iconSpace) * l - this.iconSpace;
            if (w <= iw) {
                return;
            }
            this.width = w;
            var _space = (w - this.iconSize * l) / (l + 1);
            this._iconList.forEach(function (v, i) {
                v.x = _space + (_this.iconSize + _space) * i;
            });
        },
        enumerable: true,
        configurable: true
    });
    ServantSkillBar.prototype.dispose = function () {
        this._iconList = null;
        _super.prototype.dispose.call(this);
    };
    return ServantSkillBar;
}(BaseDisplayObjectContainer));
__reflect(ServantSkillBar.prototype, "ServantSkillBar");
var ServantSkillBarTypes;
(function (ServantSkillBarTypes) {
    /**特殊技能 */
    ServantSkillBarTypes[ServantSkillBarTypes["Special"] = 0] = "Special";
    /**经营技能 */
    ServantSkillBarTypes[ServantSkillBarTypes["Levy"] = 1] = "Levy";
    /**被动技能 */
    ServantSkillBarTypes[ServantSkillBarTypes["Passive"] = 2] = "Passive";
})(ServantSkillBarTypes || (ServantSkillBarTypes = {}));
