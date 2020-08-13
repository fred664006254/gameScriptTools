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
 * 门客详情 资质信息部分
 * author jiangliuyang
 *
 * @class ServantWifeSkillItem
 */
var ServantWifeSkillItem = (function (_super) {
    __extends(ServantWifeSkillItem, _super);
    function ServantWifeSkillItem() {
        var _this = _super.call(this) || this;
        // private _servantId:string = null;
        _this._wifeId = null;
        _this._bookNameTxtList = [];
        _this._servantInfoObj = null;
        _this._isPractice = false;
        _this._mainTaskHandKey = null;
        return _this;
    }
    ServantWifeSkillItem.prototype.init = function (servantId, bottomH, isPractice) {
        if (isPractice === void 0) { isPractice = false; }
        this._wifeId = servantId;
        //下部信息
        var ability = [];
        var wifeCfg = Config.WifeCfg.getWifeCfgById(this._wifeId); //GameConfig.config.wifeCfg[this._wifeId];
        var list = wifeCfg.wifeSkill;
        var newList = [];
        if (PlatformManager.checkIsWxCfg()) {
            newList = list;
        }
        else {
            for (var i = 0; i < list.length; i++) {
                if (list[i].condition) {
                    newList.push(list[i]);
                }
            }
        }
        // ability = servantCfg.ability;
        // let lineNum = Math.ceil(ability.length/2);
        var posX = 22;
        var posY = 0;
        var totalStar = 0;
        var totalBookV = 0;
        //需支持滑动，属性数量并不固定
        var proNode = new BaseDisplayObjectContainer();
        this.addChild(proNode);
        proNode.y = 0;
        // 找第一个未满级的书
        var firstFlag = false;
        var firstPosX = 0;
        var firstPosY = 0;
        var firstIndex2 = -1;
        var firstAttrBg = null;
        for (var index = 0; index < newList.length; index++) {
            var data = newList[index];
            // if (index2%2 == 1)
            // {
            // 	posX = GameConfig.stageWidth/2+2;
            // }else
            // {
            // 	posX = 21;
            // }
            // let probg = "public_listbg";
            // let probg = "public_9v_bg04";
            var probg = "servant_wifebookbg";
            var attrbg = BaseBitmap.create(probg);
            attrbg.width = 596;
            // attrbg.height = 127;
            attrbg.height = 130;
            attrbg.x = posX;
            attrbg.y = posY;
            proNode.addChild(attrbg);
            var nameBg = BaseBitmap.create("public_biaoti2");
            nameBg.width = 150;
            nameBg.x = 40;
            nameBg.y = posY + 12;
            proNode.addChild(nameBg);
            // let leftBg = BaseBitmap.create("public_left");
            // leftBg.width = 119;
            // leftBg.height = 108;
            // leftBg.x =  attrbg.x+5;
            // leftBg.y =  attrbg.y +6;
            // proNode.addChild(leftBg);
            var skillIndex = index + 1;
            var skillNameStr = skillIndex + "." + LanguageManager.getlocal("wifeSkill_" + this._wifeId + "_" + skillIndex);
            var wifeCfg_1 = Config.WifeCfg.getWifeCfgById(this._wifeId);
            if (Api.switchVoApi.checkIsInBlueWife() && wifeCfg_1.isBule()) {
                skillNameStr = skillNameStr + "_male";
            }
            var nameSize = TextFieldConst.FONTSIZE_CONTENT_SMALL;
            if (PlatformManager.checkIsViSp()) {
                nameSize = TextFieldConst.FONTSIZE_ACTIVITY_COMMON;
            }
            var skillNameTF = ComponentManager.getTextField(skillNameStr, nameSize, TextFieldConst.COLOR_BROWN);
            skillNameTF.setPosition(nameBg.x + 25, nameBg.y + nameBg.height / 2 - skillNameTF.height / 2);
            proNode.addChild(skillNameTF);
            var skillLevelStr = "(Lv." + 1 + ")";
            var skillLevelTF = ComponentManager.getTextField(skillLevelStr, nameSize, TextFieldConst.COLOR_BROWN);
            skillLevelTF.setPosition(skillNameTF.x + skillNameTF.width + 20, skillNameTF.y);
            proNode.addChild(skillLevelTF);
            nameBg.width = skillNameTF.width + skillLevelTF.width + 70;
            var cfg = Config.WifeCfg.getWifeCfgById(this._wifeId);
            var serCfg = Config.ServantCfg.getServantItemById(cfg.servantId);
            //是否解锁
            var str1 = "";
            var str2 = "";
            var str3 = "";
            var attStr = "";
            if (data.att.length == 4) {
                // attStr = serCfg.name + LanguageManager.getlocal("wifeSkillAllAttAdd");
                if (PlatformManager.checkIsViSp()) {
                    attStr = LanguageManager.getlocal("wifeSkillAllAttAdd");
                }
                else {
                    attStr = serCfg.name + LanguageManager.getlocal("wifeSkillAllAttAdd");
                }
            }
            else {
                for (var index1 = 0; index1 < data.att.length; index1++) {
                    var element = data.att[index1];
                    if (index1 == 0) {
                        // if(data.att.length == 1){
                        attStr = LanguageManager.getlocal("servantInfo_speciality" + element);
                        // }else{
                        // 	attStr = LanguageManager.getlocal("servantInfo_speciality" + element) + "、";
                        // }
                    }
                    else {
                        attStr = attStr + "、" + LanguageManager.getlocal("servantInfo_speciality" + element);
                    }
                }
                // attStr = serCfg.name + attStr + LanguageManager.getlocal("wifeSkillAttAdd");
                if (PlatformManager.checkIsViSp()) {
                    attStr = attStr + LanguageManager.getlocal("wifeSkillAttAdd");
                }
                else {
                    attStr = serCfg.name + attStr + LanguageManager.getlocal("wifeSkillAttAdd");
                }
            }
            //是否解锁
            var textColor = TextFieldConst.COLOR_BLACK;
            var textColor2 = TextFieldConst.COLOR_WARN_GREEN;
            var add1 = "";
            var addNum1 = "";
            if (data.growAtt < 1) {
                addNum1 = (data.growAtt * 100 * 1) + "%";
            }
            else {
                addNum1 = (data.growAtt * 1).toString();
            }
            textColor2 = TextFieldConst.COLOR_BLACK;
            str1 = LanguageManager.getlocal("wifeSkillLock") + attStr + addNum1;
            str2 = "1";
            str3 = LanguageManager.getlocal("wifeSkillUnLockNeed") + data.condition;
            var newAttStr = addNum1;
            var att1TF = ComponentManager.getTextField(str1, 18, textColor);
            att1TF.x = 40;
            att1TF.y = nameBg.y + nameBg.height + 5;
            proNode.addChild(att1TF);
            var att2TF = ComponentManager.getTextField(str2, 18, textColor);
            att2TF.x = att1TF.x;
            att2TF.y = att1TF.y + att1TF.height + 5;
            proNode.addChild(att2TF);
            var att3TF = ComponentManager.getTextField(str3, 18, textColor2);
            att3TF.x = att1TF.x;
            att3TF.y = att2TF.y + att2TF.height + 5;
            proNode.addChild(att3TF);
            att2TF.visible = false;
            if (!data.condition) {
                att3TF.visible = false;
                att2TF.visible = false;
                str1 = LanguageManager.getlocal("wifeSkillCur") + attStr + newAttStr;
                att1TF.text = str1;
                att1TF.textColor = TextFieldConst.COLOR_BROWN;
            }
            ////////////////////////
            posY += 135;
        }
        var rect = new egret.Rectangle(0, 0, GameConfig.stageWidth, bottomH);
        var scrolView = ComponentManager.getScrollView(proNode, rect);
        scrolView.y = 0;
        this.addChild(scrolView);
    };
    ServantWifeSkillItem.prototype.dispose = function () {
        this._bookNameTxtList = [];
        this._servantInfoObj = null;
        this._isPractice = false;
        App.MainTaskHandUtil.releaseHandKey(this._mainTaskHandKey);
        this._mainTaskHandKey = null;
        _super.prototype.dispose.call(this);
    };
    return ServantWifeSkillItem;
}(BaseDisplayObjectContainer));
__reflect(ServantWifeSkillItem.prototype, "ServantWifeSkillItem");
