/**
 * 恭喜获得奖励的通用弹板
 * @param rewards  获得的奖励列表 
 * @param otherRewards  获得的其他奖励列表 指 额外获得的奖励列表 
 * @param isPlayAni  是否播放动画 
 */

class CommonRewardPopupView  extends BaseView
{

    // private _scrollList: ScrollList;
    private _rewardArrList: RewardItemVo[]=[];
    private _otherRewardArrList:RewardItemVo[]=[];
    private _count:number = 0;
    private _buttomBg:BaseBitmap = null;
    private _isPlayAni:any = null;
    private _otherContainer:BaseDisplayObjectContainer = null;
    private _otherRewardHeigth:number = 0;

    private _callback:Function = null;
    private _target:any = null;
    public constructor() {
		super();
	}

    // protected getBgName():string
    // {
    //     return "public_9_wordbg";
    // }

    protected getCloseBtnName():string
    {
        return null;
    }

    protected isTouchMaskClose():boolean
    {
        return true;
    }
    
	protected initView():void
	{
      
        this.titleTF.visible =false;
     
        let re_data = this.param.data;
        let rewards_data = this.param.data.rewards;
        let otherRewards_data = this.param.data.otherRewards;
        this._isPlayAni = this.param.data.isPlayAni;
        if(this.param.data.callback && this.param.data.target){
            this._callback = this.param.data.callback;
            this._target = this.param.data.target;
        }
        //是否按品质排序
        let needSort = false;
        if(this.param.data.needSort){
            needSort = this.param.data.needSort;
        }

        //"6_1150_4|6_1710_1";
        if(rewards_data)
        {
            this._rewardArrList = GameData.formatRewardItem(rewards_data);
        }
        else
        {
             if(re_data)
            {
                if(typeof(re_data)=="string")
                {
                    this._rewardArrList = GameData.formatRewardItem(re_data);
                }
                else
                {   
                    this._rewardArrList = re_data;
                }
            }
        }

        if(needSort){
            this._rewardArrList
            .sort((a:RewardItemVo,b:RewardItemVo)=>{
                if(b.quality == a.quality)
                {
                    return a.id - b.id;
                }
                return b.quality - a.quality;
            });
        }


        if(  App.CommonUtil.check_dragon() ){
            this.showDragonInitView();
        }else{
             this.showInitView();
        }

        this._otherContainer = new BaseDisplayObjectContainer();
        this.addChildToContainer(this._otherContainer);
        if(otherRewards_data)
        {
            this.getOtherReward(otherRewards_data);
        }
        let okBtn = ComponentManager.getButton(ButtonConst.BTN_NORMAL_YELLOW,"sysConfirm",this.hide,this);
        okBtn.setPosition(this._buttomBg.x + this._buttomBg.width / 2 - okBtn.width / 2 , this._buttomBg.y + + this._buttomBg.height + 30);
        this._otherContainer.addChild(okBtn);
        if(this._isPlayAni)
        {
            this._count = 0;
            this._otherContainer.alpha = 0;
            TimerManager.doTimer(100,this._rewardArrList.length,this.playAni,this);
        }
        else
        {
            this.noPlayAni();
        } 
    }
    public hide()
    {
        if(this._callback && this._target){
            this._callback.apply(this._target);
        }
        super.hide();
    }
    /**
     * 显示初始化View
     */
    private showInitView()
    {
        let light =  BaseBitmap.create("tailor_get_light");
        light.anchorOffsetX =  light.width/2;
        light.anchorOffsetY =  light.height/2;
        light.x = GameConfig.stageWidth/2;
        light.y = 40 + light.height / 2;
        egret.Tween.get(light,{loop:true}).to({rotation:360},5000);
        this.addChildToContainer(light)

        let light2 =  BaseBitmap.create("tailor_get_light");
        light2.anchorOffsetX =  light2.width/2;
        light2.anchorOffsetY =  light2.height/2;
        light2.x = light.x;
        light2.y = light.y;
        egret.Tween.get(light2,{loop:true}).to({rotation:-360},5000);
        this.addChildToContainer(light2)

        let wordBM = BaseBitmap.create("tailor_get_word");
        wordBM.anchorOffsetX =  wordBM.width/2;
        wordBM.anchorOffsetY =  wordBM.height/2;
        wordBM.x = GameConfig.stageWidth/2;
        wordBM.y = light.y;
        if(this._isPlayAni)
        {
            wordBM.setScale(0);
            egret.Tween.get(wordBM,{loop:false}).wait(100).to({scaleX:1.2,scaleY:1.2},200).to({scaleX:1.0,scaleY:1.0},50);
        }
        this.addChildToContainer(wordBM);

        this._buttomBg = BaseBitmap.create("public_9_wordbg");
        this._buttomBg.height = 180;
		this._buttomBg.x = this.viewBg.x+ this.viewBg.width/2 - this._buttomBg.width/2;
		this._buttomBg.y = wordBM.y + wordBM.height;
        this.addChildToContainer(this._buttomBg);
        this._buttomBg.height += Math.floor((this._rewardArrList.length) / 6) * (135);

        if (this.param.data.showTip) {
            // 附加提示
            let showTipTxt = ComponentManager.getTextField(this.param.data.showTip,TextFieldConst.FONTSIZE_TITLE_COMMON, TextFieldConst.COLOR_WARN_YELLOW);
            showTipTxt.x = GameConfig.stageWidth/2 - showTipTxt.width/2;
            showTipTxt.y = wordBM.y + wordBM.height - 40;
            this.addChildToContainer(showTipTxt);
        }
    }

     private showDragonInitView()
     {

        let changeDbone =App.DragonBonesUtil.getLoadDragonBones("gongxihuode_shang",-1,"appear")
        // ,{callback:()=>{
        //             changeDbone.playAnimBehindAnim("appear","idle",0);
        //         },callbackThisObj:this});
                //  App.DragonBonesUtil.getLoadDragonBones("gongxihuode_xia");

        changeDbone.playDragonMovie('appear',1);
        changeDbone.setDragonBoneEventListener(dragonBones.EventObject.COMPLETE, ()=>{
            changeDbone.playDragonMovie('idle',0);
        }, this);
		changeDbone.x = GameConfig.stageWidth/2;
		changeDbone.y = 200;
        // changeDbone.stop();

        let changeDbone2 = App.DragonBonesUtil.getLoadDragonBones("gongxihuode_xia");
		changeDbone2.x = changeDbone.x;
		changeDbone2.y = changeDbone.y;
		this.addChildToContainer(changeDbone2);


        let wordBM = BaseBitmap.create("tailor_get_word");
        wordBM.anchorOffsetX =  wordBM.width/2;
        wordBM.anchorOffsetY =  wordBM.height/2;
        wordBM.x = GameConfig.stageWidth/2;
        wordBM.y = changeDbone.y;
        if(this._isPlayAni)
        {
            wordBM.setScale(0);
            egret.Tween.get(wordBM,{loop:false}).wait(100).to({scaleX:1.2,scaleY:1.2},200).to({scaleX:1.0,scaleY:1.0},50);
        }
        this.addChildToContainer(wordBM);

        this._buttomBg = BaseBitmap.create("public_9_wordbg");
        this._buttomBg.height = 180;
		this._buttomBg.x = this.viewBg.x+ this.viewBg.width/2 - this._buttomBg.width/2;
		this._buttomBg.y = wordBM.y + wordBM.height;
        this.addChildToContainer(this._buttomBg);
        this._buttomBg.height += Math.floor((this._rewardArrList.length) / 6) * (135);
        
        this.addChildToContainer(changeDbone);

        if (this.param.data.showTip) {
            // 附加提示
            let showTipTxt = ComponentManager.getTextField(this.param.data.showTip,TextFieldConst.FONTSIZE_TITLE_COMMON, TextFieldConst.COLOR_WARN_YELLOW);
            showTipTxt.x = GameConfig.stageWidth/2 - showTipTxt.width/2;
            showTipTxt.y = wordBM.y + wordBM.height - 40;
            this.addChildToContainer(showTipTxt);
        }
     }
    /**
     * 播放动画
     */
    private playAni()
    {
        this.createItem(this._count);
        
    }
    /**
     * 不播放动画
     */
    private noPlayAni()
    {
        for(let i = 0;i < this._rewardArrList.length;i++)
        {
           this.createItem(i);
        }

    }
    /**
     * 实例化 Item
     */
    private createItem(count:number)
    {
        let rewardDB = GameData.getItemIcon(this._rewardArrList[count],true,true);
        rewardDB.anchorOffsetX = rewardDB.width / 2;
        rewardDB.anchorOffsetY = rewardDB.height / 2;
		let rewardDBWidth = rewardDB.width;
        let maxLength = this._rewardArrList.length > 5?6:this._rewardArrList.length + 1 ;
        let startWidth = (this._buttomBg.width - rewardDBWidth * (maxLength - 1))  / (maxLength);
        let posX = this._buttomBg.x + startWidth + rewardDB.width / 2 +  (((count) % 5) * (rewardDBWidth + startWidth));
        let posY = this._buttomBg.y  + rewardDB.height / 2 + 30 + this._otherRewardHeigth + (Math.floor((count) / 5) * (rewardDB.height + 35));
        rewardDB.setPosition(posX,posY);
		this.addChildToContainer(rewardDB);
        if(this._isPlayAni)
        {
            rewardDB.setScale(0);
            egret.Tween.get(rewardDB,{loop:false}).wait(100).to({scaleX:1.2,scaleY:1.2},200).to({scaleX:1.0,scaleY:1.0},50);
            this._count ++;
            if(this._count == this._rewardArrList.length)
            {
                egret.Tween.get(this._otherContainer).to({alpha:1},500);
            }
        } 
    }
     /**
     * 获得额外的奖励
     */
    private getOtherReward(otherData:any)
    {  
        this._otherRewardArrList = GameData.formatRewardItem(otherData);
        //127--59
        let otherRewardBg =  BaseBitmap.create("atkrace_arrest_bg_di");
        otherRewardBg.width =127;
        otherRewardBg.height =59;
        otherRewardBg.setPosition(35+this._buttomBg.x + this._buttomBg.width / 2 - otherRewardBg.width / 2,this._buttomBg.y + 30);
        this._otherContainer.addChild(otherRewardBg);
        otherRewardBg.visible =false; 

        let rewardIconWidth = 0;
        let otherRewardDesWidth = 0;
        let otherRewardNumWidth = 0;
        for(let i = 0;i < this._otherRewardArrList.length;i++)
        {
            let rewardIcon = BaseLoadBitmap.create(this._otherRewardArrList[i].icon);
            rewardIcon.height = 42;
            rewardIcon.width = 42;
            rewardIcon.setPosition(otherRewardBg.x + otherRewardBg.width / 2 - rewardIcon.width / 2,otherRewardBg.y + 9 + (i * (rewardIcon.height)));
            this._otherContainer.addChild(rewardIcon);
            rewardIconWidth =rewardIcon.width>rewardIconWidth?rewardIcon.width:rewardIconWidth;
        
            let extraRewardDes = ComponentManager.getTextField(LanguageManager.getlocal("extraRewardDesc2"),TextFieldConst.FONTSIZE_CONTENT_COMMON,TextFieldConst.COLOR_LIGHT_YELLOW);
            extraRewardDes.setPosition(rewardIcon.x - extraRewardDes.width - 5,rewardIcon.y + rewardIcon.height / 2 - extraRewardDes.height / 2)
            this._otherContainer.addChild(extraRewardDes);
            otherRewardDesWidth =extraRewardDes.width>otherRewardDesWidth?extraRewardDes.width:otherRewardDesWidth;

            let extraRewardNum = ComponentManager.getTextField("x" + String(this._otherRewardArrList[0].num),TextFieldConst.FONTSIZE_CONTENT_COMMON,TextFieldConst.COLOR_QUALITY_WHITE);
            extraRewardNum.setPosition(rewardIcon.x + rewardIcon.width + 5,rewardIcon.y + rewardIcon.height / 2 - extraRewardNum.height / 2);
            this._otherContainer.addChild(extraRewardNum);
            otherRewardNumWidth =extraRewardNum.width>otherRewardNumWidth?extraRewardNum.width:otherRewardNumWidth;
        }
        // this.setLayoutPosition(LayoutConst.horizontalCenter,this._otherContainer,otherRewardBg)

        otherRewardBg.width = rewardIconWidth + otherRewardNumWidth + otherRewardDesWidth + 200;
        otherRewardBg.height += (this._otherRewardArrList.length - 1) * 42;
        otherRewardBg.setPosition(this._buttomBg.x + this._buttomBg.width / 2 - otherRewardBg.width / 2,this._buttomBg.y + 30);
        this._otherRewardHeigth = otherRewardBg.height + 20;
        this._buttomBg.height += this._otherRewardHeigth;
    }
    // protected resetBgSize():void
    // {
    //     super.resetBgSize();
    //     let  common_reward=BaseBitmap.create("common_reward");
    //     common_reward.setPosition(this.viewBg.x+(this.viewBg.width-common_reward.width)/2,this.viewBg.y-common_reward.height/2);
    //     this.addChild(common_reward);
    // }
    
    // private touchHandler():void
    // {
    //     ViewController.getInstance().hideView(ViewConst.POPUP.COMMONREWARDPOPUPVIEW);
    // }

     protected getResourceList():string[]
	{
		return super.getResourceList().concat([
            // "common_reward",
            // "itemeffect",
            'public_9_wordbg2', "tailor_get_light",
            "tailor_get_word",
            
		]);
	}
   
        

    public dispose()
    {
        // this._scrollList =null;
        TimerManager.remove(this.playAni,this);
        this._rewardArrList =[];
        this._otherRewardArrList = [];
        this._otherRewardArrList = [];
        this._count = 0;
        this._buttomBg = null;
        this._isPlayAni = null;
        this._otherContainer = null;
        this._otherRewardHeigth = null;


        this._callback = null;
        this._target = null;

        super.dispose()
    }
}