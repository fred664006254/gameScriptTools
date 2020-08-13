/*
author : yanyuling
desc : 周年庆 登录有礼
*/

class AcOneYearSignView extends AcCommonView
{
	public constructor() 
	{
		super();
    }

    private _activityTimerText: BaseTextField = null;
	private _acCDTxt: BaseTextField = null;
	private _ruleText: BaseTextField = null;
    private _collectTxtList:BaseTextField[] = [];
    private _scrollContiner:BaseDisplayObjectContainer = undefined;
    private _reqDayIdx:number = undefined;
    private _rewardbgList:BaseBitmap[] = [];
    private _alphabgList:BaseBitmap[] = [];
    private _clip:CustomMovieClip = undefined;
	protected initView():void
	{ 
        App.MessageHelper.addEventListener(MessageConst.MESAAGE_ONESIGN_VO_CHANGE,this.refreshUIInfo,this);

        let titletxt = BaseBitmap.create("oneyearsign_txt");
        titletxt.x = GameConfig.stageWidth/2 - titletxt.width/2;
        titletxt.y = 5;
        this.addChild(titletxt);

		//顶部背景图片
		let forpeople_top: BaseLoadBitmap = BaseLoadBitmap.create('oneyearrank_topbg-1');
        forpeople_top.width = 640;
        forpeople_top.height = 146;
        this.addChildToContainer(forpeople_top);
        forpeople_top.y = 75;

        let flag = BaseBitmap.create("oneyear_flag");
        flag.x = GameConfig.stageWidth - flag.width-60;
        flag.y =  35;
        this.addChild(flag);

		//活动时间   
		this._activityTimerText = ComponentManager.getTextField("", 20, TextFieldConst.COLOR_LIGHT_YELLOW);
		this._activityTimerText.x = 15
		this._activityTimerText.y = 109-20;
		this._activityTimerText.text  = this.acVo.getAcLocalTime(true);
		this.addChildToContainer(this._activityTimerText);
		let deltaY = 5;

		//倒计时文本 
		let acCDTxt = ComponentManager.getTextField("", 20, TextFieldConst.COLOR_LIGHT_YELLOW);
		acCDTxt.text = LanguageManager.getlocal("acFourPeople_acCD", [""]);
		acCDTxt.x = this._activityTimerText.x;//forpeople_top.x + forpeople_top.width - 220;//this._activityTimerText.x;
		acCDTxt.y = this._activityTimerText.y + this._activityTimerText.height + deltaY;//this._activityTimerText.y ;//this._activityTimerText.y + this._activityTimerText.height + deltaY;
		this.addChildToContainer(acCDTxt);
		this._acCDTxt = acCDTxt;

        let rankTxt = "";
		//规则
		this._ruleText = ComponentManager.getTextField("", 20, TextFieldConst.COLOR_LIGHT_YELLOW);
        this._ruleText.text = LanguageManager.getlocal("acOneYearDesc-"+this.code,[rankTxt]);
        this._ruleText.x = this._activityTimerText.x
        this._ruleText.multiline = true;
        this._ruleText.lineSpacing = 4;
        this._ruleText.width = GameConfig.stageWidth - this._ruleText.x*2;
		this._ruleText.y = this._acCDTxt.y + this._activityTimerText.height + deltaY;
		this.addChildToContainer(this._ruleText);

        //bottomBg
        let bottomBg = BaseBitmap.create("oneyearsign_bottom");
        bottomBg.y = GameConfig.stageHeigth - this.container.y - bottomBg.height;

        let _scrollContiner = new BaseDisplayObjectContainer();
        _scrollContiner.width = GameConfig.stageWidth;
        let rect:egret.Rectangle = egret.Rectangle.create();
		rect.setTo(0,0,GameConfig.stageWidth, bottomBg.y -forpeople_top.y - forpeople_top.height + 65);
        this._scrollContiner = _scrollContiner;

        let startY = 0;
        let startIdx = 0;
        let SignReward = this.cfg.SignReward;
        let len = SignReward.length;
        let daynum = this.vo.dayNum;

        let offPosY = 0;
        for (var index = 0; index < len; index++) {
            let rewardbg = BaseBitmap.create("oneyearsign_itembg");
            let txt1 = ComponentManager.getTextField(LanguageManager.getlocal("acOneYear_txt1",[""+(index+1)]), 20, TextFieldConst.COLOR_BROWN );
            let txt2 = ComponentManager.getTextField(LanguageManager.getlocal("acOneYear_txt2"), 20, TextFieldConst.COLOR_BROWN);

            
            let reward = SignReward[index].getReward;
            let rIcons = GameData.getRewardItemIcons(reward,true,true)[0];
            rIcons.setScale(0.8);
            if(index == 6 || index == 13){
                rewardbg.texture = ResourceManager.getRes("oneyearsign_bg" + (index == 6 ? "2" : "3" ));
                txt1.textColor = TextFieldConst.COLOR_LIGHT_YELLOW;
                txt2.textColor = TextFieldConst.COLOR_LIGHT_YELLOW;
                rewardbg.x = GameConfig.stageWidth/2 - rewardbg.width/2  ;
                startIdx += 3;
            }else{
                rewardbg.x = GameConfig.stageWidth/2 - rewardbg.width/2 + (startIdx%3 -1)* (rewardbg.width +2);
                startIdx +=1;
            }
           

            rewardbg.y = startY;
            txt1.x = rewardbg.x + rewardbg.width/2 - txt1.width/2;
            txt1.y = rewardbg.y + 20;
            txt2.y = rewardbg.y +  rewardbg.height - 15 - txt2.height;

            rIcons.x = rewardbg.x + rewardbg.width/2 - rIcons.width/2 * rIcons.scaleX;
            rIcons.y = rewardbg.y +  rewardbg.height/2 - rIcons.height/2* rIcons.scaleX;
            if(index == 6 || index == 13){
                rIcons.x = rewardbg.x + rewardbg.width - rIcons.width/2 * rIcons.scaleX - 120;
                rIcons.y = rewardbg.y +  rewardbg.height/2 - rIcons.height/2* rIcons.scaleX + 10;
                txt1.y = rewardbg.y + 25;
                txt2.y = rewardbg.y +  rewardbg.height - 20 - txt2.height;
                if(index == 13){
                    rIcons.alpha = 0;
                }
            }

            _scrollContiner.addChild(rewardbg);
            _scrollContiner.addChild(txt1);
            _scrollContiner.addChild(txt2);
            _scrollContiner.addChild(rIcons);

            let alphabg =  BaseBitmap.create("public_alphabg");
            alphabg.width = rewardbg.width;
            alphabg.height = rewardbg.height;
            alphabg.x = rewardbg.x;
            alphabg.y =  rewardbg.y;
            alphabg.visible = false;
            _scrollContiner.addChild(alphabg);

             if(index+1 <= daynum){
                 alphabg.visible = true;
                if(this.vo.dayFlags(index+1)){
                    txt2.text = "";
                    let _collectFlag = BaseBitmap.create("collectflag")
                    _collectFlag.anchorOffsetX = _collectFlag.width/2;
                    _collectFlag.anchorOffsetY = _collectFlag.height/2;
                    _collectFlag.x = txt1.x +  txt1.width/2 ;
                    _collectFlag.y = txt2.y -5;
                    _scrollContiner.addChild(_collectFlag);
                    if(index == 6 || index == 13){
                        _collectFlag.texture = ResourceManager.getRes("collectflag2");
                    }
                    alphabg.visible = false;
                }
                if(index+1 == daynum){
                    offPosY = rewardbg.y;
                }
            }else if(index == daynum){
                txt2.text = LanguageManager.getlocal("acOneYear_txt3");
                alphabg.visible = false;
            }else{
                txt2.text = LanguageManager.getlocal("acOneYear_txt4");
                alphabg.visible = false;
            }
            txt2.x = rewardbg.x + rewardbg.width/2 - txt2.width/2;

            let curdayIdx = index+1 ;
            this._collectTxtList[""+curdayIdx] = txt2;
            this._rewardbgList[""+curdayIdx] = rewardbg;
            this._alphabgList[""+curdayIdx] = alphabg;
            
            rewardbg.addTouchTap(this.getRewardHandler,this,[curdayIdx]);
            alphabg.addTouchTap(this.getRewardHandler,this,[curdayIdx]);
             if(index == 2  || index == 5  || index == 12  || index == 9  ){
                startY += rewardbg.height + 2;
            }
            if( index == 6 || index == 13 ){
                startY += rewardbg.height - 10;
            }
        }

		let _scrollView = ComponentManager.getScrollView( _scrollContiner,rect);
		_scrollView.x = 0;
		_scrollView.y = forpeople_top.y + forpeople_top.height;
		_scrollView.horizontalScrollPolicy="off";
        this.addChildToContainer(_scrollView);
        this.addChildToContainer(bottomBg);

        let balloon =  BaseBitmap.create("oneyearsign_balloon");
        balloon.x = GameConfig.stageWidth  - balloon.width + 5;
        balloon.y = forpeople_top.y + forpeople_top.height - 50;
        this.addChildToContainer(balloon);
        let maxOff = _scrollView.getMaxScrollTop() ;
        offPosY = offPosY >= maxOff ? maxOff : offPosY
        _scrollView.scrollTop = offPosY;

        this.showClipAni();
        this.tick();
    }
    private showClipAni()
    {   
        let daynum = this.vo.dayNum;
        if(this._clip){
            this._scrollContiner.removeChild(this._clip);
            this._clip = null;
        }
        if(this.vo.dayFlags(daynum)){
            return;
        }
        let clipPath = "oneyearsign_clip1_";
        if( daynum == 7 || daynum == 14){
            clipPath = "oneyearsign_clip2_";
        }
       let rewardbg =  this._rewardbgList[""+daynum];
        if(!this._clip && rewardbg){
            this._clip =  ComponentManager.getCustomMovieClip(clipPath,12,100);
            this._clip.blendMode = egret.BlendMode.ADD;
            this._clip.x = rewardbg.x-60;
            this._clip.y =rewardbg.y-55;
            this._clip.playWithTime(0);
            this._scrollContiner.addChild(this._clip);
            if(clipPath == "oneyearsign_clip2_"){
                this._clip.x = rewardbg.x;
                this._clip.y =rewardbg.y-50;
            }
        }
    }
    private refreshUIInfo()
    {
        let SignReward = this.cfg.SignReward;
        let len = SignReward.length;
        let daynum = this.vo.dayNum;

        for (var index = 0; index < len; index++) {
            let curdayIdx = index+1 ;
            let txt2 = this._collectTxtList[""+curdayIdx];
            txt2.text = LanguageManager.getlocal("acOneYear_txt2");
             if(index+1 <= daynum){
                if(this.vo.dayFlags(index+1)){
                    txt2.text = "";
                }
            }else if(index == daynum){
                txt2.text = LanguageManager.getlocal("acOneYear_txt3");
            }else{
                txt2.text = LanguageManager.getlocal("acOneYear_txt4");
            }
        }
        this.showClipAni();
    }
    
    private getRewardHandler(event:any,idx:number)
    {
        let daynum = this.vo.dayNum;
        if(idx >daynum || this.vo.dayFlags(idx) ){
            return;
        }
        this._reqDayIdx = idx;
        App.MessageHelper.addNetMessage(NetRequestConst.REQUST_ACTIVITY_YEAR_DAYSIGN,this.getRewardHandlerCallback,this);
        NetManager.request(NetRequestConst.REQUST_ACTIVITY_YEAR_DAYSIGN,{activeId:this.vo.aidAndCode,dayId:idx});
    }

    private getRewardHandlerCallback(event:any)
    {
        App.MessageHelper.removeNetMessage(NetRequestConst.REQUST_ACTIVITY_YEAR_DAYSIGN,this.getRewardHandlerCallback,this);
        let rdata = event.data.data;
        if(rdata.ret == 0){
            let txt2 = this._collectTxtList[""+this._reqDayIdx] ;
            let _collectFlag = BaseBitmap.create("collectflag")
            _collectFlag.anchorOffsetX = _collectFlag.width/2;
            _collectFlag.anchorOffsetY = _collectFlag.height/2;
            _collectFlag.x = txt2.x +  txt2.width/2 ;
            _collectFlag.y = txt2.y - 5;
            this._scrollContiner.addChild(_collectFlag);
            txt2.visible = false;
            this._alphabgList[""+this._reqDayIdx].visible = false;
             if(this._reqDayIdx == 7 || this._reqDayIdx == 14){
                _collectFlag.texture = ResourceManager.getRes("collectflag2")
            }
            this.showClipAni();
            let rewards = rdata.data.rewards;
            ViewController.getInstance().openView(ViewConst.POPUP.COMMONREWARDPOPUPVIEW,{"rewards":rewards,"isPlayAni":true});
        }
    }

    public tick(): boolean {
        let deltaT = this.acVo.acCountDown;
		let cdStrK = "acFanliReviewReward_acCD";
		if (this._acCDTxt && deltaT ) {
			 if(GameData.serverTime < this.vo.et){
			    this._acCDTxt.text = LanguageManager.getlocal(cdStrK, [deltaT]);
            }else{
                this._acCDTxt.text = LanguageManager.getlocal(cdStrK, [LanguageManager.getlocal("acFourPeoplea_acCDEnd")]);
            }
			return true;
		}
		return false;
	}

    private get cfg() : Config.AcCfg.OneYearSignCfg{
        return this.acVo.config;
    }

    private get vo() : AcOneYearSignVo{
        return <AcOneYearSignVo>this.acVo;
    }

    protected getBgName(): string {
        return "oneyearsign_bg";
    }

    protected getTitleBgName(): string {
        return  "oneyearrank_titlebg-1";
    }
    protected getTitleStr(): string {
        return null;
    }

    protected getResourceList():string[]
	{
		return super.getResourceList().concat([
            "oneyearrank_titlebg-1", "oneyearsign_txt", "oneyearrank_topbg-1",
            "oneyearsign_bottom", "oneyearsign_bg",
            "oneyearsign_bg3","oneyearsign_bg2","oneyearsign_itembg",
            "oneyear_flag","collectflag2","oneyearsign_balloon","collectflag",
         ]);
	} 

	public dispose():void
	{	 
        App.MessageHelper.removeEventListener(MessageConst.MESAAGE_ONESIGN_VO_CHANGE,this.refreshUIInfo,this);
        this._activityTimerText = null;
        this._acCDTxt = null;
        this._ruleText = null;
        this._collectTxtList = [];
        this._scrollContiner = null;
        this._reqDayIdx = null;
        this._rewardbgList = [];
        this._clip = null;
        this._alphabgList = [];
        super.dispose();
	}
}