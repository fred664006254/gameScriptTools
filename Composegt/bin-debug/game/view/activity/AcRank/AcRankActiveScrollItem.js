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
 * 冲榜列表节点
 * author yanyuling
 * date 2017/11/06
 * @class AcRankActiveScrollItem
 */
var AcRankActiveScrollItem = (function (_super) {
    __extends(AcRankActiveScrollItem, _super);
    function AcRankActiveScrollItem() {
        return _super.call(this) || this;
    }
    AcRankActiveScrollItem.prototype.initItem = function (index, data) {
        var rankcfg = Config.AcCfg.getCfgByActivityIdAndCode(data.aid, "" + data.code);
        var rList = rankcfg.getRankList();
        var key = data.key;
        var rItem = rList[key];
        var id = rItem.id;
        var scroStartY = 0;
        this.width = 608;
        var len = 1;
        var title = null;
        // let titleImg = null;
        if (rItem.reward1 && rItem.reward1 != "") {
            len = 2;
        }
        var bgRes = "";
        if (Number(key) == 1) {
            bgRes = "activity_rank_itembg1";
        }
        else {
            bgRes = "activity_rank_itembg2";
        }
        //第几名
        var txt = ComponentManager.getTextField("", 22, TextFieldConst.COLOR_BROWN_NEW);
        if (Number(key) < 4) {
            txt.text = LanguageManager.getlocal("acRank_rank" + key);
        }
        else {
            txt.text = LanguageManager.getlocal("acRank_rank4", [String(rItem.minRank), String(rItem.maxRank)]);
        }
        for (var outIdx = 0; outIdx < len; outIdx++) {
            if (outIdx == 0) {
                title = rItem.getRewardTitle();
            }
            else {
                title = rItem.getReward1Title();
            }
            var innerbg = BaseBitmap.create(bgRes);
            innerbg.x = 0;
            innerbg.y = scroStartY;
            this.addChild(innerbg);
            //排名
            if (outIdx == 0) {
                txt.x = this.width / 2 - txt.width / 2;
                txt.y = innerbg.y + 27 - txt.height / 2;
                this.addChild(txt);
            }
            var rIcons = rItem.rewardIcons;
            if (outIdx == 1) {
                rIcons = rItem.reward1Icons;
            }
            var startY = 75;
            if (title != null || len == 2) {
                startY = 115;
                var titleTxt = ComponentManager.getTextField("", 22, TextFieldConst.COLOR_BROWN_NEW);
                var titleImg = null;
                if (outIdx == 0) {
                    if (len == 2) {
                        titleTxt.text = LanguageManager.getlocal("acRank_alliance_masterget1");
                    }
                    else {
                        titleTxt.text = LanguageManager.getlocal("acRank_alliance_getoffer");
                    }
                }
                else {
                    titleTxt.text = LanguageManager.getlocal("acRank_alliance_memberget");
                }
                if (title) {
                    if (outIdx == 0) {
                        if (len == 2) {
                            titleTxt.text = LanguageManager.getlocal("acRank_alliance_masterget2");
                        }
                        else {
                            titleTxt.text = LanguageManager.getlocal("acRank_alliance_getoffer");
                        }
                    }
                    else {
                        titleTxt.text = LanguageManager.getlocal("acRank_alliance_memberget2");
                    }
                    titleImg = BaseLoadBitmap.create("user_title_" + title + "_3");
                    titleImg.width = 186;
                    titleImg.height = 42;
                    titleTxt.x = this.width / 2 - (titleTxt.width + titleImg.width) / 2;
                    titleTxt.y = innerbg.y + 80 - titleTxt.height / 2;
                    titleImg.x = titleTxt.x + titleTxt.width;
                    titleImg.y = innerbg.y + 80 - titleImg.height / 2;
                    this.addChild(titleImg);
                }
                else {
                    titleTxt.x = this.width / 2 - titleTxt.width / 2;
                    titleTxt.y = innerbg.y + 80 - titleTxt.height / 2;
                }
                this.addChild(titleTxt);
            }
            var spaceWidth = 10;
            var spaceHeight = 10;
            var itemW = 106;
            var itemH = 106;
            var num = 5;
            var startX = this.width / 2 - (itemW * num + spaceWidth * (num - 1)) / 2;
            for (var idx = 0; idx < rIcons.length; idx++) {
                var element = rIcons[idx];
                element.x = startX + (idx % num) * (itemW + spaceWidth);
                element.y = innerbg.y + startY + Math.floor(idx / num) * (itemH + spaceHeight);
                this.addChild(element);
            }
            innerbg.height = startY + Math.ceil(rIcons.length / num) * (itemH + spaceHeight) + 5;
            scroStartY += innerbg.height + 5;
        }
        var rLen = rankcfg.getRankLength();
        if (rLen - 1 == index) {
            this.height = scroStartY + 55;
        }
        else {
            this.height = scroStartY;
        }
        // txt.width =230;
        // txt.x = this.width/2 - txt.width/2;
        // txt.textAlign ="center";
        // txt.y = scroStartY + 20 - txt.height/2;  
        // // let line1 = BaseBitmap.create("public_ts_bg01");
        // // line1.width = 260
        // // line1.x = 30;
        // // line1.y = txt.y-3;
        // let addH = 0; 
        // let rIcons = rItem.rewardIcons;
        // let title = null;
        // for (let outIdx = 0; outIdx < len; outIdx++) {
        //     if(outIdx == 1)
        //     {
        //             rIcons = rItem.reward1Icons;
        //             title = rItem.getReward1Title();
        //     } else {
        //         title = rItem.getRewardTitle();
        //     }
        //     let innerbg = BaseBitmap.create(bgRes);
        //     innerbg.width = 608;
        //     innerbg.height = 125;
        //     // innerbg.x = 12;
        //     innerbg.y = scroStartY-10;
        //     this.addChild(innerbg); 
        //     addH = 0;
        //     if (Number(key) == 1 && outIdx == 0)
        //     {
        //         addH =10; 
        //         scroStartY +=10;  
        //     }
        //     // scroStartY += 40;
        //     if( len == 2 )
        //     {
        //         let memberGetTxt = ComponentManager.getTextField("",24,TextFieldConst.COLOR_BROWN);
        //         memberGetTxt.y = innerbg.y + 14;
        //         if(outIdx == 1)
        //         {
        //             memberGetTxt.text = LanguageManager.getlocal("acRank_alliance_memberget");
        //             memberGetTxt.x = innerbg.x + innerbg.width/2 -memberGetTxt.width/2+62;
        //             this.addChild(memberGetTxt); 
        //         }else if(outIdx == 0 && Number(key) >1)
        //         {
        //             memberGetTxt.text = LanguageManager.getlocal("acRank_alliance_masterget1");
        //             memberGetTxt.x = innerbg.x + innerbg.width/2 -memberGetTxt.width/2+62;
        //             this.addChild(memberGetTxt);
        //         }
        //     }
        //     let tmpX = 33;
        //     if(title){
        //     }
        //     for (var idx = 0; idx < rIcons.length; idx++) {
        //         var element = rIcons[idx];
        //         element.x = tmpX;
        //         element.y = scroStartY+15;//-20;
        //         tmpX +=  (element.width+8);
        //         //换行处理
        //         if (tmpX >= GameConfig.stageWidth)
        //         {
        //             tmpX = 33;
        //             scroStartY += element.height + 15;
        //             element.x = tmpX;
        //             element.y = scroStartY+15;
        //             addH += element.height + 15;
        //             tmpX += (element.width+8);
        //         }
        //         this.addChild(element);
        //     }
        //     // if(len == 2)
        //     // {   
        //     //     //获得称号
        //     //     if(outIdx == 0)
        //     //     {
        //     //         scroStartY += 190;
        //     //     }else
        //     //     {
        //     //         scroStartY += 190;
        //     //     }
        //     //     if(Number(key) == 1 && outIdx == 0)
        //     //     {
        //     //         addH += 50;//帮主间距
        //     //         scroStartY -=10;
        //     //     }else{
        //     //         addH += 60;//帮众间距
        //     //     }
        //     // }else
        //     // {   
        //     //     //普通排行榜基数
        //     //     scroStartY += 165;
        //     //     addH += 35;
        //     // }
        //     // innerbg.height += addH+5;
        // }
        // // this.addChild(line1);
        // this.addChild(txt);
        // //称号
        // if (Number(key) == 1 && (rankcfg.type != 11))
        // {
        //     let officerTxt = ComponentManager.getTextField("",24,TextFieldConst.COLOR_BROWN);
        //     officerTxt.text = LanguageManager.getlocal("acRank_getofficer");
        //     if(len == 2)
        //     {
        //         officerTxt.text = LanguageManager.getlocal("acRank_alliance_masterget2");
        //     }
        //     officerTxt.x = txt.x + txt.width/2 -officerTxt.width+330;
        //     officerTxt.y = txt.y ;
        //     this.addChild(officerTxt);
        //     let titleImg = BaseLoadBitmap.create("user_title_"+rankcfg.title +"_3");
        //     let deltaV = 0.8;
        //     titleImg.width = 186 * deltaV;
        //     titleImg.height = 42 * deltaV;
        //     titleImg.scaleY =titleImg.scaleX =0.8;
        //     titleImg.x = officerTxt.x + officerTxt.width;
        //     titleImg.y = officerTxt.y + officerTxt.height/2 - 17;
        //     this.addChild(titleImg);
        // } 
        // this.height = innerbg.y + innerbg.height + 10;
    };
    AcRankActiveScrollItem.prototype.getSpaceX = function () {
        return 0;
    };
    /**
     * 不同格子Y间距
     */
    AcRankActiveScrollItem.prototype.getSpaceY = function () {
        return 5;
    };
    AcRankActiveScrollItem.prototype.dispose = function () {
        _super.prototype.dispose.call(this);
    };
    return AcRankActiveScrollItem;
}(ScrollListItem));
__reflect(AcRankActiveScrollItem.prototype, "AcRankActiveScrollItem");
