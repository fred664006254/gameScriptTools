/**
 * 一键征战 纪录
 */
class ConquestInfoPopupView extends PopupView
{
    private scrollView:any =null;
    private _moveCountainer:BaseDisplayObjectContainer =null;
    private rewardArrList:Array<RewardItemVo> =[];
    private strArr:Array<string> = [];
    private iconArr:Array<RewardItemVo> = [];
    private _fire_lizi:particle.GravityParticleSystem;
    
	public constructor() 
	{
		super();
	}
    protected getResourceList():string[]
	{
		return super.getResourceList().concat(
        [
            "battle_win_word",
            "fire_flake_json",
            "battle_win_light",
            "fire_flake",
        ]);
	}
    protected isShowMask():boolean
	{
		return true;
	}
    protected getTitleStr():string
	{
		return null;
	}
     
	public initView():void
	{	
        this.viewBg.visible =false;
        let infoBg:BaseBitmap=BaseBitmap.create("public_9_wordbg2");
		infoBg.height=600;
		infoBg.setPosition(-35+GameData.popupviewOffsetX,20);
        infoBg.width=640;
        infoBg.height=700;
		this.addChildToContainer(infoBg);


        //胜利背景光效
        let winLight:BaseBitmap = BaseBitmap.create("battle_win_light");
		winLight.scaleY = 0.5;
		winLight.setPosition(50+GameData.popupviewOffsetX,-10);
		this.addChildToContainer(winLight);
        winLight.alpha = 0;
		egret.Tween.get(winLight).wait(100).to({alpha:1},100).wait(90).to({alpha:0},10);

        //胜利文字大小
        let winBitmap:BaseBitmap=BaseBitmap.create("battle_win_word");
		winBitmap.setPosition(0+GameData.popupviewOffsetX,-100);
		this.addChildToContainer(winBitmap);
        winBitmap.scaleX=2.5;
        winBitmap.scaleY=2.5;
    	egret.Tween.get(winBitmap).to({x:160+GameData.popupviewOffsetX,y:-40,scaleX:0.9, scaleY:0.9} ,120 ).to({x:160+GameData.popupviewOffsetX, y:-40, scaleX:1, scaleY:1 } ,50);

        //粒子效果
        this._fire_lizi = App.ParticleUtil.getParticle("fire_flake");
        this._fire_lizi.y =-150;
        this.addChildToContainer(this._fire_lizi);
        this.showAnim(); 

        this._moveCountainer =new BaseDisplayObjectContainer(); 
		this.addChildToContainer(this._moveCountainer);

        if(this.param&&this.param.data)
        {
            // var str = "6_1030_1|6_1020_1|5_1_355|14_1004_10|15_1004_30|12_210_10|14_1001_20|12_208_7|15_1001_20|6_1219_1|6_1205_3|14_1005_10|6_1217_1|15_1003_40|12_101_3|6_1203_1|14_1003_20|15_1002_40|6_1208_3|14_1002_10|6_1202_2|6_1210_3|6_1204_2|6_1209_4|12_209_10|12_207_5|6_1207_2|6_1204_2|6_1209_4|12_209_10|12_207_5|6_1207_2|6_1204_2|6_1209_4|12_209_10|12_207_5|6_1207_2|6_1204_2|6_1209_4|12_209_10|12_207_5|6_1207_2|6_1204_2|6_1209_4|12_209_10|12_207_5|6_1207_2"
            var rewards = this.param.data.rewards;
        }
        else
        {
            return;
        }

        let _windesTxt =ComponentManager.getTextField("",TextFieldConst.FONTSIZE_BUTTON_COMMON,TextFieldConst.COLOR_WHITE);
        _windesTxt.text  = LanguageManager.getlocal("conquestInfodes",[this.param.data.fightnum+""]);
        
        
        if(PlatformManager.checkIsEnLang()|| PlatformManager.checkIsRuLang()){
            _windesTxt.x = this.viewBg.width / 2 - _windesTxt.width/2;
            _windesTxt.y = 80;
        } else {
            _windesTxt.setPosition(110,80);
        }
        
        this.addChildToContainer(_windesTxt);

         
        let itemContainer:BaseDisplayObjectContainer=new BaseDisplayObjectContainer();
        let itemStringContainer:BaseDisplayObjectContainer=new BaseDisplayObjectContainer();
        this.rewardArrList =[];
        this.rewardArrList = GameData.formatRewardItem(rewards); 
      
        this.rewardArrList.sort(function(a: any,b: any):number
        {
            if(a.type > b.type) return 1;
            else if(a.type == b.type) return 0;
            return -1;
        });

        let l:number=this.rewardArrList.length;
        let scaleNum:number=0.88;
        var newnum :number =0;
        this.strArr =[];
        this.iconArr =[];

        if(this.param.data&&this.param.data.batchpoint)
        { 
             var str =LanguageManager.getlocal("conquestpointsdes",[this.param.data.batchpoint+""])
             this.strArr.push(str);
        } 

        for(let i:number=0;i<l;i++)
        {
            if(this.rewardArrList[i].type==6)
            {
                this.iconArr.push(this.rewardArrList[i]);
            }
            else
            {  
                 //红颜
                if(this.rewardArrList[i].type==12)
                {
                    let wifeCfg:Config.WifeItemCfg=Config.WifeCfg.getWifeCfgById(this.rewardArrList[i].id);
                    this.strArr.push(wifeCfg.name+this.rewardArrList[i].tipMessage);
              
                }
                //门客
                else if(this.rewardArrList[i].type==14||this.rewardArrList[i].type==15)
                {
                    let servantCfg =Config.ServantCfg.getServantItemById(this.rewardArrList[i].id);
                    this.strArr.push(servantCfg.name+this.rewardArrList[i].message);
                }
                else
                {
                    this.strArr.push(this.rewardArrList[i].name+this.rewardArrList[i].tipMessage);
                }
            }
        }   
       
        //文字字段
        if(this.strArr.length>0)
        {
            for(let j:number =0;j<this.strArr.length;j++)
            {
                let _desTxt =	ComponentManager.getTextField("0",TextFieldConst.FONTSIZE_CONTENT_COMMON,TextFieldConst.COLOR_WARN_GREEN);
                _desTxt.text =this.strArr[j];
                var num=j%2;
                if(PlatformManager.checkIsEnLang()|| PlatformManager.checkIsRuLang()){
                    _desTxt.setPosition(15+(290)*num,(_desTxt.height+20)*Math.floor(j/2)-20);
                } else {
                    _desTxt.setPosition(80+(260)*num,(_desTxt.height+20)*Math.floor(j/2)-20);
                }
                
                itemStringContainer.addChild(_desTxt);
            }
        }
        
        itemStringContainer.setPosition(0,-10);
        this._moveCountainer.addChild(itemStringContainer);

       this.iconArr.sort(function(a: any,b: any):number
        {
            if(a.id > b.id) return 1;
            else if(a.id == b.id) return 0;
            return -1;
        });

        //icon 图标
        for(let i:number=0;i<this.iconArr.length;i++)
        {
            let icon:BaseDisplayObjectContainer=GameData.getItemIcon(this.iconArr[i],true);
            var num= i%4;
            icon.setPosition((icon.width+5)*num+GameData.popupviewOffsetX,(icon.height+20)*Math.floor(i/4));
            icon.scaleX =scaleNum;
            icon.scaleY =scaleNum;
            itemContainer.addChild(icon);
            newnum =(icon.height+20)*Math.floor(i/5);
        }
        itemContainer.setPosition(80,itemStringContainer.y+50+itemStringContainer.height);
        this._moveCountainer.addChild(itemContainer);
        this._moveCountainer.y =_windesTxt.y;
        this._moveCountainer.height =this._moveCountainer.height+100;

        let moveImage = BaseBitmap.create("public_9_bg28");
        moveImage.width =this._moveCountainer.width;
        moveImage.height =this._moveCountainer.height; 
        moveImage.x=80+GameData.popupviewOffsetX;
        moveImage.alpha = 0;
        this._moveCountainer.addChild(moveImage); 
        this._moveCountainer.setChildIndex(moveImage,0);
        // this._moveCountainer.y = _windesTxt.y//+10;

        let scrollRect = new egret.Rectangle(0,0,640,450);
        if(this.scrollView==null)
		{
			this.scrollView =ComponentManager.getScrollView(this._moveCountainer,scrollRect);
			this.scrollView.x=10;
			this.scrollView.y=_windesTxt.y+50
			this.addChildToContainer(this.scrollView);
		} 
	}

    private showAnim():void
	{	
        if(this._fire_lizi)
        {
            this._fire_lizi.start();
            let tmpthis  = this;
            egret.Tween.get(this._fire_lizi,{loop:false}).wait(500).to({alpha:0},200).call(function(){
                    if (this._fire_lizi){
                        tmpthis.removeChildFromContainer(this._fire_lizi)
                        this._fire_lizi = null;
                    }
                });
        }
	
	}
    
     protected resetBgSize():void
    {
        super.resetBgSize(); 
        this.closeBtn.y = this.viewBg.y+37;
        this.closeBtn.x =this.viewBg.x +this.viewBg.width-80+37-GameData.popupviewOffsetX;
    }

	public dispose():void
    {
         this._moveCountainer=null;
         this.rewardArrList=[];
         this.scrollView=null;
         this.strArr =[];
         this.iconArr =[];
         this._fire_lizi =null;
	    super.dispose();
	}
}