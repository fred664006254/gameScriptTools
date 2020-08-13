/**
 * 港台周年庆
 * date 2018/10/17
 * @class AcTwAnniversaryView
 */
class AcGroupCentralmarketView extends AcGroupCommonView
{
    private _scrollList:ScrollList = null; 
    private _rewardTime: BaseTextField = null;
    private _activityTimerText: BaseTextField = null;
    private _activityDes: BaseTextField = null;
    private _acCDTxt: BaseTextField = null;
    private _activityDes2: BaseTextField = null;
    private _chrargeType:number = 0;
    private _namePicArr:Array<any> =[];
    private _nameArr:Array<string> =["Inn","Bank","PostStation","GamblingHouse","Tournament","BlackMarket"];
    private _viewNameArr:Array<string> =["hotel","bankBox","courier","gamble","marry","blackMarket"];

    private _bubble_arr=null;
    private _cfg =null; 
    private acList=null;
    private nameKeyStr=[];
    private indexArr:Array<number> =[];
    private dotArr:Array<BaseBitmap> =[];
    private redDotArr:Array<number>=[];
    public constructor()
    {
        super();
    }   
    
    protected initBg():void
	{
		let bgName:string=this.getBgName();
		if(bgName)
		{
			this.viewBg = BaseLoadBitmap.create(bgName); 
            this.addChild(this.viewBg);
            this.viewBg.width = GameConfig.stageWidth;
            this.height = GameConfig.stageHeigth; 
            this.viewBg.y = Math.floor(GameConfig.stageHeigth - 1136);
		}  
	}

    protected initView()
    {   
        App.MessageHelper.addEventListener(MessageConst.MESSAGE_ANNIVERS_REFRESH,this.refreshType,this);
        this.initActiveList();
        
        let cfg =  <Config.AcCfg.TwAnniversaryCfg>Config.AcCfg.getCfgByActivityIdAndCode(this.aid, this.code);
        this._cfg =cfg;

        let vo = this.acVo;
 
        var pos_arr = 
        {
            1 : {buildId : 1, buildPos : [0,647] , namePos :[24,609]},
            2 : {buildId : 2, buildPos :  [28,521], namePos :[264,504]},
            3 : {buildId : 3, buildPos : [277,416],namePos:[404,344]},
            4 : {buildId : 4, buildPos : [454,486] , namePos :[563,378]},
            5 : {buildId : 5, buildPos : [221,696], namePos :[486,626]},
            6 : {buildId : 6, buildPos : [0,815], namePos:[165,872]},
        }
        if (PlatformManager.checkIsEnLang()) {
            pos_arr =
                {
                    1: { buildId: 1, buildPos: [0, 647], namePos: [22, 612] },
                    2: { buildId: 2, buildPos: [28, 521], namePos: [99, 477] },
                    3: { buildId: 3, buildPos: [277, 416], namePos: [273, 378] },
                    4: { buildId: 4, buildPos: [454, 486], namePos: [491, 448] },
                    5: { buildId: 5, buildPos: [221, 696], namePos: [309, 682] },
                    6: { buildId: 6, buildPos: [0, 815], namePos: [10, 874] },
                }
        }
 
          for(let i in pos_arr)
          {
            let unit = pos_arr[i];
            let buildPic = BaseBitmap.create(`twscene_${unit.buildId}`);
            buildPic.x = unit.buildPos[0];
            buildPic.y = unit.buildPos[1]+ Math.floor(this.viewBg.y); 
            buildPic.scaleX=buildPic.scaleY =4;
            buildPic.touchEnabled =true;
            let _index =Number(i)-1;
            buildPic.name = this._viewNameArr[_index]; 
            buildPic.alpha =0;
            buildPic.addTouch(this.onNPCTouchHandler,this,null,true);
            this.addChild(buildPic); 

            let namePic = BaseBitmap.create(`brand_${unit.buildId}`);
            namePic.x = unit.namePos[0];
            namePic.y = unit.namePos[1]+ Math.floor(this.viewBg.y);  
            namePic.name = this._viewNameArr[_index];
            namePic.alpha=1;
            this._namePicArr.push(namePic);
            namePic.addTouch(this.onNPCTouchHandler,this,null,true); 
            this.addChild(namePic);
            // if(Number(i) == 4){
            //     namePic.width = namePic.height = 300;
            //     buildPic.width = buildPic.height = 300;
            // }

            let dot = BaseBitmap.create(`public_dot2`);
            dot.setScale(0.88);
            dot.x =namePic.x+21;
            if(PlatformManager.checkIsEnLang())
            {
                 dot.x = namePic.x+namePic.width-24;
            }
            dot.y =namePic.y-5;
            dot.name =namePic.name;
            dot.visible =false;
            this.dotArr.push(dot);
            this.addChild(dot);


            App.DisplayUtil.changeToGray(namePic); 
            if(this.nameKeyStr.indexOf(buildPic.name)>=0)
            {
                var currentVo =this.acList[buildPic.name];
                if(currentVo.isStart)
                {
                    App.DisplayUtil.changeToNormal(namePic);
                }
            }
          } 
           
        var bubble_arr = 
         {
            1 : {bubbleId : 1, bubbleIdPos : [0,592]},
            2 : {bubbleId : 1, bubbleIdPos : [57,455]},
            3 : {bubbleId : 1, bubbleIdPos : [209,353]},
            4 : {bubbleId : 1, bubbleIdPos : [398,434]},  
            5 : {bubbleId : 1, bubbleIdPos : [265,646]},  
            6 : {bubbleId : 1, bubbleIdPos : [0,818]},
            
         }
        this._bubble_arr =bubble_arr; 
        this.refreshType(); 
    } 
    private initActiveList():void
    {   
        this.acList  =[];
        this.nameKeyStr =[];
        this.redDotArr=[];
        this.indexArr =[];
        this.acList  =  this.acVo.getAcVoList();  
        for(let a in this.acList)
        {
            if(this.acList[a]&&this.acList[a].aid)
            {
                let aidStr =this.acList[a].aid;
                this.nameKeyStr.push(aidStr); 
                var currentVo = this.acList[a];
                if(this._viewNameArr.indexOf(aidStr)!=-1)
                {
                    if(currentVo.isShowRedDot==true&&currentVo.isStart)//活动有可以领取奖励的优先播放气泡
                    {
                        let num =this._viewNameArr.indexOf(aidStr); 
                        this.redDotArr.push(num);
                    }
                    else if(currentVo.isStart)
                    {
                         let num =this._viewNameArr.indexOf(aidStr);
                         this.indexArr.push(num);
                    }  
                } 
            }  
        }
    }

    protected tick()
    {       
        this.initActiveList();
        this.refreshType();
        if( GameData.serverTime%15 == 0)
        {
            this.initBubbleTip();
        }  
    }

    private refreshType():void
    {
        for(var i:number =0; i<this._namePicArr.length; i++)
        { 
            let buildPic = null;
            buildPic = this._namePicArr[i]; 
            if(this.nameKeyStr.indexOf(buildPic.name)>=0)
            {
                var currentVo =this.acList[buildPic.name];
                if(currentVo.isStart)
                {
                    App.DisplayUtil.changeToNormal(buildPic);
                }
                else
                {
                    App.DisplayUtil.changeToGray(buildPic);
                }  

                //红点
                for(var j:number=0; j< this.dotArr.length;j++)
                {
                    if(this.dotArr[j].name==currentVo.aid)
                    {
                       if(currentVo.isShowRedDot==true)
                       {
                           this.dotArr[j].visible= true;
                       }
                       else
                       {
                            this.dotArr[j].visible= false;
                       }
                    } 
                } 
            }     
        }    
    }
    
    private initBubbleTip():void
    {    
      
        let arr = this.indexArr;// 解锁的建筑 
        let isHot:number=1;
        let boo =false;
        if(this.redDotArr.length>=1)
        {
            arr =this.redDotArr;
            isHot=2;
            boo =true;
        }
        else
        {
            boo =false;
        }

        if(arr.length<=0)
        {
            return;
        }

        let num =App.MathUtil.getRandom(0,arr.length);
        let newIndex = arr[num];
        let currDubble =this._bubble_arr[newIndex+1].bubbleIdPos; ;

        let bulle:AcBubbleTip = new AcBubbleTip(); 
        let qpstr = this._nameArr[newIndex];
        bulle.init(qpstr,isHot,boo);	
        let npcNameSp = this._namePicArr[newIndex];  
        bulle.x=0;
        bulle.setPosition(currDubble[0],currDubble[1]+ Math.floor(this.viewBg.y));
        this.addChild(bulle);
    }
    private onNPCTouchHandler(e:egret.TouchEvent):void
	{
		if(e.type!=egret.TouchEvent.TOUCH_BEGIN&&e.type!=egret.TouchEvent.TOUCH_CANCEL&&e.type!=egret.TouchEvent.TOUCH_END)
		{
			return;
		}
		if(e.type==egret.TouchEvent.TOUCH_BEGIN)
		{   
             if(e.currentTarget.alpha!=1)
            {
                e.currentTarget.alpha=0.3;
            }
	      
        }
        else if(e.type==egret.TouchEvent.TOUCH_CANCEL)
		{   
            if(e.currentTarget.alpha!=1)
            {
                e.currentTarget.alpha=0;
            }
           
        }
        if(e.type==egret.TouchEvent.TOUCH_END)
        {   
            if(e.currentTarget.alpha!=1)
            {
                e.currentTarget.alpha=0;
            }
         
            let viewName =e.currentTarget.name;  

            if(this.nameKeyStr.indexOf(viewName)>=0)
            {
               var currentVo =this.acList[viewName];
               if(currentVo.isStart)
               {
                    let newViewName = App.StringUtil.firstCharToUper(viewName) ;
                    if(egret.getDefinitionByName("Ac"+newViewName + "View"))
                    { 
                        ViewController.getInstance().openView("Ac"+newViewName+ "View",currentVo.code);   
                        // ViewController.getInstance().openView("Ac"+newViewName+ "View",{
                        //     code:currentVo.code,
                        //     aid:currentVo.aid,
                        // });   
                    }
                    else
                    {   
                        let str =LanguageManager.getlocal("acGroupCentralmarketEndDes");
                        App.CommonUtil.showTip(str);
                        return;
                    }
               } 
               else if(currentVo.isPreview)
                {
                    let nameStr =currentVo.aid; 
                    if(currentVo.st>0)
                    {
                        let str = LanguageManager.getlocal(nameStr+"timerDes",[currentVo.getPreviewTime()]);
                        App.CommonUtil.showTip(str);
                        return; 
                    } 
                }
                else
                {
                    let str =LanguageManager.getlocal("acGroupCentralmarketEndDes");
                    App.CommonUtil.showTip(str);
                    return;
                } 
            }
            else
            {
                let str =LanguageManager.getlocal("acGroupCentralmarketEndDes");
                App.CommonUtil.showTip(str);
                return;
            } 
        }
    } 

    protected getBgName():string
	{
		return "ac_twAnniversarybg_1";
	} 
    
    protected getResourceList():string[]
	{
		return super.getResourceList().concat([
            
           "ac_twAnniversarybg_1", 
           "ac_tw_bubble",
           "forpeople_top"
        ]);
    }   

    public dispose():void
	{    
        App.MessageHelper.removeEventListener(MessageConst.MESSAGE_ANNIVERS_REFRESH,this.refreshType,this);
        this._namePicArr =[]; 
        super.dispose();
        this.nameKeyStr =[];
        this.acList =null;
        this.indexArr =[];
        this.dotArr =[];
    }

    
}