/**
 * 更新有礼
 * @author weixiaozhe  2020.6.1
 */
class AcNewPackView extends PopupView {

    private _detailBtn:BaseButton=null;
    private aid:string;
	public constructor() 
	{
		super();
		this.aid=App.StringUtil.firstCharToLower(this.getClassName().replace("Ac","").replace("View",""));
	}    
    protected getTitleStr(): string {
        return null;
    }
    protected getTitleBgName(): string {
        return null;
    }  
    protected getBgName():string
    {
        return null;
    }
	protected getCloseBtnName():string
	{
		return null;
	}
    private getRwdCallback(event:egret.Event):void
    {
        let rData = event.data.data.data;
        if(!rData)
        {
            App.CommonUtil.showTip(LanguageManager.getlocal("time_error"));
            return;
        }
        if(rData.rewards)
        {
            // let rewardVoList = GameData.formatRewardItem(rData.rewards);
            // App.CommonUtil.playRewardFlyAction(rewardVoList);
            ViewController.getInstance().openView(ViewConst.POPUP.COMMONREWARDPOPUPVIEW,{"rewards":rData.rewards,"isPlayAni":true, "callback":null, "handler":null});
        }
    }
    
    public initView() 
    {
        App.MessageHelper.addNetMessage(MessageConst.MESSAGE_MODEL_ACTIVITY, this.refreshView, this);
        App.MessageHelper.addNetMessage(NetRequestConst.REQUEST_NEWPACK_GETREWARDS, this.getRwdCallback, this);

        let botbg = BaseBitmap.create("ac_newpackbg");
        botbg.x = GameConfig.stageWidth/2 - botbg.width/2;
        botbg.y = GameConfig.stageHeigth/2 - botbg.height/2 - 30;
        this.addChild(botbg);

        let wife = BaseBitmap.create("wife_skin_2071");
        wife.setScale(0.5);
        wife.x = -20;
        wife.y = botbg.y + 70;
        this.addChild(wife);

        var circle:egret.Shape=new egret.Shape();
        circle.graphics.beginFill(0x542020,1);
        circle.graphics.drawRect(wife.x+20,wife.y,wife.width*wife.scaleX,wife.height*wife.scaleY-55)
        circle.graphics.endFill();
        this.addChild(circle);
        wife.mask=circle;

        let nameImg = BaseBitmap.create("ac_newpacktitle");
        this.setLayoutPosition(LayoutConst.lefttop,nameImg,botbg,[50,-7]);
        this.addChild(nameImg);

        let descImg = BaseBitmap.create("ac_newpacktxt");
        this.setLayoutPosition(LayoutConst.horizontalCenterverticalCenter,descImg,botbg,[70,10]);
        this.addChild(descImg);

        let deskImg = BaseBitmap.create("ac_newpackdesk");
        this.setLayoutPosition(LayoutConst.horizontalCenterbottom,deskImg,botbg,[0,-30]);
        this.addChild(deskImg);

        let itembg = BaseBitmap.create("ac_newpackitembg");
        this.addChild(itembg);

		let rewards = this.cfg.getReward;
		let rewardIconList = GameData.getRewardItemIcons(rewards, true, false);
		let container:BaseDisplayObjectContainer = new BaseDisplayObjectContainer();
        let space = 5;
        let scale = 0.63;
        let right = itembg.x + itembg.width;
		for(let i = 0; i < rewardIconList.length; i++)
		{
            rewardIconList[i].setScale(scale);
			rewardIconList[i].x = i*rewardIconList[i].width*scale + i*space;	
			container.addChild(rewardIconList[i]);
		}
        itembg.width = container.width+10;
        this.setLayoutPosition(LayoutConst.rightbottom,itembg,deskImg,[60,45]);
		container.x = itembg.x + itembg.width/2 - container.width/2;
		container.y = itembg.y + itembg.height/2 - container.height/2;
		this.addChild(container);

        let botTxt = ComponentManager.getTextField(LanguageManager.getlocal("acNewPackDesc1"), 20);
        botTxt.setPosition(270,itembg.y - botTxt.height - 5);
        this.addChild(botTxt);

        let descTxt = ComponentManager.getTextField(LanguageManager.getlocal("acNewPackDesc3"), 18);
        descTxt.width = 300;
        descTxt.textAlign = egret.HorizontalAlign.CENTER;
        descTxt.lineSpacing = 20;
        descTxt.x = botTxt.x + botTxt.width/2 - descTxt.width/2;
        descTxt.y = descImg.y + 40;
        this.addChild(descTxt);

        descTxt.visible = this.vo.isGetReward() == 0;
        descImg.visible = !descTxt.visible;

        let closebtn = ComponentManager.getButton("ac_newpackclose", "", ()=>
        {
            this.hide();
        },this);
        closebtn.x = botbg.x + botbg.width - 52;
        closebtn.y = botbg.y + 53;
        this.addChild(closebtn);

        let rulebtn = ComponentManager.getButton(ButtonConst.BTN2_RULE, "", ()=>
        {
            let msg = LanguageManager.getlocal("acNewPackRule");
            ViewController.getInstance().openView(ViewConst.POPUP.RULEINFOPOPUPVIEW,msg);
        },this);
        rulebtn.x = 15;
        rulebtn.y = nameImg.y + 20;
        this.addChild(rulebtn);

        let detailBtn = ComponentManager.getButton(ButtonConst.BTN2_NORMAL_YELLOW, "", ()=>
        {
            let num = this.vo.isGetReward();
            if(this.vo.checkIsInEndShowTime() && num == -1)
            {
                App.CommonUtil.showTip(LanguageManager.getlocal("acPunishEnd"));
                return;
            }            
            if(num == 1)
            {
                this.request(NetRequestConst.REQUEST_NEWPACK_GETREWARDS,{activeId:this.vo.aidAndCode})
            }else if(num == 0)
            {
                App.CommonUtil.showTip(LanguageManager.getlocal("acNewPackTips"));
            }
        }, this);
        this.setLayoutPosition(LayoutConst.horizontalCenterbottom,detailBtn,deskImg,[0,-70]);
        this.addChild(detailBtn);
        this._detailBtn = detailBtn;
        this.refreshView();

        let botTxt2 = ComponentManager.getTextField(LanguageManager.getlocal("acNewPackDesc2"),18,TextFieldConst.COLOR_LIGHT_YELLOW);
        botTxt2.x = deskImg.x + deskImg.width/2 + 5;
        botTxt2.y = deskImg.y + deskImg.height-20;
        this.addChild(botTxt2);
    }
    private avgendCallback()
    {

    }

    //请求回调
    protected receiveData(data: { ret: boolean, data: any }): void 
    {
        if (!data.ret) 
        {
            App.CommonUtil.showTip(data.data.ret);
        }
        if (data.ret && data.data.cmd == NetRequestConst.REQUEST_AGGREGATION_GETINFO) 
        {          
        }
    }

    protected getResourceList(): string[] {
        let baseList = [
            "ac_newpacktitle",
            "ac_newpacktxt",
            "ac_newpackdesk",
            "ac_newpackbg",
            "ac_newpackclose",
            "ac_newpackitembg",
            "wife_skin_2071"
        ];
        return super.getResourceList().concat(baseList);
    }

    private refreshView():void
    {
        if (!this.vo)
        {
            return;
        }
        let num = this.vo.isGetReward();
        this._detailBtn.setText("acNewPackBtn1");
        if(num == 2)
        {
            this._detailBtn.setEnable(false);
            this._detailBtn.setText("acNewPackBtn2");
        }else if(num == 0)
        {
            this._detailBtn.setGray(true);
        }
    }
    private get cfg(): Config.AcCfg.NewPackCfg 
    {
        return Config.AcCfg.getCfgByActivityIdAndCode(this.aid, this.code);
    }

    private get vo(): AcNewPackVo {
        return <AcNewPackVo>Api.acVoApi.getActivityVoByAidAndCode(this.aid, this.code);
    }   
	protected get code():string
	{
		return this.param?this.param.data:"";
	}      
    public dispose(): void {
        super.dispose();
        App.MessageHelper.removeNetMessage(MessageConst.MESSAGE_MODEL_ACTIVITY, this.refreshView, this);   
        App.MessageHelper.removeNetMessage(NetRequestConst.REQUEST_NEWPACK_GETREWARDS, this.getRwdCallback, this);  
    }
}