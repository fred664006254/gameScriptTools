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
 * 门客列表节点
 * author yanyuling
 * date 2017/9/25
 * @class ServantScrollItem
 */
var ServantScrollItem = (function (_super) {
    __extends(ServantScrollItem, _super);
    // public constructor(index:number,data:any)
    function ServantScrollItem() {
        return _super.call(this) || this;
    }
    ServantScrollItem.prototype.initItem = function (index, data) {
        App.MessageHelper.addEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_SERVANT_UPAURA), this.refreshRedPoints, this);
        App.MessageHelper.addEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_UPGRADE_SERVANT), this.refreshInfoAfterUpdate, this);
        App.MessageHelper.addEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_UPGRADE_SERVANT_TEN), this.refreshInfoAfterUpdate, this);
        App.MessageHelper.addEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_SERVANT_CHANGE), this.refreshInfoAfterAdvance, this);
        App.MessageHelper.addEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_SERVANT_UPABILITY), this.refreshRedPoints, this);
        App.MessageHelper.addEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_SERVANT_UPSKILL), this.refreshRedPoints, this);
        App.MessageHelper.addEventListener(MessageConst.MESSAGE_REFRESH_SERVANT_ITEMLIST, this.refreshRedPoints, this);
        // App.MessageHelper.addEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_UPGRADE_SERVANT_EQUIP),this.skinkCallback,this);
        App.MessageHelper.addEventListener(MessageConst.MESSAGE_NOTICE_FROM_SERVANT_SKIN, this.backFromServantSkin, this);
        //门客配置id
        this._servantId = data;
        //门客相关信息
        var servantInfoObj = Api.servantVoApi.getServantObj(this._servantId);
        var tmpCfg = GameConfig.config.servantCfg[this._servantId];
        this._nodeContainer = new BaseDisplayObjectContainer();
        // this._nodeContainer.x = 11;
        this.addChild(this._nodeContainer);
        var cardbg = BaseLoadBitmap.create(servantInfoObj.qualityBg);
        cardbg.width = 194;
        cardbg.height = 287;
        cardbg.name = "cardbg";
        this._nodeContainer.addChild(cardbg);
        cardbg.touchEnabled = true;
        this._selectedBox = BaseBitmap.create("servant_bigcardbg_selected");
        this._selectedBox.x = cardbg.width / 2 - this._selectedBox.width / 2;
        this._selectedBox.y = cardbg.height / 2 - this._selectedBox.height / 2;
        this._selectedBox.visible = false;
        this._selectedBox.width = this._selectedBox.width; //-10;
        this._nodeContainer.addChild(this._selectedBox);
        this._cardbg = cardbg;
        this.addTouch(this.eventHandler, this, null, true);
        var servantImg = BaseLoadBitmap.create(servantInfoObj.fullImgPath);
        servantImg.scaleX = servantImg.scaleY = 0.64;
        servantImg.x = -100;
        servantImg.y = 22;
        this._servantImg = servantImg;
        this._nodeContainer.addChild(servantImg);
        //品质标识
        if (tmpCfg.quality) {
            var tag = BaseLoadBitmap.create("servant_qualitytag" + tmpCfg.quality);
            tag.width = 148;
            tag.height = 230;
            this._nodeContainer.addChild(tag);
            tag.setScale(0.65);
            App.DisplayUtil.setLayoutPosition(LayoutConst.righttop, tag, cardbg, [-30, -35]);
        }
        // let maskBg:BaseBitmap=BaseBitmap.create("public_9v_bg01");
        // maskBg.width=182;
        // maskBg.height=234;
        // maskBg.setPosition(6,5);
        // this._nodeContainer.addChild(maskBg);
        // this._maskBg = maskBg;
        // let widthN:number =182+190;
        // let heightN:number =234+101;
        // let mask = new egret.Rectangle(80, 5, widthN , heightN);   
        var widthN = 282 - 8;
        var heightN = 335 + 6;
        var mask = new egret.Rectangle(172, 0, widthN, heightN);
        servantImg.mask = mask;
        var nameBg = BaseBitmap.create("servant_middlebg");
        nameBg.x = 7;
        nameBg.y = 215;
        nameBg.width = 180;
        nameBg.height = 25;
        this._nodeContainer.addChild(nameBg);
        var nameTxt = ComponentManager.getTextField("", TextFieldConst.FONTSIZE_CONTENT_SMALL);
        nameTxt.textColor = ServantScrollItem.getQualityColor(servantInfoObj.clv);
        nameTxt.text = LanguageManager.getlocal("servant_name" + this._servantId);
        nameTxt.x = cardbg.x + cardbg.width / 2 - nameTxt.width / 2;
        nameTxt.y = 252;
        this._nodeContainer.addChild(nameTxt);
        this._nameTxt = nameTxt;
        // let lvBg = BaseBitmap.create("servant_xietiao");
        // lvBg.x = 5;
        // lvBg.y = 5;
        // lvBg.alpha =0.5;
        // this._nodeContainer.addChild(lvBg);
        this._lvTxt = ComponentManager.getTextField("", 18);
        this._lvTxt.text = String(servantInfoObj.level); //LanguageManager.getlocal("servant_lv",[String(servantInfoObj.level)]) ;
        this._lvTxt.x = 6;
        this._lvTxt.width = 40;
        this._lvTxt.textAlign = TextFieldConst.ALIGH_CENTER;
        this._lvTxt.y = 15; //lvBg.y + lvBg.height/2 -  this._lvTxt.height/2;
        this._nodeContainer.addChild(this._lvTxt);
        // let starBg = BaseBitmap.create("servant_starbg");
        // starBg.x = cardbg.x + cardbg.width/2- starBg.width/2+11;
        // starBg.y = nameBg.y - starBg.height-2;
        // this._nodeContainer.addChild(starBg);
        var starImg = BaseBitmap.create("servant_star");
        starImg.x = cardbg.x + cardbg.width / 2 - starImg.width / 2 - 15;
        starImg.y = nameBg.y + nameBg.height / 2 - starImg.height / 2; //215;
        this._nodeContainer.addChild(starImg);
        var starNum = Api.servantVoApi.getServantStarsNumWithId(this._servantId);
        if (PlatformManager.checkIsKRNewSp()) {
            starNum = servantInfoObj.getTotalBookValue();
        }
        var starNumTxt = ComponentManager.getTextField(starNum.toString(), TextFieldConst.FONTSIZE_CONTENT_SMALL);
        starNumTxt.x = starImg.x + starImg.width + 2;
        starNumTxt.y = starImg.y + starImg.height / 2 - starNumTxt.height / 2;
        this._nodeContainer.addChild(starNumTxt);
        if (PlatformManager.checkIsJPSp()) {
            nameTxt.y += 4;
            var nameTxt2 = ComponentManager.getTextField("", 16);
            nameTxt2.textColor = nameTxt.textColor;
            nameTxt2.text = LanguageManager.getlocal("servant_name" + this._servantId + "_jp");
            nameTxt2.x = cardbg.x + cardbg.width / 2 - nameTxt2.width / 2;
            nameTxt2.y = nameTxt.y - 18;
            this._nodeContainer.addChild(nameTxt2);
            this._nameTxt2 = nameTxt2;
            nameBg.y = 213;
            starImg.y = 213;
            starNumTxt.y = starImg.y + 5;
        }
        var redP = BaseBitmap.create("public_dot2");
        redP.x = cardbg.x + cardbg.width - redP.width;
        redP.y = cardbg.y;
        redP.name = "redP";
        redP.visible = false;
        this._nodeContainer.addChild(redP);
        this.refreshRedPoints();
        this.width = 194 + 8; // this._nodeContainer.x +  this._nodeContainer.width ; 
        this.height = 287 + 8; //this._nodeContainer.y + this._nodeContainer.height+5;// cardbg.height+10; 
    };
    ServantScrollItem.prototype.refreshRedPoints = function () {
        var servantInfoObj = Api.servantVoApi.getServantObj(this._servantId);
        var redP = this._nodeContainer.getChildByName("redP");
        if (servantInfoObj && redP) {
            redP.visible = servantInfoObj.isShowRedInServantList();
        }
    };
    ServantScrollItem.prototype.refreshInfoAfterUpdate = function () {
        var servantInfoObj = Api.servantVoApi.getServantObj(this._servantId);
        if (!servantInfoObj) {
            return;
        }
        this._lvTxt.text = servantInfoObj.level.toString();
        this.refreshRedPoints();
    };
    ServantScrollItem.prototype.refreshInfoAfterAdvance = function () {
        var servantInfoObj = Api.servantVoApi.getServantObj(this._servantId);
        if (!servantInfoObj) {
            return;
        }
        var cardbg = this._nodeContainer.getChildByName("cardbg");
        cardbg.setload(servantInfoObj.qualityBg);
        this._nameTxt.textColor = ServantScrollItem.getQualityColor(servantInfoObj.clv);
        if (this._nameTxt2) {
            this._nameTxt2.textColor = this._nameTxt.textColor;
        }
        this.refreshRedPoints();
    };
    ServantScrollItem.prototype.refreshIcon = function () {
        var servantInfoObj = Api.servantVoApi.getServantObj(this._servantId);
        if (!servantInfoObj || !servantInfoObj.fullImgPath || servantInfoObj.fullImgPath == "") {
            return;
        }
        // console.log("half>>>>>>> " + servantInfoObj.halfImgPath);
        this._servantImg.setload(servantInfoObj.fullImgPath); //0611
    };
    // protected skinkCallback(event:egret.Event)
    // {
    //     let ret = event.data.data.ret;
    //     if(ret == 0){
    //         this.refreshIcon();
    //     }
    // }
    ServantScrollItem.prototype.eventHandler = function (event) {
        switch (event.type) {
            case egret.TouchEvent.TOUCH_BEGIN:
                this._selectedBox.visible = true;
                break;
            case egret.TouchEvent.TOUCH_CANCEL:
                this._selectedBox.visible = false;
                break;
            case egret.TouchEvent.TOUCH_END:
                this._selectedBox.visible = false;
                ViewController.getInstance().openView(ViewConst.COMMON.SERVANTINFOVIEW, this._servantId);
                break;
        }
    };
    ServantScrollItem.prototype.getSpaceX = function () {
        return 0;
    };
    /**
     * 不同格子Y间距
     */
    ServantScrollItem.prototype.getSpaceY = function () {
        return 0;
    };
    ServantScrollItem.prototype.backFromServantSkin = function (param) {
        if (!param || !param.data || !param.data.isShowAni) {
            return;
        }
        var _isShowAni = param.data.isShowAni;
        var _serid = param.data.servantId;
        if (_serid == this._servantId && _isShowAni) {
            this.refreshIcon();
        }
    };
    ServantScrollItem.prototype.dispose = function () {
        App.MessageHelper.removeEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_SERVANT_UPAURA), this.refreshRedPoints, this);
        App.MessageHelper.removeEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_UPGRADE_SERVANT), this.refreshInfoAfterUpdate, this);
        App.MessageHelper.removeEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_UPGRADE_SERVANT_TEN), this.refreshInfoAfterUpdate, this);
        App.MessageHelper.removeEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_SERVANT_CHANGE), this.refreshInfoAfterAdvance, this);
        App.MessageHelper.removeEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_SERVANT_UPABILITY), this.refreshRedPoints, this);
        App.MessageHelper.removeEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_SERVANT_UPSKILL), this.refreshRedPoints, this);
        App.MessageHelper.removeEventListener(MessageConst.MESSAGE_REFRESH_SERVANT_ITEMLIST, this.refreshRedPoints, this);
        // App.MessageHelper.removeEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_UPGRADE_SERVANT_EQUIP),this.skinkCallback,this);
        App.MessageHelper.removeEventListener(MessageConst.MESSAGE_NOTICE_FROM_SERVANT_SKIN, this.backFromServantSkin, this);
        this._nodeContainer = null;
        this._cardbg = null;
        this._lvTxt = null;
        this._servantId = null;
        this._selectedBox = null;
        this._nameTxt = null;
        this._nameTxt2 = null;
        this._servantImg = null;
        _super.prototype.dispose.call(this);
    };
    ServantScrollItem.getQualityColor = function (quality) {
        var tarColor = TextFieldConst.COLOR_QUALITY_WHITE; //TextFieldConst.COLOR_QUALITY_WHITE
        switch (quality) {
            // case 1:
            // 	tarColor = TextFieldConst.COLOR_QUALITY_WHITE;
            // 	break
            // case 1:
            // 	tarColor = TextFieldConst.COLOR_WARN_GREEN2;
            // 	break
            // case 2:
            // 	tarColor = TextFieldConst.COLOR_QUALITY_BLUE;
            // 	break
            // case 3:
            //     tarColor = TextFieldConst.COLOR_QUALITY_PURPLE;
            // 	break
            // case 4:
            // 	tarColor = TextFieldConst.COLOR_QUALITY_RED;
            // 	break
            // case 5: 
            // 	tarColor = TextFieldConst.COLOR_QUALITY_ORANGE;
            //     break
            // case 6: 
            //     tarColor = TextFieldConst.COLOR_QUALITY_YELLOW;
            //     break
            // default:
            //     tarColor = TextFieldConst.COLOR_WHITE;
            // 	break
            case 0:
                tarColor = TextFieldConst.COLOR_QUALITY_WHITE_SERVANT;
                break;
            case 1:
                tarColor = TextFieldConst.COLOR_QUALITY_GREEN_NEW;
                break;
            case 2:
                tarColor = TextFieldConst.COLOR_QUALITY_BLUE_NEW;
                break;
            case 3:
                tarColor = TextFieldConst.COLOR_QUALITY_PURPLE_NEW;
                break;
            case 4:
                tarColor = TextFieldConst.COLOR_QUALITY_ORANGE_NEW;
                break;
            case 5:
                tarColor = TextFieldConst.COLOR_QUALITY_RED_NEW;
                break;
            case 6:
                tarColor = TextFieldConst.COLOR_QUALITY_YELLOW_NEW;
                break;
            case 7:
                tarColor = TextFieldConst.COLOR_QUALITY_GOLD_NEW;
                break;
            default:
                tarColor = TextFieldConst.COLOR_QUALITY_WHITE_SERVANT;
                break;
        }
        return tarColor;
    };
    ServantScrollItem.QUALITYCFG = [
        TextFieldConst.COLOR_QUALITY_WHITE, 0xffd675, 0xca6cfa
    ];
    return ServantScrollItem;
}(ScrollListItem));
__reflect(ServantScrollItem.prototype, "ServantScrollItem");
