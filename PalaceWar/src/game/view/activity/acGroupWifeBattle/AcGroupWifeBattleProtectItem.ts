class AcGroupWifeBattleProtectItem extends ScrollListItem
{
    private param:any;
    public constructor(){
		super();
    }
    protected getUiCode() : string
    {
        let code = ``;
        switch(Number(this.code))
        {
            default:
                code = `1`;
                break;
        }
        return code;
    }
	private get cfg() : Config.AcCfg.GroupWifeBattleCfg{
        return Config.AcCfg.getCfgByActivityIdAndCode(this.aid, this.code);
	}
	
    private get vo() : AcGroupWifeBattleVo{
        return <AcGroupWifeBattleVo>Api.acVoApi.getActivityVoByAidAndCode(this.aid, this.code);
    }

    private get code():string{
        return this.param.code;
    }

    private get aid():string{
        return this.param.aid;
	}
    protected initItem(index: number, data: any, param:any) 
    {
        this.param = param;
        let view = this;

        let code = view.getUiCode();

		let bg = BaseBitmap.create("public_popupscrollitembg");
		bg.width = 520;
		bg.height = 120;
		view.addChild(bg);

		let iconCon = new BaseDisplayObjectContainer();
        let head = Api.playerVoApi.getPlayerCircleHead(data.pic,data.ptitle);
		iconCon.addChild(head);
        view.addChild(iconCon);
		iconCon.setPosition(30,bg.height/2-iconCon.height/2);

		let nametxt = ComponentManager.getTextField(data.name, 20, TextFieldConst.COLOR_WARN_YELLOW2);
		App.DisplayUtil.setLayoutPosition(LayoutConst.lefttop, nametxt, bg, [iconCon.x+iconCon.width,20]);
		view.addChild(nametxt);

		let ranktxt = ComponentManager.getTextField(LanguageManager.getlocal(`acGroupWifeBattleProtectItemRank-${code}`, [data.rank+""]), 20, TextFieldConst.COLOR_BROWN);
		ranktxt.setPosition(nametxt.x, nametxt.y+nametxt.height+15);
		view.addChild(ranktxt);

		let scoretxt = ComponentManager.getTextField(LanguageManager.getlocal(`acGroupWifeBattleProtectItemScore-${code}`, [data.score+""]), 20, TextFieldConst.COLOR_BROWN);
		scoretxt.setPosition(ranktxt.x, ranktxt.y+ranktxt.height+10);
		view.addChild(scoretxt);

        let btn = ComponentManager.getButton(ButtonConst.BTN_NORMAL_YELLOW, `acGroupWifeBattleProtectBtnTxt-${code}`, ()=>
        {
            if(view.vo.getCurperiod() > 2)
            {
                App.CommonUtil.showTip(LanguageManager.getlocal(`acGroupWifeBattleCDTxt14-${code}`));
                return;
            }            
            if(view.vo.isWaiting())
            {
                App.CommonUtil.showTip(LanguageManager.getlocal(`acGroupWifeBattleTip18-${code}`));
                return;
            }            
            if(param.mytimes <= 0)
            {
                App.CommonUtil.showTip(LanguageManager.getlocal(`acGroupWifeBattleProtectNoEnoughTimes-${code}`));
                return;
            }
            if(!data.ispro && data.times > 0)
            {
                if(param.mytimes > 0)
                {
                    if(param.itemnum > 0)
                    {
                        let message: string = LanguageManager.getlocal(`acGroupWifeBattleProtectSure-${code}`,[data.name]);
                        ViewController.getInstance().openView(ViewConst.POPUP.CONFIRMPOPUPVIEW,{
                            msg : message,
                            title : "itemUseConstPopupViewTitle",
                            touchMaskClose : true,
                            callback : ()=>
                            {
                                if(view.vo.isWaiting())
                                {
                                    App.CommonUtil.showTip(LanguageManager.getlocal(`acGroupWifeBattleTip18-${code}`));
                                    return;
                                }
                                 NetManager.request(NetRequestConst.REQUST_ACTIVITY_GROUPWIFEBATTLE_PROTECT,{activeId:view.vo.aidAndCode,fuid:data.uid});
                            },
                            handler : this,
                            needClose : 1,
                            needCancel : true
                        });
                    }else
                    {
                        App.CommonUtil.showTip(LanguageManager.getlocal(`acGroupWifeBattleProtectNoItem-${code}`));
                    }
                }
            }
        }, this);
        btn.setPosition(bg.width-btn.width-30,bg.height/2-btn.height/2-10);
        this.addChild(btn);

        if(data.ispro)
        {
            btn.visible = false;

            let idtxt = ComponentManager.getTextField(LanguageManager.getlocal(`acGroupWifeBattleProtectProID-${code}`, [data.pid]), 20, TextFieldConst.COLOR_BLACK);
            idtxt.textAlign = egret.HorizontalAlign.CENTER;
            idtxt.lineSpacing = 3;
            idtxt.setPosition(btn.x+btn.width/2-idtxt.width/2, bg.height/2-idtxt.height/2);
            view.addChild(idtxt);            
        }else
        {
            if(data.times > 0)
            {
                // btn.visible = param.mytimes > 0;
                btn.setGray(param.mytimes <= 0);

                let lefttimestxt = ComponentManager.getTextField(LanguageManager.getlocal(`acGroupWifeBattleProtectLeftTimes-${code}`, [data.times+""]), 20, TextFieldConst.COLOR_BLACK);
                lefttimestxt.setPosition(btn.x+btn.width/2-lefttimestxt.width/2, btn.y+btn.height+5);
                view.addChild(lefttimestxt);
            }else
            {
                btn.visible = false;

                let maxtxt = ComponentManager.getTextField(LanguageManager.getlocal(`acGroupWifeBattleProtectTimesMax-${code}`), 20, TextFieldConst.COLOR_BLACK);
                maxtxt.setPosition(btn.x+btn.width/2-maxtxt.width/2, bg.height/2-maxtxt.height/2);
                view.addChild(maxtxt);                
            }
        }
    }

    public dispose():void{
		let view = this;
        super.dispose();
    }
}