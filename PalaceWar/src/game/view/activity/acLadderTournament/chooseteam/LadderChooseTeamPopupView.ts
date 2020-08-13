class LadderChooseTeamPopupView extends PopupView
{  
    private _powerText:BaseTextField= null;
    private _sids:string[] = [];

    private _buffText:BaseTextField= null;
    private _drumBtn :BaseLoadBitmap = null;
    private _addBtn:BaseButton = null;

    private _topIcons:LadderTeamServantIcon[] = [];
    private _confirmBtn2:BaseButton = null;
    
    public constructor(){
        super();
    }

    private get type():number
    {
        return this.param.data.type;
    }

    protected getResourceList():string[]{
        
        return super.getResourceList().concat([
            "ladderteam_bg"+this.type,"ladder_infobg","alliance_taskwotdbg1",
            "countrywarrewardview_itembg",'wifebattleyonglelistbg',
            "ladderteam_add", "activity_fnt","ladderteam_numbg",
        ]);
    }

    // 标题背景名称
	protected getTitleBgName():string
	{
		return null;
    }
    
        // 背景图名称
	protected getBgName():string{
		return "ladder_infobg";
    }

    protected getTitleStr():string
	{
		return null;
    }

    // 弹框面板宽度，高度动态计算
	protected getShowWidth():number
	{
		return 640;
    }
    
    private get cfg() : Config.AcCfg.LadderTournamentCfg{
        return Config.AcCfg.getCfgByActivityIdAndCode(this.aid, this.code);
    }

    private get vo() : AcLadderTournamentVo{
        return <AcLadderTournamentVo>Api.acVoApi.getActivityVoByAidAndCode(this.aid, this.code);
    }

    private get acTivityId() : string{
        return `${this.aid}-${this.code}`;
    }
    
    private get aid() : string{
        return `${this.param.data.aid}`;
    }

    private get code() : string{
        return `${this.param.data.code}`;
    }

    protected getBgExtraHeight():number
	{
		return 20;
    }
    
    protected resetBgSize():void
	{
        super.resetBgSize();
        this.closeBtn.x = 560;
        this.closeBtn.y = 30+(GameConfig.stageHeigth-960)/2;
    }

    public initView()
    {   
        this._sids = Api.laddertournamentVoApi.getSidsByTeam(this.type);

        this.viewBg.width = this.getShowWidth();
        
        let view = this;
        App.MessageHelper.addEventListener(MessageConst.MESSAGE_LATTERTOURNAMENT_CLOSE,view.hide,view);
        App.MessageHelper.addEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_LT_ADDBUFF),this.refreshCallback,this);


        let topbg = BaseBitmap.create("ladderteam_bg"+this.type);
        topbg.setPosition(this.viewBg.width/2-topbg.width/2,-50);
        view.addChildToContainer(topbg);

        let contentBg = BaseBitmap.create("public_9_bg44");
		contentBg.width = 536;
		contentBg.height = 450;
        contentBg.setPosition(this.viewBg.width/2-contentBg.width/2,topbg.y+topbg.height+8);
        view.addChildToContainer(contentBg);
        
        let confirmBtn = ComponentManager.getButton(ButtonConst.BTN_BIG_YELLOW,"acLadder_gowar_confirm",this.confirmHandle,this);
        confirmBtn.setPosition(this.viewBg.width/2-confirmBtn.width/2,contentBg.y+contentBg.height+10);
        view.addChildToContainer(confirmBtn);
        this._confirmBtn2 = confirmBtn;

        let topdescbg = BaseBitmap.create("alliance_taskwotdbg1");
        topdescbg.width = 540;
        topdescbg.height = 58;
        topdescbg.setPosition(this.viewBg.width/2-topdescbg.width/2,30);
        this.addChildToContainer(topdescbg);

        let paramstr = LanguageManager.getlocal("servantInfo_speciality"+this.type);
        let topdesc = ComponentManager.getTextField(LanguageManager.getlocal("acLadder_team_topdesc",[paramstr]), 20, TextFieldConst.COLOR_LIGHT_YELLOW);
		topdesc.setPosition(topdescbg.x+topdescbg.width/2-topdesc.width/2,topdescbg.y+8);
        this.addChildToContainer(topdesc);

        let powerDesc = ComponentManager.getTextField(LanguageManager.getlocal("acLadder_team_power"+this.type,[String(this.getTotalPower())]), 20, TextFieldConst.COLOR_LIGHT_YELLOW);
        powerDesc.width = 540;
        powerDesc.textAlign = egret.HorizontalAlign.CENTER;
        powerDesc.setPosition(topdescbg.x+topdescbg.width/2-powerDesc.width/2,topdesc.y+topdesc.height+6);
        this.addChildToContainer(powerDesc);
        this._powerText = powerDesc;

        let buffbg = BaseBitmap.create("countrywarrewardview_itembg");
        buffbg.width = 480;
        buffbg.height = 38;
        buffbg.setPosition(this.viewBg.width/2-buffbg.width/2,200);
        this.addChildToContainer(buffbg);

        let buffer = ComponentManager.getTextField("0", 20, TextFieldConst.COLOR_LIGHT_YELLOW);
        buffer.width = 440;
        buffer.textAlign = egret.HorizontalAlign.CENTER;
        buffer.setPosition(buffbg.x+buffbg.width/2-buffer.width/2,buffbg.y+buffbg.height/2-buffer.height/2);
        this.addChildToContainer(buffer);
        this._buffText = buffer;

        this._drumBtn = BaseLoadBitmap.create("itemicon2282");//ComponentManager.getButton("itemicon2282",null,this.addBuffHandle,this,null,1);
        // this._drumBtn.setScale(0.5)
        this._drumBtn.width = 50;
        this._drumBtn.height = 50;
        this._drumBtn.setPosition(buffbg.x-20,buffbg.y+buffbg.height/2-25);
        this.addChildToContainer(this._drumBtn);
        this._drumBtn.addTouchTap(this.addBuffHandle,this);

        this._addBtn = ComponentManager.getButton("ladderteam_add",null,this.addBuffHandle,this,null,1);
        this._addBtn.setPosition(buffbg.x-20,buffbg.y+buffbg.height/2-this._addBtn.height/2);
        this.addChildToContainer(this._addBtn);
        
        

        //门客icon
        let posx = (this.viewBg.width-507)/2;
        let poxy = topdescbg.y+topdescbg.height+8;
        for (let i = 0 ; i<5; i++)
        {
            let oneServant = new LadderTeamServantIcon();
            oneServant.init(i+1,this.deleteServant,this);
            oneServant.setPosition(posx+103*i,poxy);
            this.addChildToContainer(oneServant);

            oneServant.setServant(this._sids[i],false);
            this._topIcons.push(oneServant);
        }

        //门客列表
        let sids = Api.servantVoApi.getServantInfoIdListByProperty(this.type);
        let tmpRect =  new egret.Rectangle(0,0,contentBg.width-6,contentBg.height-6);
		let scrollList = ComponentManager.getScrollList(LadderChooseTeamItem,sids,tmpRect,{type:this.type,o:this,f:this.addServant,f2:this.deleteServantBySid});
		scrollList.setPosition(contentBg.x+3,contentBg.y+3)
        view.addChildToContainer(scrollList); 
        scrollList.bounces = false;

        this.resetBuff();

        if (this.getServantCount()<5)
        {
            App.DisplayUtil.changeToGray(this._confirmBtn2);
        }
        else
        {
            App.DisplayUtil.changeToNormal(this._confirmBtn2);
        }
    }

    private deleteServant(idx:number):void
    {   
        this._sids.splice(idx-1,1,null);
        this.resetAllIcons();
    }

    private deleteServantBySid(sid:string):void
    {   
        for (let i=0 ;i <this._sids.length; i++)
        {
            if (this._sids[i] == sid)
            {
                this._sids.splice(i,1,null);
                break;
            }
        }
        this.resetAllIcons();
    }

    private addServant(sid:string):void
    {   
        if (this.getServantCount() >= 5)
        {   
            App.CommonUtil.showTip(LanguageManager.getlocal("acLadder_team_max"));
            return ;
        }
        
        this.insertServant(sid);
        this.resetAllIcons();
    }

    private insertServant(sid:string):void
    {
        for (let i=0 ;i <this._sids.length; i++)
        {
            if (this._sids[i] == null)
            {
                this._sids.splice(i,1,sid);
                return;
            }
        }
        this._sids.push(sid);
    }

    private resetAllIcons():void
    {   
        for (let i = 0 ; i<5; i++)
        {   
            let oneServant = this._topIcons[i];
            oneServant.setServant(this._sids[i]);
        }
        this.resetPower();

        if (this.getServantCount()<5)
        {
            App.DisplayUtil.changeToGray(this._confirmBtn2);
        }
        else
        {
            App.DisplayUtil.changeToNormal(this._confirmBtn2);
        }

        App.MessageHelper.dispatchEvent(MessageConst.MESSAGE_LATTERTOURNAMENT_TEAM_CHOOSE,this._sids);
    }

    private resetBuff():void
    {
        let bufftimes = Api.laddertournamentVoApi.getBuffTimes(this.type);
        if (bufftimes>0)
        {
            this._drumBtn.visible = true;
            this._addBtn.visible = false;
            let buffvalue = this.cfg.getBuffCfg().atkUp *100;
            this._buffText.text = LanguageManager.getlocal("acLadder_team_buff_effect",[String(buffvalue),String(bufftimes)]);

            for (let i = 0 ; i<5; i++)
            {   
                let oneServant = this._topIcons[i];
                oneServant.setBuff();
            }
        }
        else
        {   
            let buffCfg = this.cfg.buffList["1"];
            if (Api.itemVoApi.getItemNumInfoVoById(buffCfg.needItem)>0)
            {
                App.CommonUtil.addIconToBDOC( this._addBtn);
            }
            this._drumBtn.visible = false;
            this._addBtn.visible = true;
            this._buffText.text = LanguageManager.getlocal("acLadder_team_buff_empty");
        }
    }

    private addBuffHandle():void
    {
        let buffCfg = this.cfg.buffList["1"];
        if (Api.itemVoApi.getItemNumInfoVoById(buffCfg.needItem)<=0)
        {
            App.CommonUtil.showTip(LanguageManager.getlocal("itemNumNotEnough"));
            return;
        }

        ViewController.getInstance().openView(ViewConst.POPUP.LADDERITEMUSEPOPUPVIEW,{type:this.type});

    }

    private getServantCount():number
    {
        let count = 0;
        for (let i=0; i<this._sids.length; i++)
        {   
            if (this._sids[i])
            {
                count++;
            }
        }
        return count;
    }

    private getTotalPower():number
    {
        let power = 0;
        for (let i=0; i<this._sids.length; i++)
        {   
            if (this._sids[i])
            {
                let servantvo = <ServantInfoVo>Api.servantVoApi.getServantObj(this._sids[i]);
                if (this.type == 1)
                {
                    power += servantvo.attrVo.forceTotal;
                }
                else if (this.type == 2)
                {
                    power += servantvo.attrVo.brainsTotal;
                }
                else if (this.type == 3)
                {
                    power += servantvo.attrVo.politicsTotal;
                }
                else if (this.type == 4)
                {
                    power += servantvo.attrVo.charmTotal;
                }
            }
            
        }
        return power;
    }

    private resetPower():void
    {
        this._powerText.text = LanguageManager.getlocal("acLadder_team_power"+this.type,[String(this.getTotalPower())]);
    }

    private confirmHandle():void
    {   
        if (this.vo.checkIsInEndShowTime()) {
			App.CommonUtil.showTip(LanguageManager.getlocal("acPunishEnd"));
			return;
		}

        if (this.getServantCount()<5)
        {   
            App.CommonUtil.showTip(LanguageManager.getlocal("acLadder_team_less"));
            return;
        }
        this.request(NetRequestConst.REQUEST_LT_SELECTSERVANT,{team:this.type, sids:this._sids,activeId:this.acTivityId});
    }

    protected receiveData(data: { ret: boolean, data: any }): void {
		let rData:any=data.data;
		if(data.ret==false)
		{
			return;
		}
		if(rData.cmd==NetRequestConst.REQUEST_LT_SELECTSERVANT)
		{   
            App.CommonUtil.showTip(LanguageManager.getlocal("acLadder_team_success"));
			this.hide();
            NetManager.request(NetRequestConst.REQUEST_LT_GETRANK,{activeId:Api.laddertournamentVoApi.aidAndCode});
		}
		
    }
    
    private refreshCallback(evt : egret.Event):void
    {   
        let rData = evt.data.data.data;
        if(!rData){
            return;
        }
		if(rData = evt.data.data.ret >=0 && evt.data.data.cmd==NetRequestConst.REQUEST_LT_ADDBUFF)
		{   
            App.CommonUtil.showTip(LanguageManager.getlocal("acLadder_addbuff_success"));
		}
        this.resetBuff();
    }

    public tick() {
        if (Api.laddertournamentVoApi.checkIsTruce())
        {   
            this.hide();
        }
    }

    public dispose()
    {   
        App.MessageHelper.removeEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_LT_ADDBUFF),this.refreshCallback,this);
        App.MessageHelper.removeEventListener(MessageConst.MESSAGE_LATTERTOURNAMENT_CLOSE,this.hide,this);
        this._powerText= null;
        this._sids.length = 0;
        this._buffText = null;
        this._drumBtn = null;
        this._addBtn = null;
        this._topIcons.length = 0;
        this._confirmBtn2 = null;

        super.dispose();
    }
}