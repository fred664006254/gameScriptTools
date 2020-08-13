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
var AcCrossServantPowerScrollItem = (function (_super) {
    __extends(AcCrossServantPowerScrollItem, _super);
    function AcCrossServantPowerScrollItem() {
        return _super.call(this) || this;
    }
    AcCrossServantPowerScrollItem.prototype.initItem = function (index, data) {
        var rankcfg = Config.AcCfg.getCfgByActivityIdAndCode(data.aid, data.code);
        // Config.AcCfg.getCfgByActivityIdAndCode(data.aid,""+data.code);
        var rList = rankcfg.rankList1;
        this.width = 615;
        var key = data.key;
        var rItem = rList[key];
        // let id = rItem.id;
        var scroStartY = 10;
        var len = 1;
        //第几名
        var txt = ComponentManager.getTextField("", TextFieldConst.FONTSIZE_TITLE_COMMON, TextFieldConst.COLOR_BROWN);
        if (Number(key) < 4) {
            txt.text = LanguageManager.getlocal("acRank_rank" + key);
        }
        else {
            txt.text = LanguageManager.getlocal("acRank_rank4", [String(rItem.rank[0]), String(rItem.rank[1])]);
        }
        txt.width = 230;
        txt.x = this.width / 2 - txt.width / 2;
        txt.textAlign = "center";
        txt.y = scroStartY + 20 - txt.height / 2;
        var line1 = BaseBitmap.create("public_ts_bg01");
        line1.width = 260;
        line1.x = this.width / 2 - line1.width / 2;
        ;
        line1.y = txt.y - 3;
        var addH = 0;
        var rIcons = GameData.getRewardItemIcons(rItem.reward, true);
        for (var outIdx = 0; outIdx < len; outIdx++) {
            var innerbg = BaseBitmap.create("rechargevie_db_01");
            innerbg.width = 615;
            innerbg.height = 125;
            innerbg.x = 12;
            innerbg.y = scroStartY - 10;
            this.addChild(innerbg);
            addH = 0;
            if (Number(key) == 1 && outIdx == 0) {
                addH = 10;
                scroStartY += 10;
            }
            scroStartY += 40;
            if (len == 2) {
                var memberGetTxt = ComponentManager.getTextField("", 24, TextFieldConst.COLOR_BROWN);
                memberGetTxt.y = innerbg.y + 18;
                if (outIdx == 1) {
                    memberGetTxt.text = LanguageManager.getlocal("acRank_alliance_memberget");
                    memberGetTxt.x = innerbg.x + innerbg.width / 2 - memberGetTxt.width / 2 + 62;
                    this.addChild(memberGetTxt);
                }
                else if (outIdx == 0 && Number(key) > 1) {
                    memberGetTxt.text = LanguageManager.getlocal("acRank_alliance_masterget1");
                    memberGetTxt.x = innerbg.x + innerbg.width / 2 - memberGetTxt.width / 2 + 62;
                    this.addChild(memberGetTxt);
                }
            }
            var tmpX = 33;
            for (var idx = 0; idx < rIcons.length; idx++) {
                var element = rIcons[idx];
                element.x = tmpX;
                element.y = scroStartY + 15; //-20;
                tmpX += (element.width + 8);
                //换行处理
                if (tmpX >= GameConfig.stageWidth) {
                    tmpX = 33;
                    scroStartY += element.height + 15;
                    element.x = tmpX;
                    element.y = scroStartY + 15;
                    addH += element.height + 15;
                    tmpX += (element.width + 8);
                }
                this.addChild(element);
            }
            //普通排行榜基数
            scroStartY += 165;
            addH += 35;
            innerbg.height += addH + 5;
        }
        this.addChild(line1);
        this.addChild(txt);
        //称号
        // if (Number(key) == 1 && (rankcfg.type != 11))
        // {
        //     let officerTxt = ComponentManager.getTextField("",24,TextFieldConst.COLOR_BROWN);
        //     officerTxt.text = LanguageManager.getlocal("acRank_getofficer");
        //     if(len == 2)
        //     {
        //         officerTxt.text = LanguageManager.getlocal("acRank_alliance_masterget2");
        //     }
        //     officerTxt.x = txt.x + txt.width/2 -officerTxt.width+330;
        //     officerTxt.y = txt.y+3;
        //     this.addChild(officerTxt);
        //     let titleImg = BaseLoadBitmap.create("user_title_"+rankcfg.title +"_3");
        //     let deltaV = 0.8;
        //     titleImg.width = 155 * deltaV;
        //     titleImg.height = 59 * deltaV;
        //     titleImg.scaleY =titleImg.scaleX =0.8;
        //     titleImg.x = officerTxt.x + officerTxt.width;
        //     titleImg.y = officerTxt.y + officerTxt.height/2 - 22;
        //     this.addChild(titleImg);
        // } 
        // this.height = innerbg.y + innerbg.height + 10;
    };
    AcCrossServantPowerScrollItem.prototype.getSpaceX = function () {
        return 0;
    };
    /**
     * 不同格子Y间距
     */
    AcCrossServantPowerScrollItem.prototype.getSpaceY = function () {
        return 5;
    };
    AcCrossServantPowerScrollItem.prototype.dispose = function () {
        _super.prototype.dispose.call(this);
    };
    return AcCrossServantPowerScrollItem;
}(ScrollListItem));
__reflect(AcCrossServantPowerScrollItem.prototype, "AcCrossServantPowerScrollItem");
