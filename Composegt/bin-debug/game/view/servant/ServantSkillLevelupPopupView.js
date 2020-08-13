/**
 * 门客技能升级
 * author yanyuling
 * date 2017/11/18
 * @class ServantBookLevelupPopupView
 */
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
var ServantSkillLevelupPopupView = (function (_super) {
    __extends(ServantSkillLevelupPopupView, _super);
    function ServantSkillLevelupPopupView() {
        var _this = _super.call(this) || this;
        _this._curTxt = null;
        _this._nextTxt = null;
        _this._skillExp = null;
        _this._bg = null;
        _this._btn = null;
        _this._curLvTxt = null;
        return _this;
    }
    ServantSkillLevelupPopupView.prototype.initView = function () {
        var view = this;
        App.MessageHelper.addNetMessage(NetRequestConst.REQUEST_SERVANT_UPSKILL, view.fresh, view);
        // public_tcdw_bg01
        var skillId = this.param.data.skillid;
        var servantId = this.param.data.servantId;
        var skilllv = Api.servantVoApi.getServantSkillLv(servantId, skillId);
        var isSpecial = Number(skillId) > 1;
        var group = new BaseDisplayObjectContainer();
        this.addChildToContainer(group);
        var bg = BaseBitmap.create("public_9v_bg12");
        bg.width = 526;
        bg.height = 355;
        bg.x = this.viewBg.x + this.viewBg.width / 2 - bg.width / 2;
        bg.y = 9;
        group.addChild(bg);
        this._bg = bg;
        var res = "servant_skill_icon" + skillId;
        if (!RES.hasRes(res)) {
            res = 'servant_skill_icon1';
        }
        var skillIcon = BaseLoadBitmap.create(res);
        skillIcon.width = 108;
        skillIcon.height = 109;
        group.addChild(skillIcon);
        App.DisplayUtil.setLayoutPosition(LayoutConst.lefttop, skillIcon, bg, [145, 16]);
        var skillName = ComponentManager.getTextField("", 24, 0x410D00);
        var cn = "servant_skillname" + skillId;
        if (!LanguageManager.checkHasKey(cn)) {
            cn = "servant_skillname1";
        }
        skillName.text = LanguageManager.getlocal(cn);
        group.addChild(skillName);
        App.DisplayUtil.setLayoutPosition(LayoutConst.lefttop, skillName, skillIcon, [skillIcon.width + 20, 27]);
        var LvTxt = ComponentManager.getTextField(LanguageManager.getlocal("discussServantLevel", ["" + skilllv]), 20, 0x410D00);
        group.addChild(LvTxt);
        App.DisplayUtil.setLayoutPosition(LayoutConst.lefttop, LvTxt, skillName, [0, skillName.textHeight + 17]);
        view._curLvTxt = LvTxt;
        var line1 = BaseBitmap.create("public_line4");
        line1.width = 460;
        group.addChild(line1);
        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, line1, bg, [0, 125]);
        var proNumBg = BaseBitmap.create("public_ts_bg01");
        proNumBg.width = 280;
        group.addChild(proNumBg);
        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, proNumBg, line1, [0, line1.height + 14]);
        var curTxt = ComponentManager.getTextField(LanguageManager.getlocal("wifeSkillCur"), 22, 0x410D00);
        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterverticalCenter, curTxt, proNumBg);
        group.addChild(curTxt);
        var cfg = Config.ServantskillCfg.getSpecialSkillItemCfg(skillId);
        var curValueTxt = ComponentManager.getTextField(isSpecial ? cfg.getDescStr() : LanguageManager.getlocal("servantSkillDesc_" + skillId, []), 22, 0x410D00);
        curValueTxt.width = 500;
        curValueTxt.lineSpacing = 10;
        curValueTxt.textAlign = egret.HorizontalAlign.CENTER;
        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, curValueTxt, proNumBg, [0, proNumBg.height + 20]);
        group.addChild(curValueTxt);
        this._curTxt = curValueTxt;
        if (!isSpecial) {
            var proNumBg2 = BaseBitmap.create("public_ts_bg01");
            proNumBg2.width = 280;
            group.addChild(proNumBg2);
            App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, proNumBg2, curValueTxt, [0, curValueTxt.height + 37]);
            var nextTxt = ComponentManager.getTextField(LanguageManager.getlocal("skinnextLv") + "\uFF1A", 22, 0x410D00);
            App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterverticalCenter, nextTxt, proNumBg2);
            group.addChild(nextTxt);
            var nextValueTxt = ComponentManager.getTextField("技能效果", 22, 0x410D00);
            nextValueTxt.lineSpacing = 10;
            nextValueTxt.textAlign = egret.HorizontalAlign.CENTER;
            App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, nextValueTxt, proNumBg2, [0, proNumBg2.height + 20]);
            group.addChild(nextValueTxt);
            this._nextTxt = nextValueTxt;
            nextValueTxt.width = 520;
            var skillExpTxt = ComponentManager.getTextField(LanguageManager.getlocal("", ['']), 22);
            App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, skillExpTxt, bg, [0, bg.height + 11]);
            group.addChild(skillExpTxt);
            this._skillExp = skillExpTxt;
            var baseCfg = GameConfig.config.servantbaseCfg;
            var skillUpgradeExp_1 = baseCfg.skillUpgradeExp;
            var btn = ComponentManager.getButton(ButtonConst.BTN_BIG_YELLOW, "", function () {
                if (Number(skillId) < 2) {
                    var costexp = skillUpgradeExp_1[skilllv - 1];
                    var servantObj = Api.servantVoApi.getServantObj(servantId);
                    var exp = servantObj.skillExp;
                    if (exp < costexp) {
                        App.CommonUtil.showTip(LanguageManager.getlocal("servant_skilllevelupTip1"));
                        return;
                    }
                    NetManager.request(NetRequestConst.REQUEST_SERVANT_UPSKILL, { servantId: servantId, pos: skillId });
                }
            }, this);
            btn.setText(LanguageManager.getlocal("servant_skilllevelup", [""]), false);
            App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, btn, skillExpTxt, [0, skillExpTxt.height + 14]);
            group.addChild(btn);
            this._btn = btn;
        }
        // this._skillExpTxt = ComponentManager.getTextField("",TextFieldConst.FONTSIZE_TITLE_COMMON);  
        // this.addChild(this._skillExpTxt); 
        // // this.setLayoutPosition(LayoutConst.verticalCenter,this._skillExpTxt,public_biaoti);
        // this._skillExpTxt.x = GameConfig.stageWidth/2 - this._skillExpTxt.width/2;
        // this._skillExpTxt.y = baseY - this._skillExpTxt.height/2;
        // 	let curValueTxt =  ComponentManager.getTextField("",TextFieldConst.FONTSIZE_CONTENT_SMALL);
        // 	curValueTxt.text = LanguageManager.getlocal("servant_skilllevelupTxt1",["100"]);
        // 	curValueTxt.x = skillIcon.x + skillIcon.width + 30;
        // 	curValueTxt.y = skillName.y + 32;
        // 	curValueTxt.textColor =TextFieldConst.COLOR_BROWN;
        // 	this._nodeContainer.addChild(curValueTxt);
        // 	this._txtList.push(curValueTxt);
        // 	let nextValueTxt =  ComponentManager.getTextField("",TextFieldConst.FONTSIZE_CONTENT_SMALL);
        // 	nextValueTxt.text = LanguageManager.getlocal("servant_skilllevlupTxt2",["100"]);
        // 	nextValueTxt.x = curValueTxt.x;
        // 	nextValueTxt.y = curValueTxt.y + 25;
        // 	nextValueTxt.textColor =TextFieldConst.COLOR_BROWN;
        // 	this._nodeContainer.addChild(nextValueTxt);
        // 	this._txtList.push(nextValueTxt);
        this.fresh();
    };
    ServantSkillLevelupPopupView.prototype.fresh = function () {
        var view = this;
        var skillId = this.param.data.skillid;
        var servantId = this.param.data.servantId;
        var baseCfg = GameConfig.config.servantbaseCfg;
        var skillUpgradeExp = baseCfg.skillUpgradeExp;
        var maxLv = baseCfg.skillLvLimit;
        var skilllv = Api.servantVoApi.getServantSkillLv(servantId, skillId);
        var skillValue1 = GameConfig.config.servantbaseCfg.skillValue1 * 100;
        var skillValue2 = GameConfig.config.servantbaseCfg.skillValue2 * 100;
        var servantObj = Api.servantVoApi.getServantObj(servantId);
        //基础技能
        if (Number(skillId) < 2) {
            if (skilllv == maxLv) {
                //最大等级
                App.DisplayUtil.changeToGray(view._btn);
                //this._lv1TipStr = LanguageManager.getlocal("servant_skilllevelupTip2");
                this._nextTxt.text = LanguageManager.getlocal("servant_skilllevelupTxt2", [LanguageManager.getlocal("servant_skilllLvTop"), ""]);
            }
            else {
                var value_1 = Number(skillId) == 0 ? ((skillValue1 * (skilllv + 1)).toFixed(2)) : ((skillValue2 * (skilllv + 1) + 100).toFixed(0));
                this._nextTxt.text = LanguageManager.getlocal("servantSkillDesc_" + skillId, [value_1]);
            }
            var value = Number(skillId) == 0 ? ((skillValue1 * skilllv).toFixed(2)) : ((skillValue2 * skilllv + 100).toFixed(0));
            this._curTxt.text = LanguageManager.getlocal("servantSkillDesc_" + skillId, [value]);
            App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenter, this._curTxt, this._bg);
            App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenter, this._nextTxt, this._bg);
            var costexp = skillUpgradeExp[skilllv - 1];
            view._skillExp.text = LanguageManager.getlocal("servant_skillexp", [servantObj.skillExp + '']);
            view._skillExp.textColor = servantObj.skillExp >= costexp ? 0x35916F : TextFieldConst.COLOR_WARN_RED;
            App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, view._skillExp, view._bg, [0, view._bg.height + 11]);
            view._btn.setText(LanguageManager.getlocal("servant_skilllevelup", ["" + costexp]), false);
            App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, view._btn, view._skillExp, [0, view._skillExp.height + 14]);
            view._curLvTxt.text = LanguageManager.getlocal("discussServantLevel", ["" + skilllv]);
        }
    };
    ServantSkillLevelupPopupView.prototype.dispose = function () {
        var view = this;
        view._curTxt = null;
        view._nextTxt = null;
        view._skillExp = null;
        view._bg = null;
        view._btn = null;
        view._curLvTxt = null;
        App.MessageHelper.removeNetMessage(NetRequestConst.REQUEST_SERVANT_UPSKILL, view.fresh, view);
        _super.prototype.dispose.call(this);
    };
    return ServantSkillLevelupPopupView;
}(PopupView));
__reflect(ServantSkillLevelupPopupView.prototype, "ServantSkillLevelupPopupView");
