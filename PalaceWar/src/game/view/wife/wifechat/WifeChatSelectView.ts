/**
 * author:qianjun
 * desc:飞鸽传书选择界面
*/
class WifeChatSelectView extends PopupView{
    private _list : ScrollList = null;
	public constructor() {
		super();
	}

	protected getResourceList():string[]{
		return super.getResourceList().concat([
            `wifeskinjuqingpopbg`,`wifeskinleveltip`,`battlepassline-1`
		]);
    }

    protected getBgName():string{
        return `wifeskinjuqingpopbg`;
    }

    protected getCloseBtnName():string{
        return null;
    }

    protected isTouchMaskClose():boolean{
        return true;
    }

	protected initView():void{	
        let view = this;
        App.MessageHelper.addEventListener(MessageConst.MESSAGE_WIFECHAT_END,view.getrewardCallback,view);
        let skinId = view.param.data.skinId;

        let title = BaseBitmap.create("wifeskinjuqingtitle");
		App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, title, view.viewBg, [5,-title.height+30]);
        view.addChildToContainer(title);

        let rect = egret.Rectangle.create();
        rect.setTo(0,0,469,430);

        let arr = [];
        let cfg = Config.WifechatCfg.conversation;
        let skinlv = Api.wifeSkinVoApi.getWifeSkinLV(skinId);
        let skincfg = Config.WifeskinCfg.getWifeCfgById(skinId);
        let wifeSkinVo = Api.wifeSkinVoApi.getWifeskinInfoVoById(skincfg.wifeId);

        for(let i in cfg){
            let unit = cfg[i];
            if(unit && unit.unlockType && unit.unlockType == 1){
                let lv = Number(i) + 1;
                let curid = wifeSkinVo.getCuravgId(view.param.data.skinId, lv);
                let id = skincfg.levelUp[lv - 1].levelUpUnlock;
                let concfg = Config.WifeconversationCfg.getConversatiById(id);
                if(concfg){
                    arr.push({
                        lv : lv,
                        unlock : skinlv >= Number(unit.skinLv),
                        skinId : skinId,
                        rewardid : `${skincfg.levelUp[unit.skinLv - 1].levelUpUnlock}`,
                        isnew : Object.keys(concfg).length > curid && !wifeSkinVo.havereset(view.param.data.skinId, lv)
                    });
                }
            }
        }
        let list = ComponentManager.getScrollList(WifeChatSelectItem, arr, rect);
        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, list, title, [0,title.height + 15]);
        view.addChildToContainer(list);
        list.bounces = false;
        view._list = list;

        let line = BaseBitmap.create(`battlepassline-1`);
        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, line, list, [0,list.height]);
        view.addChildToContainer(line);
        
        let tipTxt = ComponentManager.getTextField(LanguageManager.getlocal(`wifechattip`), 20, TextFieldConst.COLOR_WARN_RED2);
        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, tipTxt, title, [0,title.height + 470]);
        view.addChildToContainer(tipTxt);
    }

    private getrewardCallback():void{
        let view = this;
        let arr = [];
        let skinId = view.param.data.skinId;
        let cfg = Config.WifechatCfg.conversation;
        let skinlv = Api.wifeSkinVoApi.getWifeSkinLV(skinId);
        let skincfg = Config.WifeskinCfg.getWifeCfgById(skinId);
        let wifeSkinVo = Api.wifeSkinVoApi.getWifeskinInfoVoById(skincfg.wifeId);

        for(let i in cfg){
            let unit = cfg[i];
            if(unit && unit.unlockType && unit.unlockType == 1){
                let lv = Number(i) + 1;
                let curid = wifeSkinVo.getCuravgId(view.param.data.skinId, lv);
                let id = skincfg.levelUp[lv - 1].levelUpUnlock;
                let concfg = Config.WifeconversationCfg.getConversatiById(id);
                if(concfg){
                    arr.push({
                        lv : lv,
                        unlock : skinlv >= Number(unit.skinLv),
                        skinId : skinId,
                        rewardid : `${skincfg.levelUp[unit.skinLv - 1].levelUpUnlock}`,
                        isnew : Object.keys(concfg).length > curid && !wifeSkinVo.havereset(view.param.data.skinId,lv)
                    });
                }
            }
        }
        view._list.refreshData(arr);
    }

    protected getShowWidth():number{
		return 627;
    }

	protected getShowHeight():number{
        return 577;
    }

    protected getTitleStr():string{
        return null;
    }

	public dispose():void{
        let view = this;
        App.MessageHelper.removeEventListener(MessageConst.MESSAGE_WIFECHAT_END,view.getrewardCallback,view);
        view._list = null;
		super.dispose();
	}
}