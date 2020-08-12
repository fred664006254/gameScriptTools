/**
 * 
 * @date: 2020-05-09 11:28:44
 * @class DiceSceneTab2
 */
class DiceSceneTab2 extends CommonViewTab{
    private showShin:BaseDisplayObjectContainer = null;
    private skinGroup:BaseDisplayObjectContainer = new BaseDisplayObjectContainer();
    private useSkinGroup:BaseDisplayObjectContainer = new BaseDisplayObjectContainer();
    private getSkinGroup:BaseDisplayObjectContainer = new BaseDisplayObjectContainer();
    private noGetSkinGroup:BaseDisplayObjectContainer = new BaseDisplayObjectContainer();
    private getSkinY:number = 0;
    private noGetSkinY:number = 0;
    private lastGetItemY:number = 0;
    private itemHight:number = 0;
    private useSkinID:string = "";
    private getSkinDAta:string[] = [];
    private noGetSkinDAta:string[] = [];
    
    protected getNetConstEventArr():string[]{
		return [
			NetConst.DICE_BUYSKIN, NetConst.DICE_USESKIN
		];
	}

	protected netEventCallBack(evt : egret.Event):void{
		let view = this;
		switch(evt.type){
            case NetConst.DICE_BUYSKIN:
                view.buySkin(evt);
                break;
            case NetConst.DICE_USESKIN:
                view.refreshview(evt);
                break;
		}
    }

    public constructor() {
        super();
        this.initView();
        //this.setSkip("1004");
        // FIXME: 刷新界面是操作

        
        
        
    }
    public dispose(){
        this.skinGroup = null;
        this.useSkinGroup = null;
        this.getSkinGroup = null;
        this.noGetSkinGroup = null;
        this.getSkinY = null;
        this.lastGetItemY = null;
        this.useSkinID = null;
        this.getSkinDAta = null;
        this.noGetSkinDAta = null;
        super.dispose();
    }
    public initView():void{
        this.initEventListener();
        this.refreshData();
        this.skinGroup.width = GameConfig.stageWidth;
        this.useSkinGroup.width = GameConfig.stageWidth;
        this.getSkinGroup.width = GameConfig.stageWidth;
        this.noGetSkinGroup.width = GameConfig.stageWidth;
        this.creatMoren();
        this.reLineGet();
        this.creatGet();
        this.reLineNoGet();
        this.creatNoGet();
        this.creatUi();
        let skinScroll = ComponentMgr.getScrollView(this.skinGroup,new egret.Rectangle(0,0, GameConfig.stageWidth, GameConfig.stageHeigth - 310));
        this.addChild(skinScroll);
        skinScroll.x = 0;
        skinScroll.y = 40;
    }

    private creatUi():void{
        this.skinGroup.addChild(this.useSkinGroup);
        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenter, this.useSkinGroup, this.skinGroup, [0,0]);
        this.skinGroup.addChild(this.getSkinGroup);
        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenter, this.getSkinGroup, this.skinGroup, [0,0]);
        this.skinGroup.addChild(this.noGetSkinGroup);
        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenter, this.noGetSkinGroup, this.skinGroup, [0,0]);
        
    }
    //刷新界面
    private refreshView():void{
        this.refreshData();
        this.useSkinGroup.removeChildren();
        this.getSkinGroup.removeChildren();
        this.noGetSkinGroup.removeChildren();
        this.creatMoren();
        this.reLineGet();
        this.creatGet();
        this.reLineNoGet();
        this.creatNoGet();
        this.creatUi();
    }
    // 默认皮肤
    private creatMoren(){     
        this.showShin = this.createSkinItem(this.useSkinID,10, true,true);
        this.useSkinGroup.addChild(this.showShin);
        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenter, this.showShin, this.useSkinGroup, [0,0]);
    }
    // 已获得的皮肤
    private creatGet(){
        this.getSkinDAta.forEach((item, index)=> {
           let skinItem = this.createSkinItem(item, this.getSkinY + index * 400, true,false);
           this.getSkinGroup.addChild(skinItem);
           App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenter, skinItem, this.getSkinGroup, [0,0]);
           this.itemHight = skinItem.y+skinItem.height;
        });
    }
    // 未获得的皮肤
    private creatNoGet(){
        this.noGetSkinDAta.forEach((item, index)=> {
            let skinItem = this.createSkinItem(item, this.noGetSkinY + index * 430, false, false,true);
            this.noGetSkinGroup.addChild(skinItem);
            App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenter, skinItem, this.noGetSkinGroup, [0,0]);
         }); 
        

    }

    //刷新使用的data数据
    private refreshData():void{
        this.useSkinID = String(Api.LineVoApi.getUseSkinID());
        this.getSkinDAta = Api.LineVoApi.getHadSkins();
        this.noGetSkinDAta = Api.LineVoApi.getNotHadSkins();
    }
    private reLineGet():void{
        let line1 = BaseBitmap.create("public_line1");
        this.skinGroup.addChild(line1);
        line1.width = this.showShin.width;
        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenter, this.showShin, this.skinGroup, [0,0]);
        line1.y = this.showShin.y + this.showShin.height + 10;

        let txtHad = ComponentMgr.getTextField('11', TextFieldConst.SIZE_30, ColorEnums.white);
        txtHad.width = this.skinGroup.width;
        txtHad.textAlign = egret.HorizontalAlign.CENTER;
        this.skinGroup.addChild(txtHad);
        txtHad.text = LangMger.getlocal("dice_battle_skin_tip1");
        txtHad.x = 0;
        txtHad.y = line1.y + line1.height + 20;
        this.getSkinY = txtHad.y + txtHad.height + 5;
    }
    private reLineNoGet():void{
        let line2 = BaseBitmap.create("public_line1");
        this.skinGroup.addChild(line2);
        line2.width = this.showShin.width;
        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenter, this.showShin, this.skinGroup, [0,0]);
        line2.y = this.lastGetItemY + this.itemHight + 20;

        let txtNoHad = ComponentMgr.getTextField('11', TextFieldConst.SIZE_30, ColorEnums.white);
        txtNoHad.width = this.skinGroup.width;
        txtNoHad.textAlign = egret.HorizontalAlign.CENTER;
        this.skinGroup.addChild(txtNoHad);
        txtNoHad.text = LangMger.getlocal("dice_battle_skin_tip2");
        txtNoHad.x = 0;
        txtNoHad.y = line2.y + line2.height + 20;

        this.noGetSkinY = txtNoHad.y + txtNoHad.height + 5; 
    }
    private createSkinItem(skinID:string, y:number, had:boolean,isUseing:boolean, isnew?:boolean){
        let skinItem:BaseDisplayObjectContainer = new BaseDisplayObjectContainer();
        skinItem.name = `skinItem${skinID}`;
        skinItem.y = y;

        let skinBg = BaseLoadBitmap.create(`battleskin_${skinID}`);
        skinItem.addChild(skinBg);
        skinBg.y = 32;
        skinItem.width = skinBg.width;
        
        
        let titleBg = BaseBitmap.create(`dice_skin_title_bg_${skinID}`);
        skinItem.addChild(titleBg);
        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenter, titleBg, skinBg, [0,0]);

        let titleTxt = ComponentMgr.getTextField('11', TextFieldConst.SIZE_36, ColorEnums.white);
        skinItem.addChild(titleTxt);
        titleTxt.text = LangMger.getlocal(`dice_battle_skin_title_${skinID}`);
        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, titleTxt, titleBg, [0,23]);

        if(isnew){
            let newSkinBg = BaseBitmap.create("dice_skin_new_icon");
            skinItem.addChild(newSkinBg);
            newSkinBg.x = -20;
            newSkinBg.y = skinBg.y;

            let newTxt = ComponentMgr.getTextField('NEW', TextFieldConst.SIZE_30, ColorEnums.white);
            skinItem.addChild(newTxt);
            App.DisplayUtil.setLayoutPosition(LayoutConst.lefttop, newTxt, newSkinBg, [15,32]); 
        }
        if(!had){
            //App.DisplayUtil.changeToGray(skinBg);
            let noGetNumBg = BaseBitmap.create("dice_numerical_floor_bg");
            App.DisplayUtil.setLayoutPosition(LayoutConst.rightbottom, noGetNumBg, skinBg, [0, noGetNumBg.height / 2]);
            // let buyBtn = ComponentMgr.getButton(ButtonConst.BTN_CONFIRM, "", this.buyBtnOnClick, this, [skinID]);
            skinItem.addChild(noGetNumBg);
            //App.DisplayUtil.setLayoutPosition(LayoutConst.rightbottom, noGetNumBg, skinBg, [0,- noGetNumBg.height / 2]);
            let icon = this.btnIconAndTxt(skinID);
            skinItem.addChild(icon);
            App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterverticalCenter, icon, noGetNumBg, [0,0]);
            
            skinBg.touchEnabled = true;
            skinBg.addTouchTap(this.buyBtnOnClick, this, [skinID]);
        }else{
            if(!isUseing&&Config.BattleskinCfg.getIsDefaultSkin(skinID)){
                let buyBtn = ComponentMgr.getButton(ButtonConst.BTN_CONFIRM, "", this.setSkip, this, [skinID]);
                skinItem.addChild(buyBtn);
                App.DisplayUtil.setLayoutPosition(LayoutConst.rightbottom, buyBtn, skinBg, [0,0]);
                let newTxt = ComponentMgr.getTextField('dice_battle_skin_inuse', TextFieldConst.SIZE_30, ColorEnums.white);
                newTxt.text = LangMger.getlocal(`dice_battle_skin_inuse`);
                buyBtn.addChild(newTxt);
                App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterverticalCenter, newTxt, buyBtn, [0,0]); 
            }
            
        }
        if(skinID == this.useSkinID&&!isUseing&&Config.BattleskinCfg.getIsDefaultSkin(skinID)){
            App.DisplayUtil.changeToGray(skinBg);
            let buyBtn = ComponentMgr.getButton(ButtonConst.BTN_CANCEL, "", this.unloadSkip, this);
            skinItem.addChild(buyBtn);
            App.DisplayUtil.setLayoutPosition(LayoutConst.rightbottom, buyBtn, skinBg, [0,0]);
            let newTxt = ComponentMgr.getTextField('11', TextFieldConst.SIZE_30, ColorEnums.white);
            newTxt.text = LangMger.getlocal(`dice_battle_skin_nouse`);
            buyBtn.addChild(newTxt);
            App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterverticalCenter, newTxt, buyBtn, [0,0]); 
        }
        if(skinID == this.useSkinID&&isUseing&&Config.BattleskinCfg.getIsDefaultSkin(skinID)){
            let buyBtn = ComponentMgr.getButton(ButtonConst.BTN_CANCEL, "", this.unloadSkip, this);
            skinItem.addChild(buyBtn);
            App.DisplayUtil.setLayoutPosition(LayoutConst.rightbottom, buyBtn, skinBg, [0,0]);
            let newTxt = ComponentMgr.getTextField('11', TextFieldConst.SIZE_30, ColorEnums.white);
            newTxt.text = LangMger.getlocal(`dice_battle_skin_nouse`);
            buyBtn.addChild(newTxt);
            App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterverticalCenter, newTxt, buyBtn, [0,0]); 
        }

        return skinItem;
    }

    private btnIconAndTxt(skinID:string):BaseDisplayObjectContainer{
        let group = new BaseDisplayObjectContainer();
        let item = Config.BattleskinCfg.getSkinInfoByID(skinID);

        let icon = BaseBitmap.create();
        group.addChild(icon);
       
        let txt = ComponentMgr.getTextField('11', TextFieldConst.SIZE_30, ColorEnums.white);
        group.addChild(txt);
     
        switch (item.getType) {
            case 3:
                icon.texture = ResMgr.getRes("trophy_icon");
                icon.setScale(0.5);
                txt.text = String(item.needScore);
                break;
            case 2:
                icon.texture = ResMgr.getRes("ab_mainui_gem");
                txt.text = String(item.costGem);
                break
        
            default:
                break;
        }
        App.DisplayUtil.setLayoutPosition(LayoutConst.leftverticalCenter, txt, icon, [icon.width * icon.scaleX + 5,0]);
        return group;
    }

    private buyBtnOnClick(event:egret.TouchEvent,data){
        let item = Config.BattleskinCfg.getSkinInfoByID(data);
        let view = this;
        switch (item.getType) {
            case 2:
                let gemnum = Api.UserinfoVoApi.getGem();
                if(gemnum < item.costGem){
                    App.CommonUtil.gemNotEnough(2);
                    // App.CommonUtil.showTip(LangMger.getlocal("sysgemNotEnough"));
                } else {
                    ViewController.getInstance().openView(ViewConst.CONFIRMPOPUPVIEW, {
                            title : "战场皮肤",
                            msg : `确定要购买${LangMger.getlocal(`dice_battle_skin_title_${data}`)}皮肤`,//'确定要购买${skinID}皮肤'
                            handler : view,
                            iconURL: "ab_mainui_gem",
                            confirmTxt:String(item.costGem),
                            //needCancel : true,
                            callback : ()=>{
                                NetManager.request(NetConst.DICE_BUYSKIN, {skinId:data});
                            },
                            //needClose : 1,
                        });
                }
                break;

            case 3:
                let capnum = Api.UserinfoVoApi.getScore();
                if(capnum < item.needScore){
                    App.CommonUtil.showTip(`奖杯不足`);
                } else {
                    ViewController.getInstance().openView(ViewConst.CONFIRMPOPUPVIEW, {
                            title : "战场皮肤",
                            msg : `确定要购买${LangMger.getlocal(`dice_battle_skin_title_${data}`)}皮肤`,
                            handler : view,
                            iconURL: "ab_mainui_gem",
                            confirmTxt:String(item.needScore),
                            callback : ()=>{
                                NetManager.request(NetConst.DICE_BUYSKIN, {skinId:data});
                            },
                        });
                }
                break;
        
            default:
                break;
        }
    }

    private refreshview(evt){
        this.refreshView();
        console.log(evt);
    }

    private setSkip(id:string):void{
        NetManager.request(NetConst.DICE_USESKIN, {skinId:id});
    }
    private unloadSkip():void{
        let itemID = Config.BattleskinCfg.getSkinIDs();
        NetManager.request(NetConst.DICE_USESKIN, {skinId:itemID[0]});
    }

    private buySkin(evt){
        this.refreshView();
         console.log(evt);
    }

}