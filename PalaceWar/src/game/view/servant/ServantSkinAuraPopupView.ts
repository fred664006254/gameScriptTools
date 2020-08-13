/**
 * 皮肤光环详情
 * author qianjun
 */
class ServantSkinAuraPopupView extends PopupView {
	public constructor() {
		super();
    }
    
    private _servantNpc : BaseLoadBitmap = null;
    private _skinNameBg : BaseBitmap = null;
    private _skinNameTxt : BaseTextField = null;
    private _attrBg : BaseBitmap = null;
    private _bottombg : BaseBitmap = null;
    private _skinAddTxt1 : BaseTextField = null;
    private _skinAddTxt2 : BaseTextField = null;
    private _skinAddTxt3 : BaseTextField = null;
    private _skinAddTxt4 : BaseTextField = null;
    private _haveTxt : BaseTextField = null;
    private _list : ScrollList = null;
    private _curSkinId : string = '';
    private _itemIcon : BaseLoadBitmap = null;
    private _skinArr = [];
    private _switchDelta : number = 500;
    private _infoGroup : BaseDisplayObjectContainer = null;
    private _tipTxt : BaseTextField = null;

	protected initView(): void {

		let view = this;
        let data = view.param.data;
        
        let servantId = data.servantId;
        let skinId = data.skinId;
        view._curSkinId = data.skinId;

        let skincfg = Config.ServantskinCfg.getServantSkinItemById(skinId);
        let itemcfg = Config.ItemCfg.getItemCfgById(skincfg.aura[1].growNeed);
        let servantSkinList = Config.ServantskinCfg.getIdListBySerVantId(servantId);//[skinId,skinId]
        let servantCfg = Config.ServantCfg.getServantItemById(servantId);
        // 门客变换和计谋变化
        // App.MessageHelper.addEventListener('levelup', view.rerfreshLevelUp, view);
		App.MessageHelper.addNetMessage(NetRequestConst.REQUST_SERVANT_UPSKINAURA,view.rerfreshLevelUp,this);
		let bg = BaseBitmap.create("servantskinaurabg");
		bg.setPosition(this.viewBg.x + this.viewBg.width / 2 - bg.width / 2,0);
        view.addChildToContainer(bg);
        
        let npc = BaseLoadBitmap.create(``);
        npc.width = 405;
        npc.height = 467;
        npc.setScale(232/405);
        npc.mask = new egret.Rectangle(0,0,640,350);
        App.DisplayUtil.setLayoutPosition(LayoutConst.lefttop, npc, bg, [25,0]);
        view.addChildToContainer(npc);
        view._servantNpc = npc;

        let infoGroup = new BaseDisplayObjectContainer();
        infoGroup.width = 217;
        infoGroup.height = 212;
        App.DisplayUtil.setLayoutPosition(LayoutConst.righttop, infoGroup, bg, [62,0]);
        view.addChildToContainer(infoGroup);
        view._infoGroup = infoGroup;

        let namebg = BaseBitmap.create('skin_detail_namebg');
        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, namebg, infoGroup, [0,-10], true);
        infoGroup.addChild(namebg);
        view._skinNameBg = namebg;

        let skinNameStr = ComponentManager.getTextField('', 24, TextFieldConst.COLOR_QUALITY_ORANGE);//
        skinNameStr.lineSpacing = 5;
        skinNameStr.textAlign = egret.HorizontalAlign.CENTER;
        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, skinNameStr, namebg, [0,44.5]);
        infoGroup.addChild(skinNameStr);
        view._skinNameTxt = skinNameStr;

        let attrbg = BaseBitmap.create('public_9_downbg');
        attrbg.width = 220;
        attrbg.height = 106;
        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, attrbg, namebg, [0,namebg.height+13]);
        infoGroup.addChild(attrbg);
        view._attrBg = attrbg;

        for(let i = 1; i < 5; ++ i){
            let addTxt = ComponentManager.getTextField('', 18, TextFieldConst.COLOR_QUALITY_YELLOW);//
            App.DisplayUtil.setLayoutPosition(LayoutConst.lefttop, addTxt, attrbg, [20, 12 + (i - 1) * 22]);
            infoGroup.addChild(addTxt);
            view[`_skinAddTxt${i}`] = addTxt;
        }

        let listbg = BaseBitmap.create('public_9_probiginnerbg');
        listbg.width = 530;
        listbg.height = 585;
        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, listbg, bg, [0, bg.height]);
        view.addChildToContainer(listbg);

        let itemRect:egret.Rectangle =  new egret.Rectangle(0,0,listbg.width - 10, listbg.height - 5);
        let scrollList = ComponentManager.getScrollList(ServantSkinAuraItem, null, itemRect);
        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, scrollList, listbg);
        view.addChildToContainer(scrollList);
        view._list = scrollList;

        let bottombg = BaseBitmap.create(`public_9_bg1`);
        bottombg.width = 530;
        bottombg.height = 40;
        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, bottombg, bg, [0, 800]);
        view.addChildToContainer(bottombg);
        view._bottombg = bottombg;

        let haveNum = 0;
        let haveTxt = ComponentManager.getTextField('', 22, TextFieldConst.COLOR_LIGHT_YELLOW);//
        view.addChildToContainer(haveTxt);

        let itemIcon = BaseLoadBitmap.create(itemcfg.icon);
        itemIcon.width = itemIcon.height = 100;
        itemIcon.setScale(0.37);
        view._itemIcon = itemIcon;
        view.addChildToContainer(itemIcon);

        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterverticalCenter, haveTxt, bottombg);
        view._haveTxt = haveTxt;

        let arrow_leftBtn = ComponentManager.getButton("btn_leftpage", "", view.switchHandler, view, ["left"]);
		App.DisplayUtil.setLayoutPosition(LayoutConst.leftverticalCenter, arrow_leftBtn, bg, [10,0]);
		view.addChildToContainer(arrow_leftBtn);

		let arrow_rightBtn = ComponentManager.getButton("btn_leftpage","",view.switchHandler, view, ["right"]);
        arrow_rightBtn.anchorOffsetX = arrow_rightBtn.width / 2;
        arrow_rightBtn.scaleX = -1;
        App.DisplayUtil.setLayoutPosition(LayoutConst.rightverticalCenter, arrow_rightBtn, bg, [10,0]);
        view.addChildToContainer(arrow_rightBtn);
        
        if(servantSkinList && servantSkinList.length > 1){
            arrow_leftBtn.visible = arrow_rightBtn.visible = true;
            view._skinArr = [];
            view._skinArr = Api.chatVoApi.arr_clone(servantSkinList);
        }
        else{
            arrow_leftBtn.visible = arrow_rightBtn.visible = false;
        }

        view.container.mask = new egret.Rectangle(GameData.popupviewOffsetX,0,570+GameData.popupviewOffsetX,GameConfig.stageHeigth);

        let tipTxt = ComponentManager.getTextField(LanguageManager.getlocal(`servantSkinTip`, [itemcfg.name]), 20, TextFieldConst.COLOR_LIGHT_YELLOW);
        App.DisplayUtil.setLayoutPosition(LayoutConst.righttop, tipTxt, bottombg, [-10,bottombg.height + 25]);
        view.addChildToContainer(tipTxt);
        view._tipTxt = tipTxt;
        view.freshView();
    }

    private switchHandler(param : any):void{
        let view = this;
        let curS = egret.getTimer();
		if( curS - view._switchDelta < 300){
			return;	
		}
        view._switchDelta = curS;

        let newserId = "";
        let arr = view._skinArr;
		let len = arr.length;
		for(let index = 0; index < len; index++) {
			if(arr[index] == view._curSkinId){
				if(param == "left"){
					if(index == 0){
						newserId = arr[len-1];
					}else{
						newserId = arr[index-1];
					}
				}else if(param == "right"){
					if(index == len -1 ){
						newserId = arr[0];
					}else{
						newserId = arr[index+1];
					}
				}
				break;
			}
        }
        
		// if(newserId && newserId == view._curSkinId){
		// 	return;
        // }	
        view._curSkinId = newserId;
        // this.refreshBaseUIInfo(); //刷新重置id后的基础文本信息& 按钮状态
        let tmpX = view._servantNpc.x;
		let tarPosX1 = tmpX + 180;
		let tarPosX2 = tmpX - 180;
		 if(param == "left"){
            tarPosX1 = tmpX - 180;
			tarPosX2 = tmpX + 180;
        }
        egret.Tween.get(view._infoGroup).to({alpha : 0},100).
        wait(200).
        to({alpha : 1},200).
        call(()=>{
            egret.Tween.removeTweens(view._infoGroup);
        },view);

        egret.Tween.get(view._servantNpc).to({x : tarPosX1, alpha : 0},200).
        wait(100).
        call(view.freshView,view).
        set({x : tarPosX2}).
        to({x : tmpX, alpha : 1},200).
        call(()=>{
            egret.Tween.removeTweens(view._servantNpc);
        },view);
    }
    
    private freshView():void{
        let view = this;
        let skinId = view._curSkinId;
        let namebg = view._skinNameBg;
        let skinNameStr = view._skinNameTxt;
        let attrbg = view._attrBg;
        view._servantNpc.setload(`skin_full_${skinId}`);
        let srvantCfg = Config.ServantCfg.getServantItemById(view.param.data.servantId);
        skinNameStr.text = LanguageManager.getlocal("servantSkinName" + skinId) + '\n' + `<font color =0xffffff>${srvantCfg.name}</font>`;
        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, skinNameStr, namebg, [0,34.5]);

        let cfg = Config.ServantskinCfg.getServantSkinItemById(skinId);
        for(let i = 1; i < 5; ++ i){
            let value = '0';
            let servant:ServantInfoVo = Api.servantVoApi.getServantObj(view.param.data.servantId);
            let skinvo : ServantSkinVo = servant.getSkinInfobyId(skinId);
            let curLevel = skinvo ? skinvo.getSkinAuraLv(Number(i) - 1) : 0;
            if(cfg.aura[i].growAtt >= 1){
                let tmp = cfg.aura[i].growAtt * curLevel;
                value = App.MathUtil.strip(tmp) + '';
            }
            else{
                let tmp = cfg.aura[i].growAtt * 100 * curLevel;
                value = App.MathUtil.strip(tmp) + '%';
            }
            view[`_skinAddTxt${i}`].text = LanguageManager.getlocal(`servantSkinAuraAdd${i}`, [String(0xffffff), value]);
            App.DisplayUtil.setLayoutPosition(LayoutConst.left, view[`_skinAddTxt${i}`], attrbg, [20]);
        }
        
        let skincfg = Config.ServantskinCfg.getServantSkinItemById(skinId);
        let haveNum = Api.itemVoApi.getItemNumInfoVoById(skincfg.aura[1].growNeed);
        let itemcfg = Config.ItemCfg.getItemCfgById(skincfg.aura[1].growNeed);
        view._haveTxt.text = LanguageManager.getlocal('servantskinhave', [haveNum.toString()]);
        view._itemIcon.setload(itemcfg.icon);
        let tmpX = (view._bottombg.width - view._haveTxt.textWidth - view._itemIcon.width * view._itemIcon.scaleX - 10) / 2;
        App.DisplayUtil.setLayoutPosition(LayoutConst.leftverticalCenter, view._haveTxt, view._bottombg, [tmpX, 0]);
        App.DisplayUtil.setLayoutPosition(LayoutConst.leftverticalCenter, view._itemIcon, view._haveTxt, [view._haveTxt.textWidth + 10, 0]);

        let arr = [];
        for(let i = 1; i < 5; ++ i){
            arr.push({
                id : i,
                skinId : skinId,
                servantId : view.param.data.servantId
            });
        }
        view._list.refreshData(arr);

        view._tipTxt.text = LanguageManager.getlocal(`servantSkinTip`, [itemcfg.name]);
        App.DisplayUtil.setLayoutPosition(LayoutConst.righttop, view._tipTxt, view._bottombg, [-10, view._bottombg.height + 25]);
    }
    
    private rerfreshLevelUp(evt : egret.Event):void{
        let view = this;
        let index = evt.data.data.data.auraId;
        for(let i = 0; i < 4; ++ i){
            let item : any  = view._list.getItemByIndex(i);
            item.freshBtn();
            if(i == (index - 1)){
                item.refreshItem();
            }
        }

        let skinId = view._curSkinId;
        let cfg = Config.ServantskinCfg.getServantSkinItemById(skinId);

        let value = '0';
        let servant:ServantInfoVo = Api.servantVoApi.getServantObj(view.param.data.servantId);
        let skinvo : ServantSkinVo = servant.getSkinInfobyId(skinId);
        let curLevel = skinvo ? skinvo.getSkinAuraLv(Number(index) - 1) : 0;
        if(cfg.aura[index].growAtt >= 1){
            let tmp = cfg.aura[index].growAtt * curLevel;
            value = App.MathUtil.strip(tmp) + '';
        }
        else{
            let tmp = cfg.aura[index].growAtt * 100 * curLevel;
            value = App.MathUtil.strip(tmp) + '%';
        }
        view[`_skinAddTxt${index}`].text = LanguageManager.getlocal(`servantSkinAuraAdd${index}`, [String(0xffffff), value]);
        App.DisplayUtil.setLayoutPosition(LayoutConst.left, view[`_skinAddTxt${index}`], view._attrBg, [20]);
        
        let skincfg = Config.ServantskinCfg.getServantSkinItemById(skinId);
        let haveNum = Api.itemVoApi.getItemNumInfoVoById(skincfg.aura[1].growNeed);
        let itemcfg = Config.ItemCfg.getItemCfgById(skincfg.aura[1].growNeed);
       
        view._haveTxt.text = LanguageManager.getlocal('servantskinhave', [haveNum.toString()]);
        let tmpX = (view._bottombg.width - view._haveTxt.textWidth - view._itemIcon.width * view._itemIcon.scaleX - 10) / 2;
        App.DisplayUtil.setLayoutPosition(LayoutConst.leftverticalCenter, view._haveTxt, view._bottombg, [tmpX, 0]);
        App.DisplayUtil.setLayoutPosition(LayoutConst.leftverticalCenter, view._itemIcon, view._haveTxt, [view._haveTxt.textWidth + 10, 0]);
        
        App.MessageHelper.dispatchEvent(MessageConst.MESSAGE_NOTICE_SERVANTSKIN_AURA);
    }

	protected getResourceList(): string[] {
		return super.getResourceList().concat([
			'servantskinaurabg', 'skin_detail_namebg', 'servant_book_lvup', 'servant_book_lvup8', 'servant_book_lvup_light'
		]);
    }
    
    protected getTitleBgName():string{
        return null;
    }

    protected getShowHeight():number{
        return 910+10;
    }

    // protected getShowWidth():number{
    //     return 570;
    // }

    protected getTitleStr() : string{
        return 'servantskinaura';
    }

	public dispose(): void {
        let view = this;
        BaseLoadBitmap.release(view._servantNpc);
        view._servantNpc = null;
        BaseLoadBitmap.release(view._itemIcon);
        view._itemIcon = null;
        view._skinNameBg = null;
        view._skinNameTxt = null;
        view._attrBg = null;
        view._bottombg = null;
        view._skinAddTxt1 = null;
        view._skinAddTxt2 = null;
        view._skinAddTxt3 = null;
        view._skinAddTxt4 = null;
        view._haveTxt = null;
        view._list = null;
        App.MessageHelper.removeEventListener('levelup', view.rerfreshLevelUp, view);
        view._skinArr = [];
        view._switchDelta = 0;
        view._infoGroup = null;
        view._tipTxt = null;
        App.MessageHelper.removeNetMessage(NetRequestConst.REQUST_SERVANT_UPSKINAURA,view.rerfreshLevelUp,this);
		super.dispose();
	}
}