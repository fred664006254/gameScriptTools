/**
 * 门客皮肤光环
 * author dmj
 * date 2017/9/28
 * @class ServantSelectedScrollItem
 */
class ServantSkinAuraItem extends ScrollListItem
{
	public constructor(){
		super();
    }
    
    private _data : any;
    private _levelbg  : BaseBitmap = null;
    private _levelTxt : BaseTextField = null;
    private _curEffTxt : BaseTextField = null;
    private _nextEffTxt : BaseTextField = null;
    private _needTxt : BaseTextField = null;
    private _btn : BaseButton = null;
    private _icon : BaseLoadBitmap = null;
    private _itemIcon : BaseLoadBitmap = null;

	protected initItem(index:number,data:any,itemparam){
        let view = this;
        view._data = data;
        view.width = 520;
        view.height = 145 + view.getSpaceY();
        let bg = BaseBitmap.create('public_9_bg14');
        bg.width = 520;
        bg.height = view.height - view.getSpaceY();
        //public_9_managebg
        view.addChild(bg);

        //icon
        let icon = BaseLoadBitmap.create(`servant_skinaura_Icon${data.id}`);
        icon.width = icon.height = 108;
        App.DisplayUtil.setLayoutPosition(LayoutConst.leftverticalCenter, icon, bg, [12,0]);
        view.addChild(icon);
        view._icon = icon;

        let levelbg = BaseBitmap.create('public_9_managebg');
        levelbg.width = 381;
        levelbg.height = 75;
        //public_9_managebg
        App.DisplayUtil.setLayoutPosition(LayoutConst.lefttop, levelbg, bg, [125,15]);
        view._levelbg = levelbg;
        view.addChild(levelbg);

        let levelTxt = ComponentManager.getTextField('', 20, TextFieldConst.COLOR_BLACK);
        view._levelTxt = levelTxt;

        let servantCfg = Config.ServantCfg.getServantItemById(data.servantId);
        let skincfg = Config.ServantskinCfg.getServantSkinItemById(data.skinId);

        let tmp = skincfg.aura[data.id];
        let curvalue = '0';
        let nextvalue = '0';

        let curEffTxt = ComponentManager.getTextField('', 20, TextFieldConst.COLOR_BLACK);
        view._curEffTxt = curEffTxt;
        let nextEffTxt = ComponentManager.getTextField('', 20, TextFieldConst.COLOR_BLACK);
        view._nextEffTxt = nextEffTxt;
        let needTxt = null;

        let servant:ServantInfoVo = Api.servantVoApi.getServantObj(data.servantId);
        let skinvo : ServantSkinVo = servant.getSkinInfobyId(data.skinId);
        let curLevel = skinvo ? skinvo.getSkinAuraLv(data.id - 1) : 0;

        if(curLevel + 1 > tmp.maxLv){
            //提示升到满级
            needTxt = ComponentManager.getTextField('', 20, TextFieldConst.COLOR_WARN_RED2);
        }
        else{
            //升级所需
            needTxt = ComponentManager.getTextField('', 20, TextFieldConst.COLOR_BLACK);
        }

        let itemcfg = Config.ItemCfg.getItemCfgById(tmp.growNeed);
        let itemIcon = BaseLoadBitmap.create(itemcfg.icon);
        itemIcon.width = itemIcon.height = 100;
        itemIcon.setScale(0.37);
        view._itemIcon = itemIcon;
        view.addChild(itemIcon);

        let buyBtn = ComponentManager.getButton(ButtonConst.BTN_SMALL_YELLOW, 'servantInfoLevelup', ()=>{
            let haveNum = Api.itemVoApi.getItemNumInfoVoById(skincfg.aura[data.id].growNeed);
            if(servant.getOwnSkinIdList().indexOf(data.skinId) == -1){
                App.CommonUtil.showTip(LanguageManager.getlocal("skin_notOwnTip"));
                return;
            }
            let tmpskinvo : ServantSkinVo = servant.getSkinInfobyId(data.skinId);
            let curLevel2 = tmpskinvo ? tmpskinvo.getSkinAuraLv(data.id - 1) : 0;
            if(haveNum >= tmp.growNumNeed[curLevel2]){
                 //发送消息
                 NetManager.request(NetRequestConst.REQUST_SERVANT_UPSKINAURA,{
                    servantId : data.servantId, 
                    skinId : data.skinId, 
                    auraId : data.id, 
                 });
            }
            else{
                App.CommonUtil.showTip(LanguageManager.getlocal("acPunishBuyTitle"));
            }
        }, view);

        let haveNum = Api.itemVoApi.getItemNumInfoVoById(skincfg.aura[data.id].growNeed);
        buyBtn.setGray((haveNum < tmp.growNumNeed[curLevel]) || servant.getOwnSkinIdList().indexOf(data.skinId) == -1);
        buyBtn.setScale(0.8);
        App.DisplayUtil.setLayoutPosition(LayoutConst.righttop, buyBtn, levelbg, [10,levelbg.height + 7]);
        view.addChild(buyBtn);
        view._btn = buyBtn;

        view._needTxt = needTxt;

        view.addChild(levelTxt);
        view.addChild(curEffTxt);
        view.addChild(nextEffTxt);
        view.addChild(needTxt);
        view.freshView();
    }

    public freshBtn():void{
        let view = this;
        let data = view._data;
        let skincfg = Config.ServantskinCfg.getServantSkinItemById(data.skinId);
        let tmp = skincfg.aura[data.id];
        let servant:ServantInfoVo = Api.servantVoApi.getServantObj(data.servantId);
        let skinvo : ServantSkinVo = servant.getSkinInfobyId(data.skinId);

        let curLevel = skinvo ? skinvo.getSkinAuraLv(data.id - 1) : 0;
        let haveNum = Api.itemVoApi.getItemNumInfoVoById(skincfg.aura[data.id].growNeed);
        view._btn.setGray(haveNum < tmp.growNumNeed[curLevel] || servant.getOwnSkinIdList().indexOf(data.skinId) == -1);
    }

    public refreshItem():void{
        let view = this;
        view.freshView();
        let bookIcon = view._icon;
        let upgradeClip = ComponentManager.getCustomMovieClip("servant_book_lvup",7,100);
            // upgradeClip.setScale(1.3);
            upgradeClip.x = -47;
            let deltaY = -139;
            upgradeClip.y = deltaY;
            view.addChild(upgradeClip);
            upgradeClip.playWithTime(1);
            let tmpNode = view;
            egret.Tween.get(upgradeClip).wait(700).to({y: deltaY},500).call(function(){
                tmpNode.removeChild(upgradeClip);
                upgradeClip = null;
            },this);


            let servant_book_lvup_word = BaseBitmap.create("servant_book_lvup8");
            servant_book_lvup_word.anchorOffsetX = servant_book_lvup_word.width/2;
            servant_book_lvup_word.anchorOffsetY = servant_book_lvup_word.height/2;
            App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterverticalCenter, servant_book_lvup_word, bookIcon);
            let wordY = servant_book_lvup_word.y;
            servant_book_lvup_word.setScale(0.3);
            view.addChild(servant_book_lvup_word);
            egret.Tween.get(servant_book_lvup_word).to({scaleX:1,scaleY:1},160).wait(800).to({y:wordY,alpha:0},500).call(()=>{
                tmpNode.removeChild(servant_book_lvup_word);
                servant_book_lvup_word = null;
            },this);

            let servant_book_lvup_light = BaseBitmap.create("servant_book_lvup_light");
            servant_book_lvup_light.anchorOffsetX = servant_book_lvup_light.width/2;
            servant_book_lvup_light.anchorOffsetY = servant_book_lvup_light.height/2;
            App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterverticalCenter, servant_book_lvup_light, bookIcon);
            view.addChild(servant_book_lvup_light);
            servant_book_lvup_light.setScale(0);
            egret.Tween.get(servant_book_lvup_light,{loop:false}).to({scaleX:0.3,scaleY:0.3},40).to({scaleX:1,scaleY:1},40).to({scaleX:1.4,scaleY:0.75,alpha:0},40).call(()=>{
                tmpNode.removeChild(servant_book_lvup_light);
                servant_book_lvup_light = null;
            },this);
    }

    private freshView():void{
        let view = this;
        let data = view._data;

        let levelTxt = view._levelTxt;
        let levelbg = view._levelbg;
        let curEffTxt = view._curEffTxt;
        let nextEffTxt = view._nextEffTxt;
        let needText = view._needTxt;

        let servantCfg = Config.ServantCfg.getServantItemById(data.servantId);
        let skincfg = Config.ServantskinCfg.getServantSkinItemById(data.skinId);
        let tmp = skincfg.aura[data.id];
        let curvalue = '0';
        let nextvalue = '0';

        let servant:ServantInfoVo = Api.servantVoApi.getServantObj(data.servantId);
        let skinvo : ServantSkinVo = servant.getSkinInfobyId(data.skinId);
        let curLevel = skinvo ? skinvo.getSkinAuraLv(data.id - 1) : 0;

        if(tmp.growAtt >= 1){
            curvalue = App.MathUtil.strip(tmp.growAtt * curLevel) + '';
            nextvalue = App.MathUtil.strip(tmp.growAtt * (curLevel + 1)) + '';
        }
        else{
            let tmpnum = tmp.growAtt * 100 * curLevel;
            curvalue = App.MathUtil.strip(tmpnum) + '%';
            tmpnum = tmp.growAtt * 100 * (curLevel + 1);
            nextvalue = App.MathUtil.strip(tmpnum) + '%';
        }

        levelTxt.text = LanguageManager.getlocal('discussServantLevel',[curLevel.toString()]);
        curEffTxt.text =  LanguageManager.getlocal('servantskincureff',[servantCfg.name, LanguageManager.getlocal(`servantInfo_speciality${data.id}`), String(TextFieldConst.COLOR_QUALITY_RED), curvalue]);
        if(curLevel + 1 > tmp.maxLv){
            nextEffTxt.text = LanguageManager.getlocal('servantskinnextmaxlevel',[String(TextFieldConst.COLOR_BLACK)]);
            //提示升到满级
            needText.text = LanguageManager.getlocal('servantskinmaxlevel');
            needText.textColor = TextFieldConst.COLOR_WARN_RED2;
            App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, needText, levelbg, [0,levelbg.height + 15]);
            view._btn.visible = view._itemIcon.visible = false;
        }
        else{
            nextEffTxt.text = LanguageManager.getlocal('servantskinnexteff',[servantCfg.name, LanguageManager.getlocal(`servantInfo_speciality${data.id}`), String(TextFieldConst.COLOR_WARN_GREEN2), nextvalue]);
            //升级所需
            let itemcfg = Config.ItemCfg.getItemCfgById(tmp.growNeed);
            needText.text = LanguageManager.getlocal('servantskinlevelupneed', [String(TextFieldConst.COLOR_QUALITY_BLUE), tmp.growNumNeed[curLevel]]);
            
            App.DisplayUtil.setLayoutPosition(LayoutConst.lefttop, needText, levelbg, [55,levelbg.height + 15]);
            App.DisplayUtil.setLayoutPosition(LayoutConst.leftverticalCenter, view._itemIcon, needText, [needText.textWidth + 5, 0]);
            view._btn.visible = view._itemIcon.visible = true;
        }
        let tmpY =  (levelbg.height - levelTxt.textHeight - curEffTxt.textHeight - nextEffTxt.textHeight) / 4;
        App.DisplayUtil.setLayoutPosition(LayoutConst.lefttop, levelTxt, levelbg, [10,tmpY]);
        App.DisplayUtil.setLayoutPosition(LayoutConst.lefttop, curEffTxt, levelTxt, [0,levelTxt.textHeight + tmpY]);
        App.DisplayUtil.setLayoutPosition(LayoutConst.lefttop, nextEffTxt, curEffTxt, [0,curEffTxt.textHeight + tmpY]);

        // if(Api.servantVoApi.isShowAuralevelUpRedForEnter(data.servantId)){
        //     App.CommonUtil.addIconToBDOC(view._btn);
        // }else{
        //     App.CommonUtil.removeIconFromBDOC(view._btn);
        // }
    }
	
	public getSpaceY():number{
		return 0;
    }
    
	public dispose():void{
        let view = this;
        view._data = null;
        view._levelbg = null;
        view._levelTxt = null;
        view._curEffTxt = null;
        view._nextEffTxt = null;
        view._needTxt = null;
        view._btn = null;
        view._icon = null;
        view._itemIcon = null;
        super.dispose();
    }
}