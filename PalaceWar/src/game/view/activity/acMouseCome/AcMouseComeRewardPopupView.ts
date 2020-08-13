/**
 * 鼠来如意 奖励
 */
class AcMouseComeRewardPopupView  extends PopupView
{
	private _callbackF:Function = null;
	private _obj:any = null;
	private _infoList:any[] = [];
	private _scrollContainer:BaseDisplayObjectContainer=undefined;
	private _fightBtn:BaseButton = null;
	private _containerTab:BaseDisplayObjectContainer[] = [];
	private _curShowIdx:number = 0;
	private _scrollView:ScrollView = null;
	private _oldSoldier:number = 0;
	private _oldCid:number = 0;
	private _oldKill:number = 0;

	public constructor() {
		super();
	}

	protected getTitleStr():string
	{
		return null;
	}

	// protected isShowOpenAni():boolean
	// {
	// 	return false;
	// }


	// 关闭按钮图标名称
	protected getCloseBtnName():string
	{
		return null;
    }

    protected getBgName():string{
        return null;
    }
    
    protected getTypeCode():string{
        if (this.code == "2"){
            return "1";
        }
        return this.code;
    }

    private get code():string{
        return this.param.data.code;
    }

    private get aid():string{
        return this.param.data.aid;
    }

	protected initView():void
	{	
		
		if (this.param.data && this.param.data.callback && this.param.data.obj)
		{
			this._obj = this.param.data.obj;
			this._callbackF = this.param.data.callback;
        }
        this._infoList = this.param.data.data;

        let bg = BaseBitmap.create(App.CommonUtil.getResByCode("acmousecome_rewardbg", this.getTypeCode()));
        this.addChildToContainer(bg);
        if (this._infoList.length > 1){
            bg.height = GameConfig.stageHeigth - 100;
        }
        bg.setPosition(GameConfig.stageWidth/2 - bg.width/2, GameConfig.stageHeigth/2 - bg.height/2);
        
        let titleTxt = BaseBitmap.create(App.CommonUtil.getResByCode("acmousecome_rewardtxt", this.getTypeCode()));
        titleTxt.setPosition(bg.x + bg.width/2 - titleTxt.width/2, bg.y + 30);
        this.addChildToContainer(titleTxt);

        let enterTxt = ComponentManager.getTextField(LanguageManager.getlocal("confirmBtn"), 28, TextFieldConst.COLOR_LIGHT_YELLOW);
        this.addChildToContainer(enterTxt);

        let enterTouch = BaseBitmap.create("public_alphabg");
        enterTouch.width = 200;
        enterTouch.height = 68;
        this.addChildToContainer(enterTouch);
        enterTouch.setPosition(bg.x + 198, bg.y + bg.height - 68);
        enterTxt.setPosition(enterTouch.x + enterTouch.width/2 - enterTxt.width/2, enterTouch.y + enterTouch.height/2 - enterTxt.height/2);

        enterTouch.addTouchTap(()=>{
            this.confirmClick();
        }, this);

		if (this._infoList.length <= 1){
            let data = this._infoList[0];
            let rewardIconList = GameData.getRewardItemIcons(data.poolreward, true, true);
            let scale = 1;
            let item = rewardIconList[0];
            item.setPosition(bg.x + bg.width/2 - item.width/2, bg.y + 160);
            this.addChildToContainer(item);

            let line = BaseBitmap.create(App.CommonUtil.getResByCode("acmousecome_rewardline", this.getTypeCode()));
            this.addChildToContainer(line);
            line.setPosition(bg.x + bg.width/2 - line.width/2, item.y + item.height + 15);

            let bigTipStr = App.CommonUtil.getCnByCode("acMouseComeRewardTip2", this.getTypeCode());
            let typeName = "";
            if (data.type){
                bigTipStr = App.CommonUtil.getCnByCode("acMouseComeRewardTip1", this.getTypeCode());
                typeName = LanguageManager.getlocal(App.CommonUtil.getCnByCode("acMouseComeDetailPoolItemName"+data.type, this.getTypeCode()));
            }

            let bigTip = ComponentManager.getTextField(LanguageManager.getlocal(bigTipStr, [typeName]), TextFieldConst.FONTSIZE_CONTENT_COMMON, TextFieldConst.COLOR_BROWN);
            bigTip.setPosition(bg.x + bg.width/2 - bigTip.width/2, line.y + line.height + 15);
            if (!data.type){
                bigTip.y = line.y + line.height + 40;
            }
            this.addChildToContainer(bigTip);
            bigTip.textAlign = TextFieldConst.ALIGH_CENTER;
            bigTip.lineSpacing = 5;

            if (data.bigreward){
                let rewardIconList = GameData.getRewardItemIcons(data.bigreward, true, true);
                let len = rewardIconList.length;
                let scale = 0.7;
                let itemHeight = 108;
                let itemWidth = 108;
                let spaceX = 10;
                let spaceY = 10;
                let stX = bg.x + 56 + (480 - (itemWidth * scale + spaceX) * len + spaceX)/2;
                let stY = bigTip.y + bigTip.height + 20;
                
                for (let i = 0; i < len; i++) {
                    let rewardDB = rewardIconList[i];
                    rewardDB.setScale(scale);
                    rewardDB.setPosition(stX + (rewardDB.width * scale + spaceX) * i, stY);
                    this.addChildToContainer(rewardDB);
                }
            }  
        }
        else{

            //147 + 172 = 319
            this._scrollContainer = new BaseDisplayObjectContainer();
            this._scrollContainer.width = 480;
            let rect:egret.Rectangle = new egret.Rectangle(0, 0, 480, bg.height - 172 - 147);
            this._scrollView = ComponentManager.getScrollView(this._scrollContainer,rect);
            this.addChildToContainer(this._scrollView);
            this._scrollView.horizontalScrollPolicy="off";
            this._scrollView.setPosition(bg.x + 56, bg.y + 147);

            for (let i = 0 ; i < this._infoList.length; i++)
            {
                let c = this.getRewardInfoContainer(this._infoList[i], i+1);
                this._containerTab.push(c);
            }
      
            this._scrollView.touchEnabled = false;
            this._scrollContainer.touchEnabled = false;
            this.showContainerAnim();
        }
    }
    
    private getContainerOffY(index:number):number{
        let offY = 0;
        for (let i=0; i < this._containerTab.length; i++){
            if (i < index){
                offY += this._containerTab[i].height;
            }
        }
        return offY;
    }

	private showContainerAnim():void
	{
		if (this._containerTab.length > this._curShowIdx) 
		{
			let tempContainer:BaseDisplayObjectContainer = this._containerTab[this._curShowIdx];
			this._scrollContainer.addChild(tempContainer);
			tempContainer.y = this.getContainerOffY(this._curShowIdx);
			this._scrollView.setScrollTop(this._scrollView.getMaxScrollTop(), 300);

			this._curShowIdx++;
			tempContainer.x = -tempContainer.width;
			egret.Tween.get(tempContainer).wait(100).to({x:0},300);
			egret.Tween.get(this._scrollContainer).wait(700).call(this.showContainerAnim,this);
		}
		else 
		{
			this._scrollView.touchEnabled = true;
			this._scrollContainer.touchEnabled = true;
		}
	}

	private getRewardInfoContainer(data:any, index:number):BaseDisplayObjectContainer
	{
		let bgContainer:BaseDisplayObjectContainer = new BaseDisplayObjectContainer();
        bgContainer.width = 480;

		let bg:BaseBitmap = BaseBitmap.create(App.CommonUtil.getResByCode("acmousecome_rewarditembg", this.getTypeCode()));
		bg.width = 420;
		bg.setPosition(bgContainer.width/2 - bg.width/2, 0);
        bgContainer.addChild(bg);	
        
        let titleBg = BaseBitmap.create(App.CommonUtil.getResByCode("acmousecome_rewardtitleinfobg", this.getTypeCode()));
        // titleBg.width = bg.width - 140;
        titleBg.setPosition(bg.x + bg.width/2 - titleBg.width/2, bg.y + 10);
        bgContainer.addChild(titleBg);

        let title = ComponentManager.getTextField(LanguageManager.getlocal(App.CommonUtil.getCnByCode("acMouseComeRewardItemNum", this.getTypeCode()), [""+index]), TextFieldConst.FONTSIZE_CONTENT_COMMON, TextFieldConst.COLOR_WHITE);
        title.setPosition(bg.x + bg.width/2 - title.width/2, titleBg.y + titleBg.height/2 - title.height/2);
        bgContainer.addChild(title);

        let rewardIconList = GameData.getRewardItemIcons(data.poolreward, true, true);
        let scale = 1;
        let item = rewardIconList[0];
        item.setPosition(bg.x + bg.width/2 - item.width/2, titleBg.y + titleBg.height + 10);
        bgContainer.addChild(item);

        let line = BaseBitmap.create(App.CommonUtil.getResByCode("acmousecome_rewardline", this.getTypeCode()));
        bgContainer.addChild(line);
        line.setPosition(bg.x + bg.width/2 - line.width/2, item.y + item.height + 15);

        let bigTipStr = App.CommonUtil.getCnByCode("acMouseComeRewardTip2", this.getTypeCode());
        let typeName = "";
        if (data.type){
            bigTipStr = App.CommonUtil.getCnByCode("acMouseComeRewardTip1", this.getTypeCode());
            typeName = LanguageManager.getlocal(App.CommonUtil.getCnByCode("acMouseComeDetailPoolItemName"+data.type, this.getTypeCode()));
        }

        let bigTip = ComponentManager.getTextField(LanguageManager.getlocal(bigTipStr, [typeName]), TextFieldConst.FONTSIZE_CONTENT_COMMON, TextFieldConst.COLOR_BROWN);
        bigTip.setPosition(bg.x + bg.width/2 - bigTip.width/2, line.y + line.height + 15);
        bgContainer.addChild(bigTip);
        bigTip.textAlign = TextFieldConst.ALIGH_CENTER;
        bigTip.lineSpacing = 5;

        if (data.bigreward){
            let rewardIconList = GameData.getRewardItemIcons(data.bigreward, true, true);
            let len = rewardIconList.length;
            let scale = 0.7;
            let itemHeight = 108;
            let itemWidth = 108;
            let spaceX = 10;
            let spaceY = 10;
            let stX = bg.x + (bg.width - (itemWidth * scale + spaceX) * len + spaceX)/2;
            let stY = bigTip.y + bigTip.height + 20;
            
            for (let i = 0; i < len; i++) {
                let rewardDB = rewardIconList[i];
                rewardDB.setScale(scale);
                rewardDB.setPosition(stX + (rewardDB.width * scale + spaceX) * i, stY);
                bgContainer.addChild(rewardDB);
            }
            bg.height = stY + itemHeight * scale + 15;
        }  
        else{
            bg.height = bigTip.y + bigTip.height + 20;
        }
        bgContainer.height = bg.height + 5;
		return bgContainer;
	}

	private confirmClick():void
	{
		if (this._obj && this._callbackF) {
			this._callbackF.apply(this._obj,[]);
		}
		this.hide();
	}

	public dispose():void
	{	

		this._callbackF = null;
		this._obj = null;
		this._infoList.length = 0;
		if (this._scrollContainer)
		{	
			egret.Tween.removeTweens(this._scrollContainer);
		}
		this._scrollContainer = undefined;
		this._containerTab.length = 0;
		this._curShowIdx = 0;
		this._scrollView = null;

		super.dispose();
	}
}