class WifeChatSelectItem  extends ScrollListItem
{
    private redPot : BaseBitmap = null;
    
    public constructor()
    {
        super();
    }

    protected initItem(index:number,data:any){
        let view = this;
        view.width = 469;
        view.height = 125;

        let bg = BaseBitmap.create(`wifeskinjuqingitembg${data.unlock ? 1 : 2}`);
        view.addChild(bg);

        let line = BaseBitmap.create(`public_line3`);
        let name = ComponentManager.getTextField(LanguageManager.getlocal(`wifeskin${data.skinId}_${data.rewardid}`), 28, TextFieldConst.COLOR_WARN_YELLOW2);

        line.width = name.textWidth + 300;
        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterverticalCenter, line, bg);
        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterverticalCenter, name, line);

        view.addChild(line);
        view.addChild(name);
        if(data.unlock && data.isnew){
            let isnew = BaseBitmap.create(`wifeskinleveltip`);
			isnew.setScale(0.6);
			App.DisplayUtil.setLayoutPosition(LayoutConst.rightverticalCenter, isnew, bg, [20,0]);
            view.addChild(isnew); 
            view.redPot = isnew;
        }

        view.addTouchTap(()=>{
            let skincfg = Config.WifeskinCfg.getWifeCfgById(data.skinId);
            let wifeSkinVo = Api.wifeSkinVoApi.getWifeskinInfoVoById(skincfg.wifeId);
            let lv = data.lv;
            let id = skincfg.levelUp[lv - 1].levelUpUnlock;
            let cfg = Config.WifeconversationCfg.getConversatiById(id);
            if(data.unlock){
                if(cfg){
                    ViewController.getInstance().openView(ViewConst.COMMON.WIFECHATAVGVIEW, data);
                }
                else{
                    App.CommonUtil.showTip(LanguageManager.getlocal(`没有配置`));
                }
            }
            else{
                App.CommonUtil.showTip(LanguageManager.getlocal(`wifeskinlvunlock3`));
            }

            
            
        }, view);
    }

    public getSpaceX():number
	{
		return 0;
	}

	public getSpaceY():number
	{
		return 0;
	}

    public dispose():void
	{
        let view = this;
        view.removeTouchTap();
        view.redPot = null;
        super.dispose();
	}
}