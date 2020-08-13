/**
 * 仕途之路 列传本纪
 * author shaoliang
 * date 2020/2/6
 * @class BiographyView
 */

class BiographyShowView  extends CommonView
{   
    private _playerDragon:BaseLoadDragonBones|BaseDisplayObjectContainer = null;
    private _isShowing:boolean = false;

    private _nodeContainer:BaseDisplayObjectContainer;
    protected _clickNum = 0;
    protected _hideSt=null;
    protected _rewardStr = "";

    public constructor() 
    {
        super();
	}

    protected getResourceList():string[]
	{   

        let resArray:string[] = [
             "biographyview_showbg","biography_playernamebg","biography_rewardbg"
        ];
        let data = this.info;
        let cfg = Config.BiographyCfg.getCfgBgId(data.id);
        if (cfg.type == 1)
        {
            // resArray.push("biography_type1_add");
            resArray.push("biography_type1_open");
            resArray.push("biography_type1_show");
        }
        else
        {
            // resArray.push("biography_type2_add");
            resArray.push("biography_type2_open");
            resArray.push("biography_type2_show");
        }
        
		return super.getResourceList().concat(resArray);
	}

    protected getBgName():string
	{
		return "biographyview_showbg";
	}

    protected getTitleBgName():string
	{
		return null;
	}

	protected getTitleStr():string
	{
		return null;
	}

    protected getCloseBtnName():string
	{
		return null;
	}

    private get info():any
    {
        return Api.biographyVoApi.showInfo;
    }

    public initView():void
    {
        this.viewBg.y = (GameConfig.stageHeigth-this.viewBg.height)/2;

        let titleId = null;
        if (this.info.title && this.info.title.clothes && this.info.title.clothes!="")
        {
            titleId  = this.info.title.clothes;
        }

        let tcfg = Config.TitleCfg.getTitleCfgById(titleId);
        let resPath = "palace_db_" + titleId + (tcfg && tcfg.titleType == 7 ? `_${Api.playerVoApi.getUserSex(this.info.pic)}` : ``);
        if (titleId && App.CommonUtil.check_dragon() && !Api.switchVoApi.checkCloseBone() && RES.hasRes(resPath+"_ske") ) {
           
            let loadIdx:number=0;
			let myHair = null;
            this._playerDragon = new BaseDisplayObjectContainer();
            this._playerDragon.x = GameConfig.stageWidth/2;
            this._playerDragon.y = GameConfig.stageHeigth/2-400;
            this.addChild(this._playerDragon);

            let roleinfo = this.info.title;
            let level = roleinfo.clv;
            let role=App.CommonUtil.getPlayerDragonRole(titleId, this.info.pic, level);
            role.name = "role";
            this._playerDragon.addChild(role);

            role.setPosition(0,40);
            // myHead.setPosition(-65,0);
            // myHair.setPosition(-65+23.5,0);
            // myHead.name = 'myHead';
            // this._playerDragon.addChild(myHead)
        } else {
            
            if (!titleId)
            {
                titleId = this.info.level;
            }
            let roleinfo = this.info.title;
            let level = roleinfo.clv;
            this._playerDragon = Api.playerVoApi.getPlayerPortrait(titleId,this.info.pic,0,false,null,null,level);
            this._playerDragon.x = GameConfig.stageWidth/ 2 - this._playerDragon.width * this._playerDragon.scaleX/2;
            this._playerDragon.y = GameConfig.stageHeigth/2-400;

            this.addChild(this._playerDragon);
        }

        let closeText:BaseTextField=ComponentManager.getTextField(LanguageManager.getlocal("childeventclosetip"),TextFieldConst.FONTSIZE_CONTENT_COMMON,TextFieldConst.COLOR_LIGHT_YELLOW);
        closeText.textAlign = egret.HorizontalAlign.CENTER;
        closeText.setPosition((GameConfig.stageWidth-closeText.width)/2,GameConfig.stageHeigth-50);
        this.addChild(closeText);


        let data = this.info;
        let cfg = Config.BiographyCfg.getCfgBgId(data.id);

        let container = new BaseDisplayObjectContainer();

        let playernamebg = BaseBitmap.create("biography_playernamebg");
        playernamebg.setPosition(GameConfig.stageWidth/2-playernamebg.width/2,0);
        container.addChild(playernamebg);
       
        let playername = ComponentManager.getTextField(data.name,TextFieldConst.FONTSIZE_TITLE_SMALL,TextFieldConst.COLOR_WHITE);
        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterverticalCenter,playername,playernamebg);
        container.addChild(playername);

        let serverstr = Api.mergeServerVoApi.getAfterMergeSeverName(data.uid);
        let servertext = ComponentManager.getTextField(serverstr,TextFieldConst.FONTSIZE_CONTENT_SMALL,TextFieldConst.COLOR_BROWN);
        servertext.setPosition(GameConfig.stageWidth/2-servertext.width/2,playernamebg.y+playernamebg.height+8);
        container.addChild(servertext);

        let title = ComponentManager.getTextField(cfg.name,TextFieldConst.FONTSIZE_CONTENT_COMMON,0xad3519);
        title.x = GameConfig.stageWidth/2-title.width/2;
        title.y = servertext.y+servertext.height+10;
        container.addChild(title);

        // let ornament = BaseBitmap.create("biography_ornament");
        // ornament.width = playername.width+ornament.width;
        // ornament.setPosition(GameConfig.stageWidth/2-ornament.width/2,playername.y+playername.height/2-ornament.height/2);
        // container.addChild(ornament);
      

        let desctext = ComponentManager.getTextField(cfg.desc,TextFieldConst.FONTSIZE_CONTENT_COMMON,TextFieldConst.COLOR_WARN_YELLOW2);
        desctext.width = 380;
        desctext.lineSpacing = 5;
        desctext.textAlign = egret.HorizontalAlign.CENTER;
        desctext.setPosition(GameConfig.stageWidth/2-desctext.width/2,title.y+title.height+17);
        container.addChild(desctext);

        let datestr = App.DateUtil.getFormatBySecond(data.st,20);
        let datetext = ComponentManager.getTextField(LanguageManager.getlocal("biography_date",[datestr]),TextFieldConst.FONTSIZE_CONTENT_COMMON,TextFieldConst.COLOR_BROWN);
        datetext.setPosition(100,190);
        container.addChild(datetext);

        let lastdatestr:string;
        if (cfg.lastTime)
        {
            lastdatestr = App.DateUtil.getFormatBySecond(data.st+cfg.lastTime*86400,20);
             let lastdatetext = ComponentManager.getTextField(LanguageManager.getlocal("biography_lastdate",[lastdatestr]),TextFieldConst.FONTSIZE_CONTENT_COMMON,TextFieldConst.COLOR_BROWN);
            lastdatetext.setPosition(GameConfig.stageWidth-datetext.x-lastdatetext.width,datetext.y);
            container.addChild(lastdatetext);
        }
        else
        {
            lastdatestr = LanguageManager.getlocal("biography_forever");
             let lastdatetext = ComponentManager.getTextField(lastdatestr,TextFieldConst.FONTSIZE_CONTENT_COMMON,TextFieldConst.COLOR_BROWN);
            lastdatetext.setPosition(GameConfig.stageWidth-datetext.x-datetext.width/2-lastdatetext.width/2,datetext.y);
            container.addChild(lastdatetext);
        }
       
        let offy =  (GameConfig.stageHeigth-960)*0.3;
        container.y = GameConfig.stageHeigth/2+148 +offy;
        this._isShowing = true;
        let view = this;
        if (cfg.type == 1)
        {   

            let clip = ComponentManager.getCustomMovieClip("biography_type1_bookopen",7,100);
            clip.y = GameConfig.stageHeigth/2+40+offy;

            let clip2 = ComponentManager.getCustomMovieClip("biography_type1_show",8,100);
            clip2.y = clip.y + 8;

            // let addclip = ComponentManager.getCustomMovieClip("biography_type1_add",10,100);
            // addclip.blendMode = egret.BlendMode.ADD;
            // addclip.setPosition(50+30,GameConfig.stageHeigth/2+85);
            // addclip.setScale(2);

            clip.setFrameEvent(5,()=>{
                egret.Tween.get(container).to({alpha:1},500);
                clip2.playWithTime(0);
            },this);
            clip.setEndCallBack(()=>{
            
                clip.dispose();
                // addclip.playWithTime(0);
                view._isShowing = false;
            },this);
            clip.playWithTime(1);
           
            this.addChild(clip2);
            this.addChild(clip);
            this.addChild(container);
            // this.addChild(addclip);
            container.x = 30;
            container.alpha = 0;
        }
        else
        {
            // let showarray:string[] = [];
            // for (let i =1 ;i<=7; i++)
            // {
            //     showarray.push('biography_type2_show'+i);
            // }

            let openarray:string[] = [];
            for (let i =2 ;i<=9; i++)
            {
                openarray.push('biography_type2_open'+i);
            }

            let clip = ComponentManager.getCustomMovieClip("biography_type2_open",1,100);
            clip.setScale(2);
            clip.setPosition(-320,GameConfig.stageHeigth/2+40-275+offy);
            clip.playWithTime(1);

            let clip2 = ComponentManager.getCustomMovieClip("biography_type2_show",7,100);
            clip2.y = GameConfig.stageHeigth/2+40+18+offy;

            let showopen = function()
            {   
                clip.frameImages = openarray;
                clip.playWithTime(1);
                clip.setFrameEvent(5,()=>{
                    egret.Tween.get(container).to({alpha:1},500);
                    clip2.playWithTime(0);
                },view);
                clip.setEndCallBack(()=>{

                    clip.dispose();
                    // addclip.playWithTime(0);
                    view._isShowing = false;
                },view);
            }

            clip.setEndCallBack(()=>{
                egret.Tween.get(clip).to({scaleX:1,scaleY:1,x:0,y:GameConfig.stageHeigth/2+23+offy},500).call(showopen);

            },this);

            // let addclip = ComponentManager.getCustomMovieClip("biography_type2_add",10,100);
            // addclip.blendMode = egret.BlendMode.ADD;
            // addclip.setPosition(30,GameConfig.stageHeigth/2+85);
            // addclip.setScale(2.2);

            this.addChild(clip2);
            this.addChild(clip);
            this.addChild(container);
            // this.addChild(addclip);
            container.alpha = 0;

        }
        //寻访奖励
        // if ()
        // {
        //     let rList = GameData.formatRewardItem(data.rewards);
        //     App.CommonUtil.playRewardFlyAction(rList);
        // }
        
        //膜拜奖励
        if (Api.biographyVoApi.showNum || data.rewards)
        {   
            this._playerDragon.y +=50;

            this._nodeContainer = new BaseDisplayObjectContainer();
            this._nodeContainer.alpha = 0;
            this.addChild(this._nodeContainer);
            this.touchEnabled = false;

            let topTxtBg = BaseBitmap.create("public_9_bg25");
            topTxtBg.width = 490;
            topTxtBg.height = 130;
            topTxtBg.x = GameConfig.stageWidth/2-270;
            topTxtBg.y = 20;
            this._nodeContainer.addChild(topTxtBg);

            let tailBM = BaseBitmap.create("public_9_bg25_tail");
            tailBM.setPosition(topTxtBg.x + 330, topTxtBg.y + topTxtBg.height - 3);
            this._nodeContainer.addChild(tailBM);

            let txt = ComponentManager.getTextField("",TextFieldConst.FONTSIZE_CONTENT_SMALL,TextFieldConst.COLOR_BLACK);
            txt.multiline = true;
            txt.lineSpacing = 5;
            txt.width = topTxtBg.width - 40;
            txt.x = topTxtBg.x + 20;
            txt.y = topTxtBg.y + 20;
            this._nodeContainer.addChild(txt);

            let resBg = BaseBitmap.create("biography_rewardbg");
            resBg.x = topTxtBg.x + 355;
            resBg.y = topTxtBg.y + 80;
            this._nodeContainer.addChild(resBg);


            let getNum = 0;
            let goldIcon:BaseLoadBitmap = null;
            if (Api.biographyVoApi.showNum)
            {
                getNum = Api.biographyVoApi.showNum;
                goldIcon=BaseLoadBitmap.create("public_icon5");
                this._rewardStr = "5_5_"+ getNum;
            }
            else if (data.rewards)
            {
                let vo = GameData.formatRewardItem(data.rewards)[0];
                this._rewardStr = data.rewards;
                getNum = vo.num;
                goldIcon = BaseLoadBitmap.create(vo.icon);
                goldIcon.width = 50;
                goldIcon.height = 50;
            }
            
            goldIcon.y = resBg.y + resBg.height/2-25;
            goldIcon.x = resBg.x - 10;
            
            this._nodeContainer.addChild(goldIcon);
            
            

            let goldTxt = ComponentManager.getTextField("",TextFieldConst.FONTSIZE_CONTENT_SMALL,TextFieldConst.COLOR_WHITE);
            goldTxt.text = String(getNum);
            goldTxt.x = goldIcon.x + 50;
            goldTxt.y = resBg.y + resBg.height/2 - goldTxt.height/2;
            this._nodeContainer.addChild(goldTxt);

           

            let tmpThis = this;
            let rnd = App.MathUtil.getRandom(1,3);
            let text =  LanguageManager.getlocal("biographyDialogue"+rnd);
            if(PlatformManager.checkIsThSp() || PlatformManager.checkIsEnLang())
            {
                this._nodeContainer.alpha = 1;
                txt.text = text;
            }
            else
            {
                egret.Tween.get(this._nodeContainer,{loop:false}).to({alpha:1},700).call(function(){
                tmpThis.typerEffect(txt,text);
                tmpThis.touchEnabled = false;
            });
            }
        
        }

        if (this._rewardStr)
        {
            this.addTouchTap(this.clickHandler,this)
        }
        else
        {
            this.addTouchTap(this.touchTap,this,null);
        }
    }

    protected typerEffect(obj,content:string = "",interval:number = 200,backFun:Function = null):void{
        var strArr:Array<any> = content.split("");
        var len:number = strArr.length;
        for (var i = 0; i < len; i++){
            egret.setTimeout(function () {              
                obj.appendText(strArr[Number(this)]);
                if ((Number(this) >= len - 1) && (backFun != null)) {
                    backFun();
                }
            }, i, interval*i);              
        }
    }

    private touchTap():void
    {   
        if (this._isShowing)
        {
            return;
        }
        this.hide();
    }

    public hide():void
	{

		let rData = Api.wifeVoApi.getWaitShowWife();
		if(rData){
			
			Api.verifySpecialReward(rData.unlockWife,false);
			Api.verifySpecialReward(rData.unlockServant,true);
			Api.openSpecialView();
		}

		super.hide();

        Api.biographyVoApi.checkShowRewars();
	}

    protected clickHandler()
    {
        //飘奖励
        if( this._clickNum == 0)
        {
            let rList = GameData.formatRewardItem(this._rewardStr);
            App.CommonUtil.playRewardFlyAction(rList);
        }
        else if( this._clickNum == 1)
        {
            this._hideSt = egret.setTimeout(this.hideSelf,this,500);
        }
        this._clickNum ++;
    }
    protected hideSelf()
    {
        egret.clearTimeout(this._hideSt);
        super.hide();
    }

    public dispose():void
	{
        Api.biographyVoApi.showInfo = null;
        Api.biographyVoApi.showNum = 0;
        this._playerDragon = null;
        this._isShowing = false;

         this._nodeContainer = null;
        this._clickNum = 0;
        this._hideSt = null;
        this._rewardStr = "";

        super.dispose();
    }
}