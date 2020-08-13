/*
author : jiang
date : 2018.10.16
desc : 幸运大奖
*/
class AcLotteryView extends AcCommonView{
    public constructor(){
        super();
    }

    private _titleBg: BaseLoadBitmap = null;
    private _titleBtn: BaseButton = null;
    private _titleTimeText: BaseTextField = null;

    private _titleBar: BaseBitmap = null;
    private _titleBarText: BaseTextField = null;
    private _curRewardBoxId = 0;
    private _itemBg: BaseLoadBitmap = null;
    private _progress = null;
    private _itemList: any[] = [];
    //中间奖池信息背景
    private _centerBg: BaseBitmap = null; 
    //中间奖池信息
    private _curPrizeText: BaseTextField = null;
    private _curPrizeNumText: BaseBitmapText|BaseTextField = null;
    private _curPrizeIcon: BaseBitmap = null;
    private _curPrizeNum : string = "0";

    //抽取次数
    private _curCountText: BaseTextField = null;

    private _loopList:any[] = [];

    private _isPlayAnim = false;
    private _curCountBg: BaseBitmap = null;
    private _isInited = false;

    private _selectImg: BaseBitmap = null;

    private _lihua: BaseDisplayObjectContainer = null;

    private _lihuaMsg:any = null;

    private _tipCon = null;
    private _tempObj = null;
    private _onceBtn:BaseButton = null;
    private _tenBtn:BaseButton = null;
    private _changeList:any[] = [];
    private _rRewards = null;
    private _oRewards = null;


    private get cfg() : Config.AcCfg.LotteryCfg{
        return Config.AcCfg.getCfgByActivityIdAndCode(this.aid, this.code);
    }
    protected get acVo():AcLotteryVo
	{
		return <AcLotteryVo>Api.acVoApi.getActivityVoByAidAndCode(this.aid,this.code);
	}
    public initView(){

  
        App.MessageHelper.addEventListener(MessageConst.MESSAGE_LOTTERY_REFRESHVO,this.updateStatus,this); 
        App.MessageHelper.addEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_ACTIVITY_LOTTERYNUMREWARD),this.rewardBoxClickhandlerCallBack,this);
        App.MessageHelper.addEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_ACTIVITY_LOTTERYJOIN),this.lotteryJoinCallback,this);
 


        
        let titleRes = "aclotteryview_title_" + this.code;
        // if(  this.code == "8"){
        //     titleRes = "aclotteryview_title_7";
        // }
        if (!ResourceManager.hasRes(titleRes)){
           titleRes = "aclotteryview_title_1";
        }
        this._titleBg = BaseLoadBitmap.create(titleRes);
        
        this._titleBg.name = "titleBg";
        this._titleBg.width = 640;
        this._titleBg.height = 223;
        this._titleBg.x = GameConfig.stageWidth/2 - this._titleBg.width/2;
        this._titleBg.y = 69;
        
        this.addChild(this._titleBg);

        this._titleBtn = ComponentManager.getButton("aclotteryview_btn","acLotteryTitleBtn",this.titleBtnHandler,this);
        this._titleBtn.setColor(TextFieldConst.COLOR_BROWN);
        this._titleBtn.x = 400;
        this._titleBtn.y = 230;
        this.addChild(this._titleBtn);
        let t = this.acVo.et - GameData.serverTime - 86400 * 1;
        if(t < 0){
            t = 0;
        }
        let timeTxt = App.DateUtil.getFormatBySecond(t,8);
        // let stTxt = App.DateUtil.getFormatBySecond(this.acVo.st, 9);
		// let etTxt = App.DateUtil.getFormatBySecond(this.acVo.et- 86400 * 1, 9);
        
        this._titleTimeText = ComponentManager.getTextField(LanguageManager.getlocal("acLotteryTitleTime",[timeTxt]),22,TextFieldConst.COLOR_LIGHT_YELLOW);
        if(this.code == "7" || this.code == "8"){
           this._titleTimeText.text =  LanguageManager.getlocal("acLotteryTitleTime_7",[timeTxt]);
        }
        if(t <= 0){
            this._titleTimeText.text = LanguageManager.getlocal("acLotteryActiveOver");
        } else {
            TickManager.addTick(this.tick,this);
        }
        
        
        this._titleTimeText.x = this._titleBtn.x + this._titleBtn.width / 2 - this._titleTimeText.width/2;
        this._titleTimeText.y = this._titleBtn.y - this._titleTimeText.height - 5;
        this.addChild(this._titleTimeText);
        


        this._titleBar = BaseBitmap.create("aclotteryview_bar_1");
        this._titleBar.x = GameConfig.stageWidth/2 - this._titleBar.width / 2;
        this._titleBar.y = this._titleBg.y + this._titleBg.height;
        this.addChild(this._titleBar);

        this._titleBarText = ComponentManager.getTextField("",24,TextFieldConst.COLOR_LIGHT_YELLOW);
        this._titleBarText.x = this._titleBar.x + this._titleBar.width / 2 - this._titleBarText.width/2;
        this._titleBarText.y = this._titleBar.y + this._titleBar.height / 2 - this._titleBarText.height/2;
        this.addChild(this._titleBarText);
        //跑马灯
        this.initLoop();


        // let offY = -85;
        // GameConfig.
        // GameConfig.stageHeigth - 1136


        let offY = 0;
        if(1136 - GameConfig.stageHeigth > 0){
            offY = -85 * (1136 - GameConfig.stageHeigth) / (1136 - 960);
        }

     


        this._itemBg = BaseLoadBitmap.create("aclotteryview_bg");
        this._itemBg.width = 640;
        this._itemBg.height = 843;
        this._itemBg.x = GameConfig.stageWidth / 2 - this._itemBg.width/2;
        this._itemBg.y = this._titleBar.y + this._titleBar.height + offY;
        this.addChildAt(this._itemBg,this.getChildIndex(this._titleBg));

        let border = BaseBitmap.create("public_9v_bg03");
        border.width = 640;
        border.height = GameConfig.stageHeigth - 69;
        border.y = 69;
        this.addChild(border);


        //进度条
        
        this._progress = ComponentManager.getProgressBar("dailytask_dt_02","dailytask_dt_01",430);
		this._progress.x = 150;
        this._progress.y = this._titleBar.y + this._titleBar.height + 69 ;
		this._progress.setPercentage(this.getProgressPercent());
        this.addChild(this._progress);

        this._curCountBg = BaseBitmap.create("common_numbg");
        this._curCountBg.setScale(1.3);
        this._curCountBg.x = 5;
        this._curCountBg.y = this._titleBar.y + this._titleBar.height + 15;
        
        this.addChild(this._curCountBg);
        
        let curCountDesc = ComponentManager.getTextField(LanguageManager.getlocal("acLotteryCurCount"),20,TextFieldConst.COLOR_WHITE);
        curCountDesc.x = this._curCountBg.x + this._curCountBg.width * this._curCountBg.scaleX / 2 - curCountDesc.width/2;
        curCountDesc.y = this._curCountBg.y + 57;
        this.addChild(curCountDesc);

        this._curCountText = ComponentManager.getTextField(this.acVo.totalCount.toString(),24,TextFieldConst.COLOR_LIGHT_YELLOW);
        this._curCountText.x = 2+this._curCountBg.x + this._curCountBg.width * this._curCountBg.scaleX / 2 - this._curCountText.width/2;
        this._curCountText.y = this._curCountBg.y + 17;
        this.addChild(this._curCountText);

        //初始化宝箱
        let rewardList = this.cfg.lotteryNum;
		let rkeys = Object.keys(rewardList);


        let startX = this._progress.x;
        let perWidth = this._progress.width/5;
      
		let progressBg =  BaseBitmap.create("dailytask_dt_03");
        let progressBgY = this._progress.y + this._progress.height/2 - progressBg.height/2;
		progressBg.x = startX - progressBg.width/2;
		progressBg.y = progressBgY;
		this.addChild(progressBg);


        let numTxt =  ComponentManager.getTextField("0", TextFieldConst.FONTSIZE_CONTENT_SMALL, TextFieldConst.COLOR_WHITE);
        numTxt.x = progressBg.x + progressBg.width/2 - numTxt.width/2;
        numTxt.y = progressBg.y + progressBg.height/2 - numTxt.height/2;
        this.addChild(numTxt);

		for (let index = 0; index < rewardList.length; index++) {
			let tmprcfg = rewardList[index];
			// let perY = startY - (index+1) * perHeight;
            progressBg = BaseBitmap.create("dailytask_dt_03");
            progressBg.x = startX + (index + 1) * perWidth - progressBg.width/2;
            progressBg.y = progressBgY
            this.addChild(progressBg);


			let rStatus = this.getBoxStatusById(rkeys[index]);
            // let rStatus = 1;
			let imgres = "dailytask_box1_";
			if (index > 1){
				imgres = "dailytask_box2_";
			}
			let boxImg = BaseBitmap.create(imgres + String(rStatus));
			boxImg.anchorOffsetX = boxImg.width/2;
			boxImg.anchorOffsetY = boxImg.height/2;
			boxImg.name = "boxImg"+rkeys[index];
			boxImg.x = progressBg.x + progressBg.width/2;
			boxImg.y = progressBgY - 30;
			
			let lightImg =  BaseBitmap.create("dailytask_box_light");
			lightImg.anchorOffsetX = 40;
			lightImg.anchorOffsetY = 40;
		
			lightImg.name = "lightImg"+rkeys[index]
            lightImg.x = boxImg.x;
			lightImg.y = boxImg.y;
			lightImg.visible = false;
			this.addChild(lightImg);
			this.addChild(boxImg);

            boxImg.addTouchTap(this.rewardBoxClickhandler,this,[rkeys[index]]);
            let rewardCfg = this.cfg.getBoxRewardById(Number(rkeys[index]));
            let need = rewardCfg.needNum;
			numTxt =  ComponentManager.getTextField(need.toString(), TextFieldConst.FONTSIZE_CONTENT_SMALL, TextFieldConst.COLOR_WHITE);
			numTxt.x = progressBg.x + progressBg.width/2 - numTxt.width/2;
			numTxt.y = progressBg.y + progressBg.height/2 - numTxt.height/2;
			this.addChild(numTxt);
		}

        //初始化抽奖物品列表
        let lotteryPool = this.cfg.lotteryPool;
        let listL = lotteryPool.length;
        let itemData = null;
        let item = null;
        let rewardData = null;
        let iconBg = null;

        let iconBgWidth = 108;
        let spaceX = 8;
        let spaceY = 10;
        let iconListWidth = iconBgWidth * 5 + spaceX * 4;
        let iconListHeight = iconBgWidth * 3 + spaceY * 2;
        let startY = 203 ;
        for(let i = 0;i < listL; i++){
            itemData = lotteryPool[i];
            rewardData = GameData.formatRewardItem(itemData[0])[0];
            // rewardData.iconBg = "aclotteryview_itembg1";
            if(itemData[2] == 1){
                item = GameData.getItemIcon(rewardData,true,true);
            } else {
                item = GameData.getItemIcon(rewardData,true,false);
            }
            let iconBg = <BaseBitmap>item.getChildByName("iconBg");
            if(itemData[3] && itemData[3] > 0 ){
                let rid = itemData[3];
                let rcfg = this.cfg.getRandBoxById(Number(rid) - 1);
                let bid = itemData[0]
                if(rcfg){
                    iconBg.removeTouchTap();
                    iconBg.addTouchTap( ()=>{
                        ViewController.getInstance().openView(ViewConst.POPUP.ACLOTTERYRANDBOXPOPUPVIEW,{cfgData:rcfg,boxId:bid});
                    },this );
                    // rcfg
                }
            }
            if(this.code != "7"){
                if(i == 0 || i == 4 || i==6 ||i==10){
                    iconBg.texture = ResourceManager.getRes("aclotteryview_itembg1");
                } else {
                    iconBg.texture = ResourceManager.getRes("aclotteryview_itembg2");
                }
            }
           
            
            if(i <= 4){
                //01234
                item.x = this._itemBg.x + this._itemBg.width / 2 - iconListWidth / 2 + i * (iconBgWidth + spaceX);
                item.y = this._itemBg.y + startY; 
            } else if(i == 5){
                //5
                item.x = this._itemBg.x + this._itemBg.width / 2 - iconListWidth / 2 + 4 * (iconBgWidth + spaceX);
                item.y = this._itemBg.y + startY + iconBgWidth + spaceY; 


            } else if(i <= 10){
                //6 7 8 9 10

                item.x = this._itemBg.x + this._itemBg.width / 2 + iconListWidth / 2 - (i-6) * (iconBgWidth + spaceX)-iconBgWidth;
                item.y = this._itemBg.y + startY + iconBgWidth + spaceY + iconBgWidth + spaceY; 

            } else if(i == 11){
                //11
                item.x = this._itemBg.x + this._itemBg.width / 2 - iconListWidth / 2;
                item.y = this._itemBg.y + startY + iconBgWidth + spaceY; 
            }
            
            this._itemList.push(item);
            this.addChild(item);
        }

        this._selectImg = BaseBitmap.create("aclotteryview_select");
        this._selectImg.x = this._itemList[0].x + 108 / 2 - 124/2;
        this._selectImg.y = this._itemList[0].y + 108 / 2 - 124/2;
        this._selectImg.visible = false;
        this.addChild(this._selectImg);

        this._centerBg = BaseBitmap.create("aclotteryview_center");
        this._centerBg.x = this._itemBg.x + this._itemBg.width / 2 - iconListWidth / 2 + iconBgWidth + spaceX;
        this._centerBg.y = this._itemBg.y + startY + iconBgWidth + spaceY; 
        this.addChild(this._centerBg);

        let fireAnim = ComponentManager.getCustomMovieClip("ac_lottery_fireanim",8,70);
        fireAnim.x = this._centerBg.x + this._centerBg.width/2 - 332/2;
        fireAnim.y = this._centerBg.y + this._centerBg.height/2 - 107/2;
        this.addChild(fireAnim);
        fireAnim.playWithTime(0);


        this._curPrizeText = ComponentManager.getTextField(LanguageManager.getlocal("acLotteryCurNum"),32,TextFieldConst.COLOR_LIGHT_YELLOW);
        this._curPrizeText.x = this._centerBg.x + this._centerBg.width/2 - this._curPrizeText.width/2;
        this._curPrizeText.y = this._centerBg.y + 10;
        this.addChild(this._curPrizeText);

        this._curPrizeNumText = ComponentManager.getBitmapText(this._curPrizeNum.toString(),"activity_fnt");
        this._curPrizeIcon = BaseBitmap.create("itemicon1");
        this._curPrizeIcon.setScale(0.7);
        this._curPrizeNumText.x = this._centerBg.x + this._centerBg.width / 2 - (this._curPrizeNumText.width + this._curPrizeIcon.width * this._curPrizeIcon.scaleX)/2
        this._curPrizeNumText.y = this._curPrizeText.y + this._curPrizeText.height + 2;
        this.addChild(this._curPrizeNumText);

        this._curPrizeIcon.x = this._curPrizeNumText.x + this._curPrizeNumText.width;
        this._curPrizeIcon.y = this._curPrizeNumText.y - 5;
        this.addChild(this._curPrizeIcon);


         let btnIconStr = GameData.formatRewardItem(this.cfg.getReward)[0].icon ;
        //转动一次按钮
        let onceBtn = ComponentManager.getButton(ButtonConst.BTN_BIG_BLUE,null,this.buyBtnHandler,this,[1]);
        //转动一次按钮文字
        this._onceBtn = onceBtn;

        let onceBtnIcon = BaseLoadBitmap.create(btnIconStr);
        onceBtnIcon.width = onceBtnIcon.height = 100;
        onceBtnIcon.setScale(0.5);
        onceBtnIcon.x = 40;                                            
        onceBtnIcon.y = onceBtn.height/2 - 100 * onceBtnIcon.scaleY / 2;
        onceBtn.addChild(onceBtnIcon);

        let onceBtnIconDescText = ComponentManager.getTextField("x1", 28,TextFieldConst.COLOR_BTN_BLUE); 
        onceBtnIconDescText.x = onceBtnIcon.x + 100 * onceBtnIcon.scaleX ;
        onceBtnIconDescText.y = onceBtn.height / 2 - onceBtnIconDescText.height / 2;
        onceBtn.addChild(onceBtnIconDescText);

        let onceBtnText = ComponentManager.getTextField(LanguageManager.getlocal("acPunishBuyItemBuy"),28,TextFieldConst.COLOR_BTN_BLUE);
        onceBtnText.x = onceBtnIconDescText.x + onceBtnIconDescText.width;
        onceBtnText.y = onceBtn.height/2 - onceBtnText.height/2;
        onceBtn.addChild(onceBtnText);




        //转动十次按钮
        let tenBtn = ComponentManager.getButton(ButtonConst.BTN_BIG_YELLOW,null,this.buyBtnHandler,this,[10]);
        this._tenBtn = tenBtn;
        let tenBtnIcon = BaseLoadBitmap.create(btnIconStr);
        tenBtnIcon.width = tenBtnIcon.height = 100;
        tenBtnIcon.setScale(0.5);
        tenBtnIcon.x = 40;
        tenBtnIcon.y = tenBtn.height/2 - 100 * tenBtnIcon.scaleY / 2;//tenBtnText.y + tenBtnText.height/2 - 100 * tenBtnIcon.scaleY / 2;
        tenBtn.addChild(tenBtnIcon);


        let tenBtnIconDescText = ComponentManager.getTextField("x10", 28,TextFieldConst.COLOR_BTN_YELLOW);
        tenBtnIconDescText.x = tenBtnIcon.x + 100 * tenBtnIcon.scaleX ;
        tenBtnIconDescText.y = tenBtn.height / 2 - tenBtnIconDescText.height / 2;//tenBtnText.y;
        tenBtn.addChild(tenBtnIconDescText);

        //转动十次按钮文字
        let tenBtnText = ComponentManager.getTextField(LanguageManager.getlocal("acPunishBuyItemBuy"),28,TextFieldConst.COLOR_BTN_YELLOW);
        tenBtnText.x = tenBtnIconDescText.x + tenBtnIconDescText.width;//50;
        tenBtnText.y = tenBtn.height/2 - tenBtnText.height/2;
        tenBtn.addChild(tenBtnText);



        // let discountIcon = BaseBitmap.create("acturntable_7zhe");
        // discountIcon.x = 2;
        // discountIcon.y = -3;
        // tenBtn.addChild(discountIcon);


        //购买按钮
        let onceIcon = BaseBitmap.create("itemicon1");
        onceIcon.setScale(0.5);
        let onceNumText = ComponentManager.getTextField(this.cfg.cost.toString(),24,TextFieldConst.COLOR_LIGHT_YELLOW);

        let tenIcon = BaseBitmap.create("itemicon1");
        tenIcon.setScale(0.5);
        let tenNumText = ComponentManager.getTextField((this.cfg.cost * 10 * this.cfg.discount).toString(),24,TextFieldConst.COLOR_LIGHT_YELLOW);

    
        //设置位置
        onceBtn.x = this._itemBg.x + 60;
        onceBtn.y = this._itemBg.y + 630 ;

        tenBtn.x = this._itemBg.x + this._itemBg.width - tenBtn.width - 60;
        tenBtn.y = this._itemBg.y + 630 ;


        this.addChild(onceBtn);
        this.addChild(tenBtn);

        onceIcon.x = onceBtn.x + onceBtn.width / 2 - onceIcon.width * onceIcon.scaleX / 2 - onceNumText.width / 2;
        onceIcon.y = onceBtn.y - 2 - onceIcon.height * onceIcon.scaleY;

        onceNumText.x = onceIcon.x + onceIcon.width * onceIcon.scaleX;
        onceNumText.y = onceIcon.y + onceIcon.height * onceIcon.scaleY / 2 - onceNumText.height / 2;

        tenIcon.x = tenBtn.x + tenBtn.width / 2 - tenIcon.width * tenIcon.scaleX / 2 - tenNumText.width / 2;
        tenIcon.y = tenBtn.y - 2 - tenIcon.height * tenIcon.scaleY;

        tenNumText.x = tenIcon.x + tenIcon.width * tenIcon.scaleX;
        tenNumText.y = tenIcon.y + tenIcon.height * tenIcon.scaleY / 2 - tenNumText.height / 2;

        this.addChild(onceIcon);
        this.addChild(onceNumText);
        this.addChild(tenIcon);
        this.addChild(tenNumText);
        this._isInited = true;
        this.refreshProfress();
        // this._lihuaMsg = {name:data.wname, gem:data.wgem};
        if(this._lihuaMsg){
            this.showLihua({name:this._lihuaMsg.name, gem:this._lihuaMsg.gem});
            // this.showLihua({name:"xxx", gem:999});
            this._lihuaMsg = null;
        }
        

    }
	protected getRequestData():{requestType:string,requestData:any}
	{	
	
		return {requestType:NetRequestConst.REQUEST_ACTIVITY_LOTTERYINFO,requestData:{activeId: this.aid+"-"+this.code}};
	}

	protected receiveData(data:{ret:boolean,data:any}):void
	{
		// let view = this;
		// view.api.setZoneRankInfo(data.data.data);
        if(data.ret){
            this.initInfo(data.data.data);
        }
        
	}
    private initInfo(data:any):void
    {
        // this._loopList = this._loopList.concat(data.lampwinfos);     //中大奖跑马灯
        // this._loopList = this._loopList.concat(data.lampcwardinfos);    //道具抽取跑马灯

        if(data.wuid){
            this._lihuaMsg = {name:data.wname, gem:data.wgem};
        }
        let loopStr = "";
        let msgObj = null;
        for(let i = 0; i < data.lampwinfos.length;i++){
            msgObj = data.lampwinfos[i];
            loopStr = LanguageManager.getlocal("acLotteryLoopMsg1",[msgObj[1],msgObj[2].toString()]);
            this._loopList.push(loopStr);
        }
        for(let i = 0; i < data.lampcwardinfos.length;i++){
            msgObj = data.lampcwardinfos[i];
            let randRewardStr = msgObj[3];
            let reward = GameData.formatRewardItem(randRewardStr)[0];

            loopStr = LanguageManager.getlocal("acLotteryLoopMsg2",[msgObj[1],reward.name,reward.num.toString()]);
            this._loopList.push(loopStr);
        }
        if(this.acVo.et - GameData.serverTime - 86400 * 1 <= 0){
            this._curPrizeNum ="0";
        } else {
            this._curPrizeNum = data.totalgem;
        }


    }
    //购买按钮点击
    private buyBtnHandler(num : number):void{
        if(this._isPlayAnim){
            return;
        }
        if(this.acVo.et - GameData.serverTime - 86400 * 1 <= 0){
            App.CommonUtil.showTip(LanguageManager.getlocal("buy_error"));
            return;
        }
        if(num == 10){
            if(Api.playerVoApi.getPlayerGem() < this.cfg.cost * num *this.cfg.discount){
                App.CommonUtil.showTip(LanguageManager.getlocal("gemNotEnough"));
			    return;
            }
        } else {
            if(Api.playerVoApi.getPlayerGem() < this.cfg.cost){
                App.CommonUtil.showTip(LanguageManager.getlocal("gemNotEnough"));
			    return;
            }
        }
        
        let view = this;
        NetManager.request(NetRequestConst.REQUEST_ACTIVITY_LOTTERYJOIN,{activeId : this.aid+"-"+this.code, stype : num == 10 ? 2 : 1});
    }
    private updateStatus(): void{
        if(this._isInited){
            this._curCountText.text = this.acVo.totalCount.toString();
            this._curCountText.x = this._curCountBg.x + this._curCountBg.width * this._curCountBg.scaleX / 2 - this._curCountText.width/2;
            

        }
         this.refreshProfress();
    }
    //抽奖获得物品回调
    protected lotteryJoinCallback(event:egret.Event)
    {
        if(event.data.data.ret != 0)
        {
            return;
        }
        let data = event.data.data.data;
        this._curPrizeNumText.text = data.nowtotalgem.toString();

        this._curPrizeNumText.x = this._centerBg.x + this._centerBg.width / 2 - (this._curPrizeNumText.width + this._curPrizeIcon.width * this._curPrizeIcon.scaleX)/2
        this._curPrizeNumText.y = this._curPrizeText.y + this._curPrizeText.height + 2;


        this._curPrizeIcon.x = this._curPrizeNumText.x + this._curPrizeNumText.width;
        this._curPrizeIcon.y = this._curPrizeNumText.y - 5;

        let rewards : string = data.randRewards || '';
        let poolk = data.poolk;
        // let rewards : string =      "6_1020_1|6_1354_1|6_1101_1|6_1352_1|8_2014_1|6_1206_1|8_2014_1|6_1354_1|6_1354_1|6_1352_1";
        let reward_arr = rewards.split('|');

        let realRewards: string = data.newRealRewards || "";
        // let realRewards: string =   "6_1020_1|6_1354_1|6_1101_1|6_1352_1|6_2004_10|6_1206_1|6_2004_10|6_1354_1|6_1354_1|6_1352_1";
        let realRewards_arr  = realRewards.split("|");
        
        

        if(data.wuid){
            this.showLihua({name:data.wname, gem:data.wgem});
        }

        
      
        if(reward_arr.length < 2 || poolk){
            this._selectImg.visible = true;
            let otherReward: string = this.cfg.getReward;
            this._isPlayAnim = true;
            this._onceBtn.setEnable(false);
            this._tenBtn.setEnable(false);
            // let rewardItem = GameData.formatRewardItem(rewards)[0];

            let curReward = reward_arr[0];
            let curIndex = 0;
            if(poolk){
               curIndex = poolk-1;
            }else{
                for(let i = 0;i < this.cfg.lotteryPool.length; i ++){
                    if(this.cfg.lotteryPool[i][0] == curReward){
                        curIndex = i;
                    }
                }
            }
            let turnTime = 2000 + Math.floor(Math.random() * 1000);
            let turnIndex = curIndex + (Math.floor(Math.random()*3)+3) * 12;
      
            let step =  0;
            this._tempObj = {x:0};
            egret.Tween.get(this._tempObj,{onChange:()=>{
                let curIndex = Math.floor(this._tempObj.x);
                this._selectImg.x = this._itemList[curIndex%12].x + 108 / 2 - 124/2;
                this._selectImg.y = this._itemList[curIndex%12].y + 108 / 2 - 124/2;
            }})
            .to({x: turnIndex},turnTime,egret.Ease.quadInOut);
    

            egret.Tween.get(this._selectImg)
            .wait(turnTime + 300)
            .to({alpha:0},50)
            .wait(50)
            .to({alpha:1},50)
            .wait(50)
            .to({alpha:0},50)
            .wait(50)
            .to({alpha:1},50)
            .wait(50)
            .to({alpha:0},50)
            .wait(50)
            .to({alpha:1},50)
            .wait(50)
            .to({alpha:0},50)
            .wait(50)
            .to({alpha:1},50)
            .wait(500)
            .call(()=>{
                this._isPlayAnim = false;
                this._onceBtn.setEnable(true);
                this._tenBtn.setEnable(true);

                if(reward_arr[0] != realRewards_arr[0]){
                    let rewardItemvo:RewardItemVo = GameData.formatRewardItem(rewards)[0];

                    let servantReward = null;
                    if(rewardItemvo.type == 8){
                        servantReward = Config.ServantCfg.getServantItemById(rewardItemvo.id);
                    } else if(rewardItemvo.type == 10){
                        servantReward = Config.WifeCfg.getWifeCfgById(rewardItemvo.id);
                    }

                    ViewController.getInstance().openView(ViewConst.POPUP.COMMONCHANGEOTHERREWARD,{"name":servantReward.name,"touch":servantReward.exchange,"message":"changeOtherRewardTip","callback":()=>{
                        if(data.packageMust){
                            ViewController.getInstance().openView(ViewConst.POPUP.ACLOTTERYREWARDVIEW,{"rewards":otherReward + "|" + data.packageMust,"otherRewards": data.packageRand,"isPlayAni":true});
                        }else{
                            ViewController.getInstance().openView(ViewConst.POPUP.COMMONREWARDPOPUPVIEW,{"rewards":realRewards,"otherRewards":otherReward,"isPlayAni":true,"needSort":true});
                        }
                    },"handler":this});
                 } else {
                     if(data.packageMust){
                        ViewController.getInstance().openView(ViewConst.POPUP.ACLOTTERYREWARDVIEW,{"rewards":otherReward + "|" + data.packageMust,"otherRewards": data.packageRand,"isPlayAni":true});
                    }else{
                        ViewController.getInstance().openView(ViewConst.POPUP.COMMONREWARDPOPUPVIEW,{"rewards":realRewards,"otherRewards":otherReward,"isPlayAni":true,"needSort":true});
                    }
                }

             });


        } else {
            let otherReward: string = this.cfg.getReward+"0";

            /*
            let rewards = data.rewards;
            
            if(rewards != this._nowReward)
            {
                let rewardItemvo:RewardItemVo = GameData.formatRewardItem(this._nowReward)[0];
                let servantReward = Config.ServantCfg.getServantItemById(rewardItemvo.id);
                ViewController.getInstance().openView(ViewConst.POPUP.COMMONCHANGEOTHERREWARD,{"name":servantReward.name,"touch":servantReward.exchange,"message":"changeOtherRewardTip","callback":()=>{
                    ViewController.getInstance().openView(ViewConst.POPUP.COMMONREWARDPOPUPVIEW,{"rewards":rewards,"isPlayAni":true});
                },"handler":this});
            }
            else
            {
                ViewController.getInstance().openView(ViewConst.POPUP.COMMONREWARDPOPUPVIEW,{"rewards":rewards,"isPlayAni":true});
            }
            */
            this._oRewards = otherReward;
            this._rRewards = realRewards;
            if( data.packageMust){
                this._oRewards = otherReward + "|" + data.packageMust;
                this._rRewards = data.packageRand;
            }
            this._changeList = [];
            for(let i = 0;i < reward_arr.length; i++){
                if(reward_arr[i] != realRewards_arr[i]){
                    this._changeList.push(reward_arr[i]);
                }
            }
            if(this._changeList.length > 0){
                this.changeGetCallback();
            } else {
                if( data.packageMust){
                    ViewController.getInstance().openView(ViewConst.POPUP.ACLOTTERYREWARDVIEW,{"rewards":this._oRewards,"otherRewards":this._rRewards,"isPlayAni":true});
                }else{
                    ViewController.getInstance().openView(ViewConst.POPUP.COMMONREWARDPOPUPVIEW,{"rewards":realRewards,"otherRewards":this._oRewards,"isPlayAni":true,"needSort":true});
                }
            }
        }
    }

    private changeGetCallback()
    {

        if(this._changeList.length > 0){
            let changeObj = this._changeList.pop();
            let rewardItemvo:RewardItemVo = GameData.formatRewardItem(changeObj)[0];
            let servantReward:Config.ServantItemCfg|Config.WifeItemCfg = null;
            //根据type得到红颜或者门课信息
            if(rewardItemvo.type == 8){
                servantReward = Config.ServantCfg.getServantItemById(rewardItemvo.id);
            } else if(rewardItemvo.type == 10){
                servantReward = Config.WifeCfg.getWifeCfgById(rewardItemvo.id);
            }
            if(servantReward!= null){
                ViewController.getInstance().openView(ViewConst.POPUP.COMMONCHANGEOTHERREWARD,{"name":servantReward.name,"touch":servantReward.exchange,"message":"changeOtherRewardTip","callback":this.changeGetCallback,"handler":this});
            }
        } else {
             if(this.code == "7" || this.code == "8"){
                ViewController.getInstance().openView(ViewConst.POPUP.ACLOTTERYREWARDVIEW,{"rewards":this._oRewards,"otherRewards":this._rRewards,"isPlayAni":true});
            }else{
                ViewController.getInstance().openView(ViewConst.POPUP.COMMONREWARDPOPUPVIEW,{"rewards":this._rRewards,"otherRewards":this._oRewards,"isPlayAni":true,"needSort":true});
            }
            this._rRewards = null;
            this._oRewards = null;
        }




    }
    //宝箱奖励领取回调
	protected rewardBoxClickhandlerCallBack(event:egret.Event)
	{

        //活动时间结束
		let deltaT = this.acVo.et - GameData.serverTime;
        if(deltaT < 0){
            App.CommonUtil.showTip(LanguageManager.getlocal("acPunishEnd"));
            return;
        }

        let data = event.data.data.data;
        if(!data){
            App.CommonUtil.showTip(LanguageManager.getlocal("collect_error"));
            return;
        }
        if(Number(this._curRewardBoxId) == 3){
            App.MessageHelper.dispatchEvent(MessageConst.MESSAGE_NOTICE_CHANGE_IMG);
        }

		let rewards = data.rewards;
		let rList = GameData.formatRewardItem(rewards);
		
		let boxImg = this.getChildByName("boxImg" + this._curRewardBoxId);
		let pos = boxImg.localToGlobal(boxImg.width/2,50);
        App.CommonUtil.playRewardFlyAction(rList,pos);
		this.refreshProfress();
	}
    public hide():void 
    {
    
        if(!this._isPlayAnim){
            super.hide();
        }
        
        

    }
        //每次领取奖励后，刷新进度条以及宝箱状态
	protected refreshProfress() : void
	{	
	
        if(!this._isInited){
            return;
        }
        let newPro =  this.getProgressPercent();
		let oldPro = this._progress.getPercent();
        if(newPro != oldPro){
            egret.Tween.get(this._progress,{loop:false}).to({percent:newPro},(newPro-oldPro)*5000);
        }

		
		let rewardList = this.cfg.lotteryNum;
		let rkeys = Object.keys(rewardList);
		for (var index = 0; index < rkeys.length; index++) {
			let tmpK = String(rkeys[index]);
			let boxImg = this.getChildByName("boxImg"+tmpK);
			let lightImg =  this.getChildByName("lightImg"+ tmpK);

			let rStatus = this.getBoxStatusById(tmpK);
			let imgres = "dailytask_box1_";
			if (index >1){
				imgres = "dailytask_box2_";
			}
			
			if (boxImg instanceof(BaseBitmap))
			{
				boxImg.texture = ResourceManager.getRes(imgres + rStatus);
			}
			
			if (rStatus == 2) //可领取状态需要添加背景光
			{	
				lightImg.visible = true;
				egret.Tween.get(lightImg,{loop:true}).to({rotation:lightImg.rotation+360},10000);
				egret.Tween.get(boxImg,{loop:true}).to({rotation:10},50).to({rotation:-10},100).to({rotation:10},100).to({rotation:0},50).wait(500);
			}else
			{
				lightImg.visible = false;
				egret.Tween.removeTweens(lightImg);
				egret.Tween.removeTweens(boxImg);
			}
		}
	}
    //判断宝箱状态 1未完成 2可领取 3已经领取
    protected getBoxStatusById(boxIndex)
	{
        let cfg = this.cfg;
        let vo = <AcLotteryVo>this.acVo;
		let rStatus = 1;
        if(vo.isCollected(Number(boxIndex)+1)){
            rStatus = 3;
        } else {
            let boxCfg = cfg.getBoxRewardById(Number(boxIndex));
            if (boxCfg.needNum <= vo.totalCount){
                rStatus = 2;
            }
        }

		return rStatus;
	}

    //奖励宝箱点击
    protected rewardBoxClickhandler(obj:any,param:any)
	{
        

        let boxRewardId = param;
		let status = this.getBoxStatusById(boxRewardId);

		/**
		 *  1未完成 2可领取 3已领取
		 */
		if (status == 2)
		{
			this._curRewardBoxId = boxRewardId;
			NetManager.request(NetRequestConst.REQUEST_ACTIVITY_LOTTERYNUMREWARD,{activeId : this.aid+"-"+this.code,numId : Number(boxRewardId) + 1});
		}
		else
		{
			ViewController.getInstance().openView(ViewConst.POPUP.ACLOTTERYBOXREWARDPOPUPVIEW,{type : this.aid, id : boxRewardId, aid: this.aid,code:this.code});
		}
    }
        //处理进度条进度值
	private getProgressPercent():number{
        // return 0.5;
        let curTurn = this.acVo.totalCount;
		let rewardList = this.cfg.lotteryNum;
		let rkeys = Object.keys(rewardList);
		if (curTurn == 0)
			return 0;
		if (curTurn >= rewardList[String(rkeys.length - 1)].needNum)
			return 100;

		let perV = 1 / rkeys.length;
		for (var index = 0; index < rkeys.length; index++) {
			if(curTurn <= rewardList[String(index)].needNum)
			{
				let result = perV * index;
				let tmpV1 = 0;
				if(index > 0)
				{
					tmpV1 = rewardList[String(index - 1)].needNum;
				}
				let tmpV2 = rewardList[String(index)].needNum;
				result += (curTurn-tmpV1) / (tmpV2 - tmpV1) * perV;
				return result;
			}
		}
    }
    //{name:xxx, gem:xxx}
    private showLihua(msg):void{
		let view = this;
		
        if(!this._lihua){
            this._lihua = new BaseDisplayObjectContainer();
            this._lihua.width = this._itemBg.width;
            this._lihua.height = this._itemBg.height;
            this._lihua.x = this._itemBg.x;
            this._lihua.y = this._itemBg.y;
            this.addChild(this._lihua);
        }

       
		let deviationNum  = 0;


		let param = {
            "1" : {color : 'hong', pos : [500,40+deviationNum], scale : 0.9, wait : 0},
			"2" : {color : 'huang', pos : [80,10+deviationNum], scale : 1.85, wait : 200},
			"3" : {color : 'huang', pos : [300,0+deviationNum], scale : 1.5, wait : 400},
			"4" : {color : 'lan', pos : [200,-50+deviationNum], scale : 2, wait : 650},
			"5" : {color : 'hong', pos : [40,60+deviationNum], scale : 1, wait : 900}
		};

		for(let i in param){
			if(view._lihua && !view._lihua.getChildByName(`lihua${i}`)){
				let unit = param[i];
				let lihuaclip = ComponentManager.getCustomMovieClip(`lihua_${unit.color}000`, 10, 115);
				lihuaclip.setScale(unit.scale);
				lihuaclip.name = `lihua${i}`;

				lihuaclip.x = unit.pos[0];
				lihuaclip.y = unit.pos[1];
  
 
				view._lihua.addChild(lihuaclip);
				egret.Tween.get(lihuaclip).wait(unit.wait).call(()=>{
 
					egret.Tween.removeTweens(lihuaclip);
					if(view._lihua){
						view._lihua.addChild(lihuaclip);
						lihuaclip.playWithTime(3);
                        lihuaclip.setEndCallBack(()=>{
                            this._lihua.removeChild(lihuaclip);
                        },this);
					}
				},view);
			}
		}
        this.showTip(LanguageManager.getlocal("acLotteryShowMsg",[msg.name,msg.gem.toString()]));
	}
    public showTip(message:string):void
		{
			let tipContainer:BaseDisplayObjectContainer = this._tipCon;
			let txtLine:number=1;
			if(!tipContainer)
			{
				let tipContainer:BaseDisplayObjectContainer=new BaseDisplayObjectContainer();
				let tipBg:BaseBitmap=BaseBitmap.create("public_tipbg");
				tipBg.setPosition(-tipBg.width/2,-tipBg.height/2 - 20);
                tipBg.height = 200;
				tipBg.name="tipBg";
				tipContainer.addChild(tipBg);
				let msgText:BaseTextField=ComponentManager.getTextField(message,34,TextFieldConst.COLOR_LIGHT_YELLOW);
				
                
                // msgText.width = 400;
				msgText.textAlign=egret.HorizontalAlign.CENTER;
				msgText.name="msgText";
				msgText.lineSpacing=10;
                msgText.setPosition(tipBg.x+(tipBg.width-msgText.width)/2,tipBg.y+(tipBg.height-msgText.height)/2);
				txtLine=msgText.numLines;
				tipContainer.addChild(msgText);
				tipContainer.setPosition(GameConfig.stageWidth/2,GameConfig.stageHeigth/2);
				LayerManager.msgLayer.addChild(tipContainer);
				this._tipCon=tipContainer;
			}
			else
			{
				let tipBg:BaseBitmap=<BaseBitmap>tipContainer.getChildByName("tipBg");
				if(!tipBg.texture || !tipBg.texture.bitmapData)
				{
					tipBg.texture=ResourceManager.getRes("public_tipbg");
				}
				let msgText:BaseTextField = <BaseTextField>this._tipCon.getChildByName("msgText");
				msgText.text=message;
            
				msgText.setPosition(tipBg.x+(tipBg.width-msgText.width)/2,tipBg.y+(tipBg.height-msgText.height)/2);
				tipContainer.setScale(1);
				tipContainer.alpha=1;
				egret.Tween.removeTweens(tipContainer);
				tipContainer.setPosition(GameConfig.stageWidth/2,GameConfig.stageHeigth/2);
				txtLine=msgText.numLines;
				if(!LayerManager.msgLayer.contains(tipContainer))
				{
					LayerManager.msgLayer.addChild(tipContainer);
				}
			}
			egret.Tween.get(this._tipCon).to({scaleX:1.1,scaleY:1.1},100).to({scaleX:1,scaleY:1},70).wait(2300*txtLine).to({alpha:0},200).call(function(tipContainer:BaseDisplayObjectContainer){
				if(tipContainer)
				{
					egret.Tween.removeTweens(tipContainer);
					if(LayerManager.msgLayer.contains(tipContainer))
					{
						LayerManager.msgLayer.removeChild(tipContainer);
					}
					tipContainer.setScale(1);
					tipContainer.alpha=1;
				}
			}.bind(this,this._tipCon),this);
		}
    private titleBtnHandler():void
    {
        let deltaT = this.acVo.et - GameData.serverTime;
        if(deltaT < 0){
            App.CommonUtil.showTip(LanguageManager.getlocal("acPunishEnd"));
            return;
        }
        ViewController.getInstance().openView(ViewConst.POPUP.ACLOTTERYPOPUPVIEW,{activeId:this.aid+"-"+this.code});
    }
    private initLoop():void
    {   
        // _loopList
        // _titleBar
        // _titleBarText
        if(this._loopList.length >0){
            this.nextLoop(0);


        } else {
            this._titleBarText.text = LanguageManager.getlocal("acLotteryLoopEmpty");
            this._titleBarText.x = this._titleBar.x + this._titleBar.width / 2 - this._titleBarText.width /2;
            this._titleBarText.y = this._titleBar.y + this._titleBar.height / 2 - this._titleBarText.height/2;

        }

    }
    //下一个跑马灯
    private nextLoop(index:number):void
    {
        if(index >= this._loopList.length){
            index = 0;
        }

        let str = this._loopList[index];
        this._titleBarText.text = str;
        this._titleBarText.x = this._titleBar.x + this._titleBar.width;
        this._titleBarText.y = this._titleBar.y + this._titleBar.height / 2 - this._titleBarText.height/2;
        let overX = this._titleBar.x - this._titleBarText.width;
        egret.Tween.removeTweens(this._titleBarText);
        egret.Tween.get(this._titleBarText).to({x:overX},10000)
        .call(()=>{
            this.nextLoop(index + 1);
        });

    }
    private tick():void
    {
        let t = this.acVo.et - GameData.serverTime - 86400 * 1;
        if(t < 0){
            t = 0;
            TickManager.removeTick(this.tick,this);
            this._titleTimeText.text = LanguageManager.getlocal("acLotteryActiveOver");
            this._titleTimeText.x = this._titleBtn.x + this._titleBtn.width / 2 - this._titleTimeText.width/2;
        } else {
            let timeTxt = App.DateUtil.getFormatBySecond(t,8);
            if(this.code == "7" || this.code == "8"){
                this._titleTimeText.text =  LanguageManager.getlocal("acLotteryTitleTime_7",[timeTxt]);
            }else{
                this._titleTimeText.text = LanguageManager.getlocal("acLotteryTitleTime",[timeTxt]);
            }
        }


    }
	protected getTitleBgName():string
	{
		return "commonview_db_04"
	}
    protected getRuleInfo():string
	{

		// return super.getRuleInfo();
        let ruleStr=this.getClassName().toLowerCase().replace("view","")+"RuleInfo"+this.code;
		if(LanguageManager.checkHasKey(ruleStr))
		{
			return ruleStr;
		}
		else
		{
			let bakRuleStr = this.getClassName().toLowerCase().replace("view","")+"RuleInfo";
            if(LanguageManager.checkHasKey(bakRuleStr))
            {
                return bakRuleStr;
            } 
		}
		return "";
    } 
    
    protected getResourceList():string[]
	{
		return super.getResourceList().concat([
            "itemeffect",
            "dailytask_box1_1","dailytask_box1_2","dailytask_box1_3",
            "dailytask_box2_1","dailytask_box2_2","dailytask_box2_3",
            "dailytask_box_light",
            "dailytask_dt_02",
            "dailytask_dt_01",
            "dailytask_dt_03",
            "activity_fnt",
            "itemicon1",
            "itemicon1001",
            "common_numbg"
        ]);
    } 



    
    public dispose():void
	{   
        App.MessageHelper.removeEventListener(MessageConst.MESSAGE_LOTTERY_REFRESHVO,this.updateStatus,this); 
        App.MessageHelper.removeEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_ACTIVITY_LOTTERYNUMREWARD),this.rewardBoxClickhandlerCallBack,this);
        App.MessageHelper.removeEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_ACTIVITY_LOTTERYJOIN),this.lotteryJoinCallback,this);

        TickManager.removeTick(this.tick,this);
        if(this._titleBarText){
            egret.Tween.removeTweens(this._titleBarText);
        }
        if(this._tempObj){
            egret.Tween.removeTweens(this._tempObj);
        }
        if(this._selectImg){
            egret.Tween.removeTweens(this._selectImg);
        }
        
        
        
        this._titleBg = null;
        this._titleBtn = null;
        this._titleTimeText = null;

        this._titleBar = null;
        this._titleBarText = null;
        this._curRewardBoxId = 0;
        this._itemBg = null;
        this._progress = null;
        this._itemList = [];
    //中间奖池信息背景
        this._centerBg = null;
    //中间奖池信息
        this._curPrizeText = null;
        this._curPrizeNumText  = null;
        this._curPrizeIcon = null;
        this._curPrizeNum   = "0";

    //抽取次数
        this._curCountText  = null;

        this._loopList = [];

        this._isPlayAnim = false;
        this._curCountBg = null;
        this._isInited = false;
        this._selectImg = null;
        this._lihua = null;
        this._lihuaMsg = null;
        this._tipCon = null;
        this._tempObj = null;
        this._onceBtn = null;
        this._tenBtn = null;
        this._changeList = [];
        this._rRewards = null;
        this._oRewards = null;
        super.dispose();
    }
}