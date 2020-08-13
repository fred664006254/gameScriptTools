/**
 * 帝王成就item
 * date 2019.12.10
 * author ycg
 * @class EmperorAchieveViewScrollItem
 */
class EmperorAchieveViewScrollItem extends ScrollListItem{
    private _type:number = 0;
    private _data:any = null;

    public constructor() {
		super();
	}
	
	public initItem(index: number, data: any, param: any): void {
        this._type = param.type;
        this._data = data;
        let bgStr = "emperorachieve_itembg1";
        if (this._type == 1){
            bgStr = "emperorachieve_itembg2";
        }
        else if (this._type == 3){
            bgStr = "emperorachieve_itembg3";
        }
        let bg = BaseBitmap.create(bgStr);
        this.addChild(bg);
        this.width = 532;
        this.height = bg.height + 8;
        bg.setPosition(this.width/2 - bg.width/2, 0);

        let skinCfg = Config.ServantskinCfg.getServantSkinItemById(data.servantSkinId);
        let skinImg = BaseLoadBitmap.create(skinCfg.body);
        skinImg.width = 405;
        skinImg.height = 467;
        skinImg.setPosition(35, 17);
        skinImg.setScale(0.4); //0.38
        this.addChild(skinImg);
        let skinRect = new egret.Rectangle(0, 0, 165/skinImg.scaleX, 175/skinImg.scaleY);
        skinImg.mask = skinRect;
        
        // let skinBtn = this.getSkinBtnContainer(data.servantSkinId, false);
        // skinBtn.setPosition(15, bg.y + 90);
        // this.addChild(skinBtn);
        if (skinCfg && skinCfg.type >= 2){
            let titleContainer = this.getTitleContainer(skinCfg.type, data.servantSkinId);
            titleContainer.setPosition(50 + 84 - titleContainer.width/2, bg.y + bg.height - titleContainer.height - 15);
            this.addChild(titleContainer);
        }

        //解锁条件
        let unlockBg = BaseBitmap.create("acchristmasview_smalldescbg");
        this.addChild(unlockBg);
        let currNum = Api.emperorAchieveVoApi.getKingAchieveNum(this._type);
        let unlockInfoStr = "emperorAchieveUnlockInfo1";
        if (this._type == 1){
            unlockInfoStr = "emperorAchieveUnlockInfo2";
        }
        let unlockInfo = ComponentManager.getTextField(LanguageManager.getlocal(unlockInfoStr, [""+currNum, ""+data.needNum]), TextFieldConst.FONTSIZE_ACTIVITY_COMMON, TextFieldConst.COLOR_LIGHT_YELLOW);
        unlockInfo.setPosition(225, bg.y + bg.height/2);
        unlockBg.height = unlockInfo.height + 12;
        unlockBg.width = unlockInfo.width + 40;
        unlockBg.setPosition(unlockInfo.x + unlockInfo.width/2 - unlockBg.width/2, unlockInfo.y + unlockInfo.height/2 - unlockBg.height/2);
        this.addChild(unlockInfo);

        //item 介绍
        let itemInfoStr = "emperorAchieveItemDesc1";
        if (data.unlock && data.unlock == 1){
            itemInfoStr = "emperorAchieveItemDesc2";
        }
        let skinName = LanguageManager.getlocal("servantSkinName"+data.servantSkinId);
        let itemInfo = ComponentManager.getTextField(LanguageManager.getlocal(itemInfoStr, [skinName]), TextFieldConst.FONTSIZE_ACTIVITY_COMMON, TextFieldConst.COLOR_BROWN);
        // itemInfo.width = 300;
        itemInfo.lineSpacing = 8;
        itemInfo.setPosition(unlockInfo.x, 15 + (bg.height - unlockBg.y - 17)/2 - itemInfo.height/2);
        this.addChild(itemInfo);

        if (Api.emperorAchieveVoApi.isGetKingAchieveByType(data.id, this._type)){
            let receiveFlag = BaseBitmap.create("emperorachieve_get");
            receiveFlag.setPosition(bg.width - receiveFlag.width - 120, bg.height - receiveFlag.height - 25);
            this.addChild(receiveFlag);
        }
        else{
            let receiveBtn = ComponentManager.getButton(ButtonConst.BTN2_SMALL_YELLOW, "taskCollect", ()=>{
                if (data.unlock == 1){
                    App.MessageHelper.dispatchEvent(MessageConst.MESSAGE_EMPERORACHIEVEREWARD_OPENFUN, {callback: this.getRewardRequest, obj: this});
                }
                else{
                    NetManager.request(NetRequestConst.REQUEST_EMPERORACHIEVE_GETREWARD, {achieveType:this._type, rkey:Number(data.id)});
                }
            }, this);
            receiveBtn.setPosition(bg.width - receiveBtn.width - 120, unlockBg.y + unlockBg.height + 5);
            this.addChild(receiveBtn);
            //mask
            let mask = BaseBitmap.create("public_9_viewmask");
            mask.width = bg.width - 22;
            mask.height = bg.height - 6;
            mask.setPosition(bg.x + bg.width/2 - mask.width/2, bg.y + bg.height/2 - mask.height/2 - 5);
            this.addChild(mask);
            mask.alpha = 0.7;
            let lockFlag = BaseBitmap.create("emperorachieve_lock");
            lockFlag.setPosition(bg.width - lockFlag.width - 120, bg.height - lockFlag.height - 25);
            this.addChild(lockFlag);
            let currIndex = Api.emperorAchieveVoApi.getCurrKingAchieveId(this._type);
            if (index <= currIndex){
                mask.visible = false;
                lockFlag.visible = false;
            }
            else{
                mask.visible = true;
                lockFlag.visible = true;
                receiveBtn.visible = false;
            }
            if (Api.emperorAchieveVoApi.isCanGetKingAchieveByType(data.id, this._type)){
                receiveBtn.setEnable(true);
                let btnEff = ComponentManager.getCustomMovieClip("emperorout_achievebtneff", 9, 70);
                btnEff.setPosition(receiveBtn.x - 8, receiveBtn.y - 3);
                btnEff.playWithTime(0);
                this.addChild(btnEff);
            }
            else{
                receiveBtn.setEnable(false);
            }
        }      
    }

    public getRewardRequest():void{
        App.LogUtil.log("getRewardRequest");
        NetManager.request(NetRequestConst.REQUEST_EMPERORACHIEVE_GETREWARD, {achieveType:this._type, rkey: Number(this._data.id)});
    }

    public getTitleContainer(type:number, skinId:any):BaseDisplayObjectContainer{
        let container = new BaseDisplayObjectContainer();
        let frames = 0;
        let effW = 0;
        let effH = 0;
        let titleBgStr = "servant_skin_title_"+type;
        if (type == 2){ // 147 64
            frames = 13;
            effW = 147;
            effH = 64;
        }
        else if (type == 3){
            frames = 16; // 167, 65
            effW = 167;
            effH = 65;
        }
        if (!ResourceManager.hasRes(titleBgStr)){
            return null;
        }

        let title = BaseBitmap.create(titleBgStr); // 161 62
        container.addChild(title);
        container.width = title.width;
        container.height = title.height;

        let titleEffStr = "servant_skin_titleeffect"+type;
        
        if (ResourceManager.hasRes(titleEffStr)){
            let titleEffect = ComponentManager.getCustomMovieClip(titleEffStr+"_", frames, 70);
            titleEffect.setPosition(title.x + title.width/2 - effW/2, title.y + title.height/2 - effH/2);
            titleEffect.playWithTime(0);
            container.addChild(titleEffect);
            titleEffect.blendMode = egret.BlendMode.ADD;
        }
        container.setScale(0.8);
        title.addTouchTap(() => {
            let servantSkin = Config.ServantskinCfg.formatRewardItemVoStr(skinId);
            let topMsg = LanguageManager.getlocal("emperorAchieveSkinTopMsg");
            let data = {data:[
                {idType: servantSkin, topMsg:topMsg, bgName:"", scale:0.73, offY: -3},
            ], showType:""};
            ViewController.getInstance().openView(ViewConst.POPUP.ACCOMMONREWARDPOPUPVEW, data);
		}, this);
        return container;
    }

    //衣装预览按钮
    private getSkinBtnContainer(id:number|string, isOther?:boolean):BaseDisplayObjectContainer{
        let container = new BaseDisplayObjectContainer();
        let skinTxtEffect = ComponentManager.getCustomMovieClip("acwealthcarpview_skineffect", 10, 70);
		skinTxtEffect.width = 208;
		skinTxtEffect.height = 154;
		skinTxtEffect.setPosition(0, 0);
		skinTxtEffect.blendMode = egret.BlendMode.ADD;
		container.addChild(skinTxtEffect);
		skinTxtEffect.playWithTime(-1);
        // skinTxtEffect.touchEnabled = false;
        
        let skinTxtStr = "acwealthcarpview_servantskintxt";
        if (isOther){
            skinTxtStr = "acgiftreturnview_common_skintxt"
        }
		let skinTxt = BaseBitmap.create(skinTxtStr);
		skinTxt.anchorOffsetX = skinTxt.width / 2;
		skinTxt.anchorOffsetY = skinTxt.height / 2;
		App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterverticalCenter, skinTxt, skinTxtEffect);
		container.addChild(skinTxt);
		egret.Tween.get(skinTxt, { loop: true }).to({ scaleX: 1.05, scaleY: 1.05 }, 400).to({ scaleX: 1, scaleY: 1 }, 400);

		let skinTxteffect = BaseBitmap.create(skinTxtStr);
		skinTxteffect.anchorOffsetX = skinTxteffect.width / 2;
		skinTxteffect.anchorOffsetY = skinTxteffect.height / 2;
		App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterverticalCenter, skinTxteffect, skinTxtEffect);
		container.addChild(skinTxteffect);
		skinTxteffect.blendMode = egret.BlendMode.ADD;
		skinTxteffect.alpha = 0;
		egret.Tween.get(skinTxteffect, { loop: true }).to({ alpha: 0.7, scaleX: 1.05, scaleY: 1.05 }, 400).to({ alpha: 0, scaleX: 1, scaleY: 1 }, 400);
		//透明点击区域
        let touchPos = BaseBitmap.create("public_alphabg");
        touchPos.width = 160;
		touchPos.height = 40;
		touchPos.setPosition(25, 57);
        container.addChild(touchPos);
		touchPos.addTouchTap(() => {
            let servantSkin = Config.ServantskinCfg.formatRewardItemVoStr(id);
            let topMsg = LanguageManager.getlocal("emperorAchieveSkinTopMsg");
            let data = {data:[
                {idType: servantSkin, topMsg:topMsg, bgName:"", scale:0.73, offY: -3},
            ], showType:""};
            ViewController.getInstance().openView(ViewConst.POPUP.ACCOMMONREWARDPOPUPVEW, data);
		}, this);
        return container;
    }

    public getSpaceY():number{
        return 5;
    }

    public dispose():void{
        this._type = 0;
        super.dispose();
    }
}